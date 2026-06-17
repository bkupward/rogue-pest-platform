'use client'

import React, { useState } from 'react'
import { Phone } from 'lucide-react'

import type { MissionBlock as MissionBlockProps } from '@/payload-types'

export const MissionBlock: React.FC<MissionBlockProps & { id?: string }> = (props) => {
  const { id, heading, subheading, tabs, card } = props
  const [active, setActive] = useState(0)

  const tabList = Array.isArray(tabs) ? tabs : []
  const current = tabList[active]

  return (
    <section className="section-y bg-white" id={`block-${id}`}>
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {heading && (
            <h2 className="font-prompt text-[32px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{subheading}</p>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Tab switcher */}
          {tabList.length > 0 && (
            <div className="flex flex-col gap-4 border-l-[3px] border-[#d6d6d6] pl-10">
              {tabList.map((tab, i) => {
                const isActive = i === active
                return (
                  <button
                    key={tab.id ?? i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`rounded-lg border px-6 py-3 text-center font-heading text-[16px] font-bold capitalize transition-colors ${
                      isActive
                        ? 'border-primary bg-primary text-white'
                        : 'border-primary bg-white text-primary hover:bg-primary/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Active tab content + contact card */}
          <div>
            {current?.heading && (
              <h3 className="font-prompt text-[26px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[30px]">
                {current.heading}
              </h3>
            )}
            {current?.body && (
              <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{current.body}</p>
            )}

            {card && (card.heading || card.body) && (
              <div className="mt-8 rounded-[20px] border border-black/[0.14] bg-[#f8f8f8] p-8 md:p-10">
                {card.heading && (
                  <h4 className="font-prompt text-[22px] font-semibold tracking-[-0.5px] text-[#2f2c2b] md:text-[24px]">
                    {card.heading}
                  </h4>
                )}
                {card.body && (
                  <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">
                    {card.body}
                  </p>
                )}
                {(card.phone || card.secondaryLabel) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {card.phone && (
                      <a
                        href={card.phoneUrl || undefined}
                        className="inline-flex items-center gap-2 rounded-lg border-[3px] border-primary bg-primary px-5 py-3 font-heading text-[16px] font-bold text-white transition-colors hover:bg-primary/90"
                      >
                        <Phone className="h-4 w-4" strokeWidth={2.5} />
                        {card.phone}
                      </a>
                    )}
                    {card.secondaryLabel && (
                      <a
                        href={card.secondaryUrl || undefined}
                        className="inline-flex items-center rounded-lg border-[3px] border-primary bg-white px-5 py-3 font-heading text-[16px] font-bold text-primary transition-colors hover:bg-primary/5"
                      >
                        {card.secondaryLabel}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
