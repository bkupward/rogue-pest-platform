import React from 'react'
import { Award, Home, Leaf, MapPin, Plus, Settings2, ShieldCheck, ThumbsUp } from 'lucide-react'

import type { WhyChooseAccordionBlock as WhyChooseAccordionBlockProps } from '@/payload-types'

const ICONS = [Award, ShieldCheck, Leaf, Settings2, Home, MapPin, ThumbsUp]

export const WhyChooseAccordionBlock: React.FC<
  WhyChooseAccordionBlockProps & { id?: string }
> = (props) => {
  const { id, eyebrow, heading, body, buttonLabel, buttonUrl, items } = props
  const list = Array.isArray(items) ? items : []

  return (
    <section className="section-y bg-[#fbeff1]" id={`block-${id}`}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            {eyebrow && (
              <p className="mb-3 font-sans text-[13.9px] font-extrabold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-prompt text-[32px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
                {heading}
              </h2>
            )}
            {body && (
              <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{body}</p>
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

          {/* Right: accordion */}
          <div className="flex flex-col gap-5">
            {list.map((item, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <details
                  key={item.id ?? i}
                  open={i === 0}
                  className="group rounded border border-black/[0.08] bg-[#f8f8f8] open:bg-primary [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-6">
                    <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-white">
                      <Icon className="h-[26px] w-[26px] text-primary" />
                    </span>
                    <h3 className="flex-1 font-prompt text-[20px] font-semibold tracking-[-0.5px] text-[#2f2c2b] group-open:text-white">
                      {item.title}
                    </h3>
                    <Plus className="h-7 w-7 shrink-0 text-primary transition-transform group-open:rotate-45 group-open:text-white" />
                  </summary>
                  {item.body && (
                    <p className="px-6 pb-6 font-prompt text-[16px] leading-6 text-white/90">
                      {item.body}
                    </p>
                  )}
                </details>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
