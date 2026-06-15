import React from 'react'
import { Phone } from 'lucide-react'

import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const WhyChooseUsBlock: React.FC<WhyChooseUsBlockProps & { id?: string }> = (props) => {
  const { id, eyebrow, heading, intro, image, features, buttons } = props

  const hasImage = image && typeof image === 'object'

  return (
    <section className="section-y bg-white" id={`block-${id}`}>
      <div className="container">
        {/* Header */}
        {(eyebrow || heading || intro) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
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
          </div>
        )}

        {/* Image + overlapping card */}
        <div className="relative lg:flex lg:items-center">
          {hasImage && (
            <div className="overflow-hidden rounded-3xl lg:w-[60%]">
              <Media
                resource={image}
                imgClassName="h-full w-full object-cover"
                className="aspect-[771/520] h-full w-full"
              />
            </div>
          )}

          <div
            className={
              hasImage
                ? 'relative z-10 -mt-10 rounded-2xl border-4 border-white bg-primary p-7 text-white shadow-xl sm:p-9 lg:-ml-24 lg:mt-0 lg:w-[55%]'
                : 'relative z-10 mx-auto max-w-4xl rounded-2xl border-4 border-white bg-primary p-7 text-white shadow-xl sm:p-9'
            }
          >
            {Array.isArray(features) && features.length > 0 && (
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={feature.id ?? index}>
                    <h3 className="font-prompt text-[20px] font-bold tracking-[-0.5px] text-white">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="mt-2 font-prompt text-[16px] leading-6 tracking-[-0.5px] text-white/90">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(buttons) && buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {buttons.map((button, index) => (
                  <a
                    key={button.id ?? index}
                    href={button.url || undefined}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-heading text-[16px] font-bold text-primary transition-colors hover:bg-white/90"
                  >
                    {button.showPhoneIcon && <Phone className="h-4 w-4" strokeWidth={2.5} />}
                    {button.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
