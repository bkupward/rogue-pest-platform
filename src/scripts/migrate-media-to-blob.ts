/**
 * Migrate existing local Media files into Vercel Blob.
 *
 * SAFETY: this is a DRY RUN by default and writes nothing. Real uploads happen
 * ONLY when MIGRATE_APPLY=1 is set. Before each real upload the original file is
 * copied to public/media-backup/ and restored if the upload fails, so a failed or
 * partial migration can never lose the local original.
 *
 * Run (flags are env vars — `payload run` does not forward CLI args to the script):
 *   pnpm migrate:media                    # DRY RUN (default) — reports, writes nothing
 *   MIGRATE_APPLY=1 pnpm migrate:media     # actually upload to Blob (with disk backup)
 *   MIGRATE_APPLY=1 MIGRATE_FORCE=1 pnpm migrate:media  # also re-upload docs already on Blob
 *
 * Prerequisite: the Vercel Blob store must allow PUBLIC access (website media is
 * public). A private store rejects uploads with "Cannot use public access on a private store".
 *
 * How it works: for each `media` doc it reads the original file from
 * `public/media/<filename>` and re-uploads it via `payload.update({ file })`.
 * With the Vercel Blob plugin enabled (BLOB_READ_WRITE_TOKEN set), that re-upload
 * regenerates every image size and stores them in Blob, updating the row's URLs.
 *
 * Idempotent: docs whose `url` already points at *.blob.vercel-storage.com are
 * skipped unless `--force` is passed. Files missing on disk are skipped + reported.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

// SAFETY: dry run unless MIGRATE_APPLY=1. (payload run swallows CLI args, so use env.)
const APPLY = process.env.MIGRATE_APPLY === '1'
const DRY = !APPLY
const FORCE = process.env.MIGRATE_FORCE === '1'
// Optional: only process the first N docs (for a safe live test). 0 = all.
const LIMIT = Number(process.env.MIGRATE_LIMIT || 0)
const BLOB_HOST = 'blob.vercel-storage.com'
const MEDIA_DIR = path.resolve(process.cwd(), 'public/media')
const BACKUP_DIR = path.resolve(process.cwd(), 'public/media-backup')

async function main() {
  const payload = await getPayload({ config })
  const log = (m: string) => payload.logger.info(`[migrate:media] ${m}`)

  if (!process.env.BLOB_READ_WRITE_TOKEN && !DRY) {
    payload.logger.error(
      '[migrate:media] BLOB_READ_WRITE_TOKEN is not set — uploads would stay on local disk. ' +
        'Set the token (or run with --dry) and try again.',
    )
    process.exit(1)
  }

  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: true,
  })
  const toProcess = LIMIT > 0 ? docs.slice(0, LIMIT) : docs
  log(
    `found ${docs.length} media docs (dry=${DRY}, force=${FORCE}` +
      `${LIMIT > 0 ? `, limit=${LIMIT}` : ''}) — processing ${toProcess.length}`,
  )

  let migrated = 0
  let skippedBlob = 0
  let missing = 0
  let failed = 0

  for (const doc of toProcess) {
    const filename = (doc as { filename?: string }).filename
    const url = (doc as { url?: string }).url || ''
    const mimeType = (doc as { mimeType?: string }).mimeType || 'application/octet-stream'
    const label = filename || `#${doc.id}`

    if (!filename) {
      log(`skip ${label}: no filename`)
      continue
    }

    if (!FORCE && url.includes(BLOB_HOST)) {
      skippedBlob++
      continue
    }

    const localPath = path.join(MEDIA_DIR, filename)
    if (!fs.existsSync(localPath)) {
      missing++
      log(`MISSING on disk, skipped: ${filename} (re-upload this asset manually in the admin)`)
      continue
    }

    if (DRY) {
      log(`would migrate: ${filename}`)
      migrated++
      continue
    }

    // Safety net: back up the original before the re-upload. Payload removes the
    // staticDir copy during a file replace, so if the Blob upload throws we restore
    // the original from this backup — a failed migration never loses the local file.
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    const backupPath = path.join(BACKUP_DIR, filename)
    if (!fs.existsSync(backupPath)) fs.copyFileSync(localPath, backupPath)

    try {
      const data = fs.readFileSync(localPath)
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        // Re-uploading the original triggers the Blob adapter to store the file +
        // all regenerated image sizes and rewrite the row's url/sizes URLs.
        file: { data, mimetype: mimeType, name: filename, size: data.length },
        overrideAccess: true,
        // media has no revalidate hooks, but keep parity with the seeder pattern.
        context: { disableRevalidate: true },
      })
      migrated++
      log(`migrated: ${filename}`)
    } catch (err) {
      failed++
      // Restore the original if the failed upload removed it from disk.
      if (!fs.existsSync(localPath) && fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, localPath)
        log(`restored local original after failed upload: ${filename}`)
      }
      payload.logger.error(`[migrate:media] FAILED ${filename}: ${(err as Error).message}`)
    }
  }

  log('—')
  log(
    `done. ${DRY ? '(dry run) ' : ''}migrated=${migrated} skipped(already on blob)=${skippedBlob} ` +
      `missing-on-disk=${missing} failed=${failed}`,
  )
  if (missing > 0) {
    log(`${missing} file(s) were missing locally — re-upload those via the admin to get them on Blob.`)
  }
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error('[migrate:media] FAILED:', err)
  process.exit(1)
}
