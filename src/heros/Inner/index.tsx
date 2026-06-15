import React from 'react'
import { Star } from 'lucide-react'

import type { CompanyInfo, Page } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const InnerHero: React.FC<Page['hero']> = async ({
  badge,
  media,
  richText,
  showRatings,
}) => {
  const companyInfo = (await getCachedGlobal('company-info', 1)()) as CompanyInfo

  return (
    <section className="relative overflow-hidden bg-[#260001] text-white">
      {/* Background image */}
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} className="absolute inset-0" />
      )}
      {/* Dark overlays for legibility — stronger on the left where the copy sits */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          {badge && (
            <span className="mb-6 inline-block rounded-lg bg-primary px-3 py-2 font-heading text-[18px] font-bold uppercase leading-none text-white">
              {badge}
            </span>
          )}

          {richText && (
            <RichText
              className="font-prompt [&_h1]:mb-5 [&_h1]:font-prompt [&_h1]:text-[34px] [&_h1]:font-extrabold [&_h1]:leading-[1.1] [&_h1]:tracking-[-0.5px] [&_h1]:text-white sm:[&_h1]:text-[42px] md:[&_h1]:text-[50px] md:[&_h1]:leading-[60px] [&_p]:max-w-xl [&_p]:text-[16px] [&_p]:leading-6 [&_p]:text-white/90"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}

          {showRatings && (
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
          {ratingFirst && (
            <span className="font-prompt text-[15px] font-semibold text-black">{rating}</span>
          )}
          <Stars />
          {!ratingFirst && (
            <span className="font-prompt text-[15px] font-semibold text-[#1a1a1a]">{rating}</span>
          )}
        </span>
      </div>
    </div>
  )
}
