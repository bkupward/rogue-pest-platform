import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import type { CompanyInfo, Service, ServicesTabsBlock as Props } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const ServicesTabsBlock: React.FC<Props & { id?: string }> = async (props) => {
  const { heading, subheading, populateBy, selectedServices, limit, ctaHeading, ctaBody, defaultImage } =
    props

  const payload = await getPayload({ config: configPromise })
  const companyInfo = (await getCachedGlobal('company-info', 1)()) as CompanyInfo
  const phone = companyInfo?.phone || ''
  const monogramSrc =
    companyInfo?.logoIcon && typeof companyInfo.logoIcon === 'object'
      ? companyInfo.logoIcon.url
      : '/rogue-monogram.jpg'

  let services: Service[] = []
  if (populateBy === 'manual' && Array.isArray(selectedServices)) {
    services = selectedServices.filter((s): s is Service => typeof s === 'object')
  } else {
    const res = await payload.find({
      collection: 'services',
      depth: 1,
      limit: limit || 6,
      overrideAccess: false,
      sort: 'title',
    })
    services = res.docs
  }

  if (!services.length) return null

  const tabs = services.map((service) => ({
    id: String(service.id),
    label: service.title,
    panel: (
      <ServicePanel
        service={service}
        phone={phone}
        ctaHeading={ctaHeading}
        ctaBody={ctaBody}
        defaultImage={defaultImage}
      />
    ),
  }))

  // Client controller imported lazily to keep this a server component.
  const { ServicesTabsClient } = await import('./Component.client')

  return (
    <ServicesTabsClient
      heading={heading}
      subheading={subheading}
      tabs={tabs}
      monogramSrc={monogramSrc || '/rogue-monogram.jpg'}
    />
  )
}

// Per-slug fallback photos shipped in /public/services (used until an editor
// uploads a real featuredImage). Slugs without a match use _default.jpg.
const FALLBACK_IMAGES = new Set(['general-pest-control', 'mosquito-control', 'termite-control'])

const ServicePanel: React.FC<{
  service: Service
  phone: string
  ctaHeading?: string | null
  ctaBody?: string | null
  defaultImage?: Props['defaultImage']
}> = ({ service, phone, ctaHeading, ctaBody, defaultImage }) => {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  // Split the CTA body around {phone} so the number renders as a red link.
  const bodyParts = (ctaBody || '').split('{phone}')

  // Image priority: the service's own Featured Image (if not an icon) → the
  // block's Default Image (CMS) → a per-slug static photo shipped in /public.
  const fi = service.featuredImage
  const useUpload =
    (fi && typeof fi === 'object' && !/icon/i.test(fi.filename || '')) ? fi : null
  const blockDefault = defaultImage && typeof defaultImage === 'object' ? defaultImage : null
  const upload = useUpload || blockDefault
  const fallbackSrc = `/services/${FALLBACK_IMAGES.has(service.slug || '') ? service.slug : '_default'}.jpg`

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-[26px]">
        {upload ? (
          <Media
            resource={upload}
            imgClassName="h-[260px] w-full object-cover md:h-[400px]"
            priority
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fallbackSrc}
            alt={service.title}
            className="h-[260px] w-full object-cover md:h-[400px]"
          />
        )}
      </div>

      <div className="font-prompt">
        <h3 className="font-prompt text-[26px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[30px]">
          {service.title} Solutions
        </h3>
        {service.shortDescription && (
          <p className="mt-3 text-[16px] leading-6 text-[#1a1a1a]">{service.shortDescription}</p>
        )}
        {service.content && (
          <RichText
            className="mt-4 [&_h2]:mt-6 [&_h2]:font-prompt [&_h2]:text-[24px] [&_h2]:font-extrabold [&_h2]:tracking-[-0.5px] [&_h2]:text-[#2f2c2b] [&_h3]:mt-5 [&_h3]:font-prompt [&_h3]:text-[20px] [&_h3]:font-bold [&_h3]:text-[#2f2c2b] [&_p]:mt-2 [&_p]:text-[16px] [&_p]:leading-6 [&_p]:text-[#1a1a1a] [&_li]:text-[16px] [&_li]:text-[#1a1a1a]"
            data={service.content}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>

      {/* CTA card */}
      <div className="mt-2 rounded-[20px] border border-black/15 bg-[#f8f8f8] p-8 md:p-10">
        {ctaHeading && (
          <h4 className="font-prompt text-[22px] font-semibold tracking-[-0.5px] text-[#2f2c2b] md:text-[24px]">
            {ctaHeading}
          </h4>
        )}
        {ctaBody && (
          <p className="mt-4 font-prompt text-[16px] leading-6 text-[#1a1a1a]">
            {bodyParts[0]}
            {bodyParts.length > 1 && phone && (
              <a href={telHref} className="text-primary underline">
                {phone}
              </a>
            )}
            {bodyParts.slice(1).join('{phone}')}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-4">
          {phone && (
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-lg border-[3px] border-primary bg-primary px-5 py-3 font-heading text-[16px] font-bold text-white transition-colors hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              {phone}
            </a>
          )}
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center rounded-lg border-[3px] border-primary bg-white px-5 py-3 font-heading text-[16px] font-bold text-primary transition-colors hover:bg-primary/5"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
