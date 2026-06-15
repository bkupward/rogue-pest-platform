import type { Location, ServiceAreasBlock as ServiceAreasBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

export const ServiceAreasBlock: React.FC<
  ServiceAreasBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    eyebrow,
    heading,
    description,
    subheading,
    populateBy,
    selectedLocations,
    buttonText,
    buttonUrl,
  } = props

  // Prefer the new Description field; fall back to the legacy subheading.
  const paragraph = description || subheading

  let locations: Location[] = []

  if (populateBy === 'manual') {
    // Manual mode: use the hand-picked relationship docs (populated by depth).
    locations =
      selectedLocations?.filter((location): location is Location => typeof location === 'object') ||
      []
  } else {
    // Automatic mode: query the Locations collection.
    const payload = await getPayload({ config: configPromise })
    const fetched = await payload.find({
      collection: 'locations',
      depth: 1,
      limit: 100,
      overrideAccess: false,
    })
    locations = fetched.docs
  }

  return (
    <section
      className="relative overflow-hidden bg-primary py-16 text-white md:py-24"
      id={`block-${id}`}
    >
      {/* Subtle dot texture over the red band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <p className="mb-3 font-sans text-[13.9px] font-extrabold uppercase tracking-wide text-yellow-300">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-prompt text-[32px] font-extrabold tracking-[-0.5px] text-white md:text-[38px]">
              {heading}
            </h2>
          )}
          {paragraph && (
            <p className="mx-auto mt-4 max-w-3xl font-prompt text-[16px] leading-6 text-white/90">
              {paragraph}
            </p>
          )}
        </div>

        {locations.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {locations.map((location, index) => (
              <Link
                key={location.id ?? index}
                href={`/locations/${location.slug}`}
                className="rounded-lg bg-yellow-300 px-5 py-2.5 font-heading text-[18px] font-semibold uppercase leading-[18px] text-[#2f2c2b] transition-colors hover:bg-yellow-200"
              >
                {location.name}
              </Link>
            ))}
          </div>
        )}

        {buttonText && buttonUrl && (
          <div className="mt-10 text-center">
            <Link
              href={buttonUrl}
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-heading text-[16px] font-bold text-primary transition-colors hover:bg-white/90"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
