import type { Service, ServicesShowcaseBlock as ServicesShowcaseBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

export const ServicesShowcaseBlock: React.FC<
  ServicesShowcaseBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    heading,
    subheading,
    populateBy,
    selectedServices,
    showImages,
    showExcerpts,
    buttonText,
    buttonUrl,
  } = props

  let services: Service[] = []

  if (populateBy === 'manual') {
    services =
      selectedServices?.filter((service): service is Service => typeof service === 'object') || []
  } else {
    const payload = await getPayload({ config: configPromise })
    const fetched = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 100,
      overrideAccess: false,
    })
    services = fetched.docs
  }

  return (
    <section className="section-y" id={`block-${id}`}>
      <div className="container">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {heading && <h2>{heading}</h2>}
            {subheading && <p className="mt-3 text-muted-foreground">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const href = `/services/${service.slug}`

            return (
              <div
                key={service.id ?? index}
                className="surface-card card-hover flex flex-col overflow-hidden"
              >
                {showImages &&
                  service.featuredImage &&
                  typeof service.featuredImage === 'object' && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <Media
                        resource={service.featuredImage}
                        imgClassName="h-full w-full object-cover"
                      />
                    </div>
                  )}

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl">
                    <Link href={href} className="hover:text-primary">
                      {service.title}
                    </Link>
                  </h3>

                  {showExcerpts && service.shortDescription && (
                    <p className="mt-2 flex-1 text-muted-foreground">{service.shortDescription}</p>
                  )}

                  <Link
                    href={href}
                    className="mt-4 inline-flex items-center font-semibold text-primary hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {buttonText && buttonUrl && (
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href={buttonUrl}>{buttonText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
