import React from 'react'
import { BadgeCheck, CheckCircle2, Clock, MessagesSquare, Shield, Star, UsersRound } from 'lucide-react'

import type { CompanyInfo, Page } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { QuoteForm, type QuoteFormDoc } from './QuoteForm'

// Trust-badge icon keys (set per badge in the CMS) → lucide components.
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  users: UsersRound,
  message: MessagesSquare,
  badge: BadgeCheck,
  shield: Shield,
  check: CheckCircle2,
  star: Star,
  clock: Clock,
}
const FEATURE_ICON_FALLBACK = [UsersRound, MessagesSquare, BadgeCheck]

export const HighImpactHero: React.FC<Page['hero']> = async ({ media, richText, trustBullets }) => {
  const companyInfo = (await getCachedGlobal('company-info', 1)()) as CompanyInfo

  // Look up the connected "Free Quote" form so the hero renders its fields from
  // the CMS (editable under Forms) and submits to it. Absent, the form is hidden.
  let quoteForm: QuoteFormDoc | null = null
  try {
    const payload = await getPayload({ config: configPromise })
    const forms = await payload.find({
      collection: 'forms' as never,
      where: { title: { equals: 'Free Quote' } } as never,
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    quoteForm = (forms.docs[0] as QuoteFormDoc) ?? null
  } catch {
    quoteForm = null
  }

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      {/* Background image + dark overlay for legibility */}
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} className="absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_514px] lg:gap-16">
          {/* Left: copy + proof */}
          <div className="max-w-2xl">
            {richText && (
              <RichText
                className="font-prompt [&_h1]:mb-5 [&_h1]:font-prompt [&_h1]:text-[34px] [&_h1]:font-extrabold [&_h1]:leading-[1.1] [&_h1]:tracking-[-0.5px] [&_h1]:text-white sm:[&_h1]:text-[44px] md:[&_h1]:text-[55px] md:[&_h1]:leading-[60px] [&_p]:max-w-xl [&_p]:text-[16px] [&_p]:leading-6 [&_p]:text-white/90"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {/* Feature badges */}
            {Array.isArray(trustBullets) && trustBullets.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {trustBullets.map((bullet, i) => {
                  const Icon =
                    (bullet.icon && ICON_MAP[bullet.icon]) ||
                    FEATURE_ICON_FALLBACK[i % FEATURE_ICON_FALLBACK.length]
                  return (
                    <li
                      key={bullet.id ?? i}
                      className="inline-flex items-center gap-2 text-[13.9px] font-semibold uppercase tracking-wide text-white"
                    >
                      <Icon className="h-5 w-5" />
                      {bullet.text}
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Rating cards */}
            <div className="mt-8 flex w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-lg sm:inline-flex sm:w-auto sm:flex-row">
              <RatingCard
                logo="/icons/google.svg"
                label="Google rating"
                rating={companyInfo?.googleRating || '4.9'}
                ratingFirst
                divider
              />
              <RatingCard
                logo="/icons/facebook.svg"
                label="Facebook Rating"
                rating={companyInfo?.facebookRating || '5.0'}
              />
            </div>
          </div>

          {/* Right: quote form */}
          {quoteForm && (
            <div className="w-full justify-self-center lg:justify-self-end">
              <QuoteForm form={quoteForm} phone={companyInfo?.phone} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const Stars: React.FC = () => (
  <span className="inline-flex items-center gap-[1px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-[15px] w-[15px] fill-amber-400 text-amber-400" />
    ))}
  </span>
)

const RatingCard: React.FC<{
  logo: string
  label: string
  rating: string
  ratingFirst?: boolean
  divider?: boolean
}> = ({ logo, label, rating, ratingFirst, divider }) => {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 ${divider ? 'border-b border-black/10 sm:border-b-0 sm:border-r' : ''}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="" className="h-10 w-10 shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="font-prompt text-[15px] font-semibold capitalize text-black">{label}</span>
        <span className="inline-flex items-center gap-1.5">
          {ratingFirst && <span className="font-prompt text-[15px] font-semibold text-black">{rating}</span>}
          <Stars />
          {!ratingFirst && <span className="font-prompt text-[15px] font-semibold text-[#1a1a1a]">{rating}</span>}
        </span>
      </div>
    </div>
  )
}
