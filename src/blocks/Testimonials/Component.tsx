import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'
import { Star } from 'lucide-react'

export const TestimonialsBlock: React.FC<
  TestimonialsBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    heading,
    subheading,
    populateBy,
    featuredOnly,
    filterByLocation,
    limit,
    selectedTestimonials,
    showRating,
  } = props

  let testimonials: Testimonial[] = []

  if (populateBy === 'manual') {
    testimonials =
      selectedTestimonials?.filter((t): t is Testimonial => typeof t === 'object') || []
  } else {
    const payload = await getPayload({ config: configPromise })

    const where: Where = {}
    if (featuredOnly) {
      where.featured = { equals: true }
    }
    if (filterByLocation) {
      const locationId =
        typeof filterByLocation === 'object' ? filterByLocation.id : filterByLocation
      where.location = { equals: locationId }
    }

    const fetched = await payload.find({
      collection: 'testimonials',
      depth: 1,
      limit: limit || 6,
      overrideAccess: false,
      sort: 'displayOrder',
      ...(Object.keys(where).length ? { where } : {}),
    })
    testimonials = fetched.docs
  }

  return (
    <section className="section-y bg-secondary" id={`block-${id}`}>
      <div className="container">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {heading && <h2>{heading}</h2>}
            {subheading && <p className="mt-3 text-muted-foreground">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const { customerName, reviewText, rating, googleReviewUrl } = testimonial

            return (
              <figure
                key={testimonial.id ?? index}
                className="surface-card flex flex-col gap-4 p-6"
              >
                {showRating && typeof rating === 'number' && (
                  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < rating
                            ? 'h-5 w-5 fill-current text-yellow-500'
                            : 'h-5 w-5 text-muted-foreground/30'
                        }
                      />
                    ))}
                  </div>
                )}

                {reviewText && (
                  <blockquote className="flex-1 text-muted-foreground">
                    “{reviewText}”
                  </blockquote>
                )}

                <figcaption className="font-semibold">
                  {customerName}
                  {googleReviewUrl && (
                    <Link
                      href={googleReviewUrl}
                      className="ml-2 text-sm font-normal text-primary hover:underline"
                    >
                      Read on Google
                    </Link>
                  )}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
