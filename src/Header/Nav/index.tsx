'use client'

import React, { useState } from 'react'

import type { CompanyInfo, Header as HeaderType, Location, Service } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'

type DropdownItem = { label: string; href: string }

type Props = {
  data: HeaderType
  companyInfo: CompanyInfo
  services: Service[]
  locations: Location[]
}

// Barlow, uppercase, semibold — matches the Figma header nav.
const navLinkClass =
  'font-heading text-[16px] font-semibold uppercase tracking-[0.02em] text-foreground transition-colors hover:text-primary'

export const HeaderNav: React.FC<Props> = ({ data, companyInfo, services, locations }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)

  const phone = companyInfo?.phone

  const serviceItems: DropdownItem[] = services.map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
  }))
  const locationItems: DropdownItem[] = locations.map((l) => ({
    label: l.name,
    href: `/locations/${l.slug}`,
  }))

  // Services / Locations nav entries render as dropdowns sourced from their
  // collections; every other entry is a plain uppercase link.
  const dropdownFor = (label?: string | null) => {
    const key = label?.trim().toLowerCase()
    if (key === 'services') return { href: '/services', items: serviceItems }
    if (key === 'locations') return { href: '/locations', items: locationItems }
    return null
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 lg:flex">
        {navItems.map(({ link }, i) => {
          const dd = dropdownFor(link?.label)
          if (dd) {
            return (
              <NavDropdown key={i} label={link?.label || ''} href={dd.href} items={dd.items} />
            )
          }
          return <CMSLink key={i} {...link} appearance="inline" className={navLinkClass} />
        })}

        {phone && (
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-heading text-[16px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            {phone}
          </a>
        )}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile panel */}
      {open && (
        <div className="absolute inset-x-0 top-full border-t border-border bg-background shadow-md lg:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navItems.map(({ link }, i) => {
              const dd = dropdownFor(link?.label)
              if (dd) {
                return <MobileGroup key={i} label={link?.label || ''} href={dd.href} items={dd.items} />
              }
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="block py-2 font-heading text-base font-semibold uppercase tracking-[0.02em]"
                />
              )
            })}

            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-heading text-base font-bold text-primary-foreground"
              >
                <Phone className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                {phone}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const NavDropdown: React.FC<{ label: string; href: string; items: DropdownItem[] }> = ({
  label,
  href,
  items,
}) => {
  return (
    <div className="group relative">
      <Link href={href} className={`inline-flex items-center gap-1 ${navLinkClass}`}>
        {label}
        <ChevronDown className="h-4 w-4" />
      </Link>
      {items.length > 0 && (
        <div className="invisible absolute left-0 top-full z-50 min-w-[14rem] rounded-lg border border-border bg-background p-2 opacity-0 shadow-md transition-opacity duration-150 focus-within:visible focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          {items.map((it, i) => (
            <Link
              key={i}
              href={it.href}
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const MobileGroup: React.FC<{ label: string; href: string; items: DropdownItem[] }> = ({
  label,
  href,
  items,
}) => {
  return (
    <div className="py-1">
      <Link
        href={href}
        className="block py-2 font-heading text-base font-semibold uppercase tracking-[0.02em]"
      >
        {label}
      </Link>
      {items.length > 0 && (
        <div className="ml-3 flex flex-col border-l border-border pl-3">
          {items.map((it, i) => (
            <Link key={i} href={it.href} className="py-1.5 text-sm text-muted-foreground">
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
