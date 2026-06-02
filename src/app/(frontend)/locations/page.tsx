import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const locations = await payload.find({
    collection: 'locations',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      name: true,
      slug: true,
      shortDescription: true,
      heroImage: true,
    },
  })

  // The shared Card/CollectionArchive read a nested `meta` group (used by the
  // SEO-plugin collections) and a `title`. Locations stores flat fields and uses
  // `name`, so map them into the CardPostData shape to reuse the archive as-is.
  const cards = locations.docs.map((location) => ({
    slug: location.slug,
    title: location.name,
    meta: {
      description: location.shortDescription,
      image: location.heroImage,
    },
  }))

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Locations</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collectionLabels={{ plural: 'Locations', singular: 'Location' }}
          currentPage={locations.page}
          limit={12}
          totalDocs={locations.totalDocs}
        />
      </div>

      <CollectionArchive posts={cards} relationTo="locations" />

      <div className="container">
        {locations.totalPages > 1 && locations.page && (
          <Pagination page={locations.page} totalPages={locations.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rogue Pest Solutions Locations`,
  }
}
