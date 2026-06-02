import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    // Anyone (public, unauthenticated) can read services — these are
    // marketing pages meant to be shown on the public Rogue Pest site.
    read: anyone,
    // Only logged-in admin users can create/update/delete them.
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    // Show the `title` as the document label in the admin list/edit views.
    useAsTitle: 'title',
    // Columns shown in the admin list view table.
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      // The service name, e.g. "Termite Control". Used as the page heading
      // and as the admin document title (see `useAsTitle` above).
      name: 'title',
      type: 'text',
      required: true,
    },

    // URL-safe identifier, e.g. "termite-control". `slugField()` is Payload's
    // built-in helper (the same one Posts/Categories use here): it adds the
    // `slug` text field plus a lock toggle, and auto-generates the value from
    // `title` until you manually edit it. Indexed + unique for fast lookups.
    slugField(),

    {
      // The main image for the service, shown in cards and at the top of the
      // service page. This is a relationship to the `media` collection — for
      // images, Payload's idiomatic way to relate to `media` is the `upload`
      // field type (it gives an image picker + preview in the admin), rather
      // than a generic `relationship` field.
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      // A one or two sentence summary, used in service listing cards and as
      // fallback social/meta text. Plain text (no formatting) by design.
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      // The full body content of the service page. `richText` uses the
      // project's default Lexical editor (configured in payload.config.ts),
      // storing structured JSON that the frontend renders to HTML.
      name: 'content',
      type: 'richText',
    },

    {
      // SEO fields live in the sidebar so they don't crowd the main editor.
      // metaTitle: overrides the <title> tag for this page. If left blank,
      // the frontend should fall back to `title`.
      name: 'metaTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Overrides the browser/SEO title. Falls back to the service title if empty.',
      },
    },
    {
      // metaDescription: the <meta name="description"> used by search engines
      // and link previews. Keep it under ~160 characters for best results.
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Used for search results and social previews (~160 characters).',
      },
    },
  ],
  // Auto-manage `createdAt` / `updatedAt` (Payload default, set explicitly here
  // for clarity — the `updatedAt` column above relies on it).
  timestamps: true,
}
