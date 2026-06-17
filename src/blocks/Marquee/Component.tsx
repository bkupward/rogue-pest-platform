import React from 'react'
import { Star } from 'lucide-react'

import type { MarqueeBlock as MarqueeBlockProps } from '@/payload-types'

export const MarqueeBlock: React.FC<MarqueeBlockProps & { id?: string }> = (props) => {
  const { id, text } = props

  if (!text) return null

  // One "segment" = text + a star separator. The track holds two identical
  // groups so the CSS translateX(-50%) loop is seamless.
  const Segment = () => (
    <span className="flex shrink-0 items-center">
      <span className="font-prompt text-[16px] font-semibold uppercase tracking-[-0.5px] text-white">
        {text}
      </span>
      <Star className="mx-6 h-5 w-5 shrink-0 fill-yellow-300 text-yellow-300" />
    </span>
  )

  return (
    <section className="overflow-hidden bg-primary py-4" id={`block-${id}`}>
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 2 }).map((_, group) => (
          <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Segment key={i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
