'use client'
import Link from 'next/link'
import React from 'react'

import type { CompanyInfo, Header, Location, Service } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  companyInfo: CompanyInfo
  services: Service[]
  locations: Location[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
  companyInfo,
  services,
  locations,
}) => {
  // The Figma header is always white/light (it does not adopt the dark hero
  // theme), so we render it on a solid light surface regardless of the page.
  const logoSrc =
    companyInfo?.logo && typeof companyInfo.logo === 'object' ? companyInfo.logo.url : undefined
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white text-foreground">
      <div className="container flex items-center justify-between gap-4 py-[10px]">
        <Link href="/" className="flex-shrink-0">
          <Logo loading="eager" priority="high" className="h-[50px] w-auto" src={logoSrc} />
        </Link>
        <HeaderNav
          data={data}
          companyInfo={companyInfo}
          services={services}
          locations={locations}
        />
      </div>
    </header>
  )
}
