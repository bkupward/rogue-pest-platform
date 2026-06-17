import React from 'react'
import { CheckCircle2 } from 'lucide-react'

import type { OurApproachBlock as OurApproachBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const OurApproachBlock: React.FC<OurApproachBlockProps & { id?: string }> = (props) => {
  const {
    id,
    eyebrow,
    heading,
    intro,
    listHeading,
    items,
    footnote,
    buttonLabel,
    buttonUrl,
    image,
  } = props

  const hasImage = image && typeof image === 'object'

  return (
    <section className="section-y bg-white" id={`block-${id}`}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            {eyebrow && (
              <p className="mb-3 font-sans text-[13.9px] font-extrabold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-prompt text-[32px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{intro}</p>
            )}

            {listHeading && (
              <h3 className="mt-6 font-prompt text-[20px] font-bold tracking-[-0.5px] text-[#2f2c2b]">
                {listHeading}
              </h3>
            )}

            {Array.isArray(items) && items.length > 0 && (
              <ul className="mt-4 flex flex-col gap-4">
                {items.map((item, i) => (
                  <li key={item.id ?? i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-prompt text-[16px] leading-6 tracking-[-0.5px] text-[#1a1a1a]">
                      <span className="font-bold">{item.label}</span>
                      {item.text ? ` ${item.text}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {footnote && (
              <p className="mt-6 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{footnote}</p>
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

          {/* Image */}
          {hasImage && (
            <div className="overflow-hidden rounded-xl">
              <Media
                resource={image}
                imgClassName="h-full w-full object-cover"
                className="aspect-[630/420] h-full w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
