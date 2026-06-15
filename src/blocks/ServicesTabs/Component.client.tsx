'use client'

import React, { useState } from 'react'

type Tab = {
  id: string
  label: string
  panel: React.ReactNode
}

type Props = {
  heading?: string | null
  subheading?: string | null
  tabs: Tab[]
  monogramSrc?: string
}

export const ServicesTabsClient: React.FC<Props> = ({
  heading,
  subheading,
  tabs,
  monogramSrc = '/rogue-monogram.jpg',
}) => {
  const [active, setActive] = useState(0)
  if (!tabs.length) return null

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {heading && (
              <h2 className="font-prompt text-[30px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">{subheading}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
          {/* Left: vertical tabs */}
          <div
            className="relative shrink-0 lg:w-[300px]"
            role="tablist"
            aria-orientation="vertical"
          >
            {/* timeline line */}
            <div className="absolute bottom-3 left-[16px] top-3 hidden w-[3px] bg-[#d6d6d6] sm:block" />
            <ul className="flex flex-col gap-4">
              {tabs.map((tab, i) => {
                const isActive = i === active
                return (
                  <li key={tab.id} className="flex items-center gap-3">
                    {/* monogram on the timeline */}
                    <span className="relative z-10 hidden h-8 w-9 shrink-0 items-center justify-center bg-white sm:flex">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={monogramSrc} alt="" className="h-7 w-9 object-contain" />
                    </span>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      className={`h-[46px] w-full rounded-lg border px-4 text-center font-heading text-[16px] font-bold capitalize transition-colors sm:w-[230px] ${
                        isActive
                          ? 'border-white bg-primary text-white'
                          : 'border-primary bg-white text-primary hover:bg-primary/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right: active panel */}
          <div className="min-w-0 flex-1" role="tabpanel">
            {tabs[active]?.panel}
          </div>
        </div>
      </div>
    </section>
  )
}
