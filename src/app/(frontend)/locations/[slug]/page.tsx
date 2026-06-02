import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const locations = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = locations.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Location({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/locations/' + decodedSlug
  const location = await queryLocationBySlug({ slug: decodedSlug })

  if (!location) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <div className="max-w-[48rem] mx-auto">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{location.name}</h1>

            {location.heroImage && typeof location.heroImage === 'object' && (
              <Media
                className="mb-8"
                imgClassName="rounded"
                priority
                resource={location.heroImage}
              />
            )}

            {location.shortDescription && (
              <p className="mb-8 text-lg text-muted-foreground">{location.shortDescription}</p>
            )}
          </div>

          {location.content && (
            <RichText
              className="max-w-[48rem] mx-auto"
              data={location.content}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const location = await queryLocationBySlug({ slug: decodedSlug })

  // The shared `generateMeta` util reads a nested `meta` group (as used by the
  // SEO-plugin collections). Locations stores flat metaTitle/metaDescription, so
  // map them into the shape the util expects to reuse it as-is.
  return generateMeta({
    doc: location
      ? ({
          slug: location.slug,
          meta: {
            title: location.metaTitle,
            description: location.metaDescription,
            image: location.heroImage,
          },
        } as Partial<Post>)
      : null,
  })
}

const queryLocationBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'locations',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
