import React from 'react'
import { Check } from 'lucide-react'

import type { OurStoryBlock as OurStoryBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const OurStoryBlock: React.FC<OurStoryBlockProps & { id?: string }> = (props) => {
  const { id, eyebrow, heading, body, image, checklist, link, stats, showTruck } = props

  const hasImage = image && typeof image === 'object'

  return (
    <section className="relative overflow-hidden bg-[#f8f8f8] py-16 lg:py-24" id={`block-${id}`}>
      <div className="container">
        {/* Image + content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            {hasImage ? (
              <Media resource={image} imgClassName="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/our-story.webp"
                alt={heading || 'Our Story'}
                className="h-full w-full rounded-xl object-cover"
              />
            )}
          </div>

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
            {body && (
              <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{body}</p>
            )}

            {Array.isArray(checklist) && checklist.length > 0 && (
              <ul className="mt-6 flex flex-col gap-3">
                {checklist.map((item, i) => (
                  <li key={item.id ?? i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary">
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </span>
                    <p className="font-prompt text-[16px] leading-6 tracking-[-0.5px] text-[#1a1a1a]">
                      <span className="font-bold">{item.title}</span>
                      {item.text ? ` ${item.text}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {link?.url || link?.reference ? (
              <div className="mt-8">
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-heading text-[16px] font-bold text-white transition-colors hover:bg-primary/90"
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Stats */}
        {Array.isArray(stats) && stats.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.id ?? i} className="text-center lg:text-left">
                <div className="font-prompt text-[56px] font-bold leading-none text-[#1a1a1a] md:text-[72px] lg:text-[84px]">
                  {stat.value}
                  {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                </div>
                <div className="mt-3 font-prompt text-[16px] font-semibold uppercase leading-tight text-[#2f2c2b]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative truck */}
      {showTruck && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/truck.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 -right-10 hidden w-[360px] max-w-[30%] select-none xl:block"
        />
      )}
    </section>
  )
}
