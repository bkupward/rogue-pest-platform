import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { UserRound } from 'lucide-react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  // Reuses the existing generic cached-global helper + tag pattern.
  const companyInfo = await getCachedGlobal('company-info', 1)()

  // Dropdown data is sourced from the existing Services/Locations collections
  // (no schema change). Empty collections simply yield empty dropdowns.
  const payload = await getPayload({ config: configPromise })
  const [services, locations] = await Promise.all([
    payload.find({
      collection: 'services',
      depth: 0,
      limit: 50,
      overrideAccess: false,
      sort: 'title',
    }),
    payload.find({
      collection: 'locations',
      depth: 0,
      limit: 50,
      overrideAccess: false,
      sort: 'name',
    }),
  ])

  const promoBar = headerData?.promoBar
  // The brand top bar is part of the header design; an editor can hide it by
  // unchecking "Show promo bar", but it is shown by default for parity.
  const showPromoBar = promoBar?.enabled !== false
  const promoMessage =
    promoBar?.message || '🔥 Keep your backyard bite‑free all season - Call Now! 🔥'

  return (
    <>
      {/* Top utility bar — brand red, message left, Customer Portal right. */}
      {showPromoBar && (
        <div className="bg-primary text-primary-foreground">
          <div className="container flex items-center justify-between gap-4 py-[10px] text-[13.6px] font-semibold leading-6">
            <span className="truncate">{promoMessage}</span>
            <Link
              className="inline-flex shrink-0 items-center gap-1.5 hover:underline"
              href={headerData?.customerPortalUrl || '#'}
            >
              <UserRound className="h-[18px] w-[18px]" strokeWidth={2} />
              Customer Portal
            </Link>
          </div>
        </div>
      )}
      <HeaderClient
        data={headerData}
        companyInfo={companyInfo}
        services={services.docs}
        locations={locations.docs}
      />
    </>
  )
}
