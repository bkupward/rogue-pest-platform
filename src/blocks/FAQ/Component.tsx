import type { Faq, FAQBlock as FAQBlockProps } from '@/payload-types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Plus } from 'lucide-react'
import RichText from '@/components/RichText'

const FaqItem: React.FC<{ faq: Faq; index: number }> = ({ faq, index }) => (
  <details
    key={faq.id ?? index}
    className="group rounded border border-black/[0.08] bg-[#f8f8f8] px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
      <span className="font-prompt text-[18px] font-semibold leading-[21.6px] tracking-[-0.5px] text-[#2f2c2b]">
        {faq.question}
      </span>
      <Plus className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
    </summary>
    {faq.answer && (
      <div className="mt-3 font-prompt text-[16px] leading-6 text-[#1a1a1a]/80">
        <RichText data={faq.answer} enableGutter={false} enableProse={false} />
      </div>
    )}
  </details>
)

export const FAQBlock: React.FC<
  FAQBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    heading,
    subheading,
    populateBy,
    filterByTopic,
    filterByService,
    filterByLocation,
    limit,
    selectedFaqs,
  } = props

  let faqs: Faq[] = []

  if (populateBy === 'manual') {
    // Manual mode: use the hand-picked relationship docs (populated by depth).
    faqs = selectedFaqs?.filter((f): f is Faq => typeof f === 'object') || []
  } else {
    // Automatic mode: query the FAQs collection with the chosen filters.
    const payload = await getPayload({ config: configPromise })

    const where: Where = {}
    if (filterByTopic) {
      where.topic = { equals: filterByTopic }
    }
    if (filterByService) {
      const serviceId = typeof filterByService === 'object' ? filterByService.id : filterByService
      where.relatedService = { equals: serviceId }
    }
    if (filterByLocation) {
      const locationId =
        typeof filterByLocation === 'object' ? filterByLocation.id : filterByLocation
      where.relatedLocation = { equals: locationId }
    }

    const fetched = await payload.find({
      collection: 'faqs',
      depth: 1,
      limit: limit || 10,
      overrideAccess: false,
      sort: 'displayOrder',
      ...(Object.keys(where).length ? { where } : {}),
    })
    faqs = fetched.docs
  }

  // Two-column layout (per Figma): fill the left column first, then the right.
  const mid = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, mid), faqs.slice(mid)]

  return (
    <section className="section-y" id={`block-${id}`}>
      <div className="container">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {subheading && (
              <p className="mb-3 font-sans text-[13.9px] font-extrabold uppercase tracking-wide text-primary">
                {subheading}
              </p>
            )}
            {heading && (
              <h2 className="font-prompt text-[32px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-5">
              {column.map((faq, index) => (
                <FaqItem key={faq.id ?? index} faq={faq} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
