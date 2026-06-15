import type { StatsBlock as StatsBlockProps } from '@/payload-types'

import React from 'react'

export const StatsBlock: React.FC<
  StatsBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, subheading, stats } = props

  return (
    <section className="section-y bg-secondary" id={`block-${id}`}>
      <div className="container">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {heading && <h2>{heading}</h2>}
            {subheading && <p className="mt-3 text-muted-foreground">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {(stats || []).map((stat, index) => (
            <div key={stat.id ?? index} className="text-center">
              <div className="text-4xl font-bold text-primary md:text-5xl">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
