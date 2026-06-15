import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'

import React from 'react'
import { cn } from '@/utilities/ui'

export const FeatureGridBlock: React.FC<
  FeatureGridBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, subheading, layout, items } = props

  const isSteps = layout === 'steps'

  return (
    <section className="section-y" id={`block-${id}`}>
      <div className="container">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {subheading && <p className="eyebrow mb-2">{subheading}</p>}
            {heading && <h2>{heading}</h2>}
          </div>
        )}

        <div className={cn('grid gap-8', isSteps ? 'md:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-4')}>
          {(items || []).map((item, index) => {
            if (isSteps) {
              return (
                <div key={item.id ?? index} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              )
            }

            return (
              <div key={item.id ?? index} className="surface-card p-6">
                {item.icon && <div className="mb-3 text-3xl text-primary">{item.icon}</div>}
                <h3 className="text-lg">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
