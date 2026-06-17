import React from 'react'

import type { PromoBannerBlock as PromoBannerBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const PromoBannerBlock: React.FC<PromoBannerBlockProps & { id?: string }> = (props) => {
  const { id, heading, body, buttonLabel, buttonUrl, image } = props

  const hasImage = image && typeof image === 'object'

  return (
    <section className="relative overflow-hidden bg-[#f8f8f8]" id={`block-${id}`}>
      {/* Right-side image (full-bleed on large screens) */}
      {hasImage && (
        <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <Media fill imgClassName="object-cover" resource={image} className="absolute inset-0" />
        </div>
      )}

      <div className="container">
        <div className="py-12 md:py-16 lg:w-1/2 lg:py-20 lg:pr-12">
          {heading && (
            <h2 className="font-prompt text-[28px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
              {heading}
            </h2>
          )}
          {body && (
            <p className="mt-4 max-w-xl font-prompt text-[16px] leading-6 text-[#1a1a1a]">{body}</p>
          )}
          {buttonLabel && (
            <div className="mt-8">
              <a
                href={buttonUrl || undefined}
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-heading text-[16px] font-bold text-white transition-colors hover:bg-primary/90"
              >
                {buttonLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
