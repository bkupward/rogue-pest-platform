import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  trustBullets,
  ratingBadge,
}) => {
  return (
    <div className="pt-16 md:pt-24">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}

        {/* Trust bullets — render only when present */}
        {Array.isArray(trustBullets) && trustBullets.length > 0 && (
          <ul className="mt-6 flex flex-col gap-2">
            {trustBullets.map((bullet, i) => (
              <li key={bullet.id ?? i}>{bullet.text}</li>
            ))}
          </ul>
        )}

        {/* Rating badge — render only when enabled */}
        {ratingBadge?.enabled && (
          <div className="mt-6 flex items-center gap-2 text-sm">
            {ratingBadge.source && <span className="capitalize">{ratingBadge.source}</span>}
            {ratingBadge.rating && <span>★ {ratingBadge.rating}</span>}
            {ratingBadge.label && <span>{ratingBadge.label}</span>}
          </div>
        )}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
