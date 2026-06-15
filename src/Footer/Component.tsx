import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Clock, Facebook, Instagram, Linkedin, MapPin, Phone, Youtube } from 'lucide-react'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const companyInfo = await getCachedGlobal('company-info', 1)()

  // Columns sourced from existing collections (no schema change).
  const payload = await getPayload({ config: configPromise })
  const [services, locations] = await Promise.all([
    payload.find({ collection: 'services', depth: 0, limit: 50, overrideAccess: false, sort: 'title' }),
    payload.find({ collection: 'locations', depth: 0, limit: 50, overrideAccess: false, sort: 'name' }),
  ])

  const companyLinks = footerData?.navItems || []
  const supportLinks = footerData?.supportLinks || []
  const social = footerData?.social
  const credit = footerData?.credit
  const monogramSrc =
    companyInfo?.logoIcon && typeof companyInfo.logoIcon === 'object'
      ? companyInfo.logoIcon.url
      : '/rogue-monogram.jpg'

  // Single-line address from individual CompanyInfo fields, skipping empties.
  const fullAddress = [
    companyInfo?.streetAddress,
    [companyInfo?.city, companyInfo?.state].filter(Boolean).join(', '),
    companyInfo?.zip,
  ]
    .filter(Boolean)
    .join(', ')

  const year = new Date().getFullYear()

  const socials = [
    { url: social?.facebook, Icon: Facebook, label: 'Facebook' },
    { url: social?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { url: social?.youtube, Icon: Youtube, label: 'YouTube' },
    { url: social?.instagram, Icon: Instagram, label: 'Instagram' },
  ].filter((s) => Boolean(s.url))

  return (
    <footer className="mt-auto bg-white font-prompt text-foreground">
      <div className="container py-16">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1.2fr_1.1fr_1.2fr]">
          {/* Brand */}
          <div className="col-span-2 flex flex-col items-center text-center md:col-span-3 lg:col-span-1 lg:items-start lg:text-left">
            <Link href="/" className="inline-flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={monogramSrc || '/rogue-monogram.jpg'}
                alt={companyInfo?.companyName || 'Rogue Pest Solutions'}
                className="h-[90px] w-auto"
              />
            </Link>
            {footerData?.tagline && (
              <p className="mt-4 max-w-[16rem] text-[24px] font-bold capitalize leading-tight text-[#2f2c2b]">
                {footerData.tagline}
              </p>
            )}
            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url as string}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company */}
          {companyLinks.length > 0 && (
            <FooterColumn title="Company">
              {companyLinks.map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="inline" className={footerLinkClass} />
              ))}
            </FooterColumn>
          )}

          {/* Services (collection) */}
          {services.docs.length > 0 && (
            <FooterColumn title="Services">
              {services.docs.map((s) => (
                <Link key={s.id} href={`/services/${s.slug}`} className={`${footerLinkClass} capitalize`}>
                  {s.title}
                </Link>
              ))}
            </FooterColumn>
          )}

          {/* Customer Support */}
          {supportLinks.length > 0 && (
            <FooterColumn title="Customer Support">
              {supportLinks.map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="inline" className={footerLinkClass} />
              ))}
            </FooterColumn>
          )}

          {/* Service Areas (collection) */}
          {locations.docs.length > 0 && (
            <FooterColumn title="Service Areas">
              {locations.docs.map((l) => (
                <Link key={l.id} href={`/locations/${l.slug}`} className={footerLinkClass}>
                  {l.name}
                </Link>
              ))}
            </FooterColumn>
          )}
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-y border-border/60 py-6 sm:grid-cols-3">
          {companyInfo?.phone && (
            <ContactItem Icon={Phone} label="Call now" href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}>
              {companyInfo.phone}
            </ContactItem>
          )}
          {companyInfo?.businessHours && (
            <ContactItem Icon={Clock} label="Business Hours" uppercase>
              {companyInfo.businessHours}
            </ContactItem>
          )}
          {fullAddress && (
            <ContactItem Icon={MapPin} uppercase>
              {fullAddress}
            </ContactItem>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[16px] text-[#292829] md:flex-row">
          <p>
            {companyInfo?.companyName || 'Rogue Pest Solutions'} © {year}. All rights reserved.
          </p>
          <p>
            {credit?.prefix || 'Designed & Managed with ❤️ by'}{' '}
            <a
              href={credit?.url || 'https://savagestrategic.io'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              {credit?.name || 'SAVAGE'}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

const footerLinkClass =
  'text-[16px] leading-7 text-[#3a3a3c] transition-colors hover:text-primary'

const FooterColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[14px] font-extrabold tracking-tight text-[#2f2c2b]">{title}</h3>
      <nav className="flex flex-col gap-1">{children}</nav>
    </div>
  )
}

const ContactItem: React.FC<{
  Icon: React.ComponentType<{ className?: string }>
  label?: string
  href?: string
  uppercase?: boolean
  children: React.ReactNode
}> = ({ Icon, label, href, uppercase, children }) => {
  const value = (
    <span className={`text-[15px] font-semibold text-[#1a1a1a] ${uppercase ? 'uppercase' : ''}`}>
      {children}
    </span>
  )
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex flex-col">
        {label && <span className="text-[12px] tracking-tight text-[#2f2c2b]">{label}</span>}
        {href ? (
          <a href={href} className="hover:text-primary">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  )
}
