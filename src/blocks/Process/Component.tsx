import React from 'react'
import { Phone } from 'lucide-react'

import type { ProcessBlock as ProcessBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

export const ProcessBlock: React.FC<ProcessBlockProps & { id?: string }> = (props) => {
  const { id, eyebrow, heading, steps, cta } = props

  const hasCta = Boolean(cta?.label)

  return (
    <section
      className="relative overflow-hidden bg-primary py-16 text-white md:py-24"
      id={`block-${id}`}
    >
      <div className="container">
        {/* Header */}
        {(eyebrow || heading) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
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
          </div>
        )}

        {/* Steps. No horizontal gap so the dashed connector runs continuously
            across the row; spacing comes from each column's inner max-width. */}
        <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {(steps || []).map((step, index) => {
            const hasIcon = step.icon && typeof step.icon === 'object'

            return (
              <div key={step.id ?? index} className="flex flex-col items-center text-center">
                {/* Icon circle */}
                <div
                  className={cn(
                    'flex h-[90px] w-[90px] items-center justify-center rounded-full',
                    step.iconColor === 'white' ? 'bg-white' : 'bg-yellow-300',
                  )}
                >
                  {hasIcon ? (
                    <Media
                      resource={step.icon}
                      imgClassName="h-11 w-11 object-contain"
                      className="flex items-center justify-center"
                    />
                  ) : (
                    <span className="font-prompt text-2xl font-bold text-primary">{index + 1}</span>
                  )}
                </div>

                {/* Dashed timeline connector: a full-column-width strip with a
                    centered dot. Stretched edge-to-edge so adjacent columns join
                    into one continuous line beneath the icons. */}
                <div
                  aria-hidden
                  className="my-6 h-[31px] w-full bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/media/Progress-container.png')",
                    backgroundSize: '100% 31px',
                  }}
                />

                <h3 className="font-prompt text-[22px] font-bold tracking-[-0.5px] text-white">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mx-auto mt-3 max-w-[280px] px-4 font-prompt text-[16px] leading-6 text-white/90">
                    {step.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Phone CTA */}
        {hasCta && (
          <div className="mt-14 flex justify-center">
            <a
              href={cta?.url || undefined}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-heading text-[16px] font-bold text-primary transition-colors hover:bg-white/90"
            >
              <Phone className="h-4 w-4" strokeWidth={2.5} />
              {cta?.label}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
