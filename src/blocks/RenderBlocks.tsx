import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BlogPostsBlock } from '@/blocks/BlogPosts/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MarqueeBlock } from '@/blocks/Marquee/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MissionBlock } from '@/blocks/Mission/Component'
import { OurApproachBlock } from '@/blocks/OurApproach/Component'
import { OurStoryBlock } from '@/blocks/OurStory/Component'
import { ProcessBlock } from '@/blocks/Process/Component'
import { PromoBannerBlock } from '@/blocks/PromoBanner/Component'
import { ServiceAreasBlock } from '@/blocks/ServiceAreas/Component'
import { WhyChooseAccordionBlock } from '@/blocks/WhyChooseAccordion/Component'
import { ServicesShowcaseBlock } from '@/blocks/ServicesShowcase/Component'
import { ServicesTabsBlock } from '@/blocks/ServicesTabs/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  servicesShowcase: ServicesShowcaseBlock,
  testimonials: TestimonialsBlock,
  faq: FAQBlock,
  serviceAreas: ServiceAreasBlock,
  featureGrid: FeatureGridBlock,
  stats: StatsBlock,
  ourStory: OurStoryBlock,
  servicesTabs: ServicesTabsBlock,
  process: ProcessBlock,
  whyChooseUs: WhyChooseUsBlock,
  blogPosts: BlogPostsBlock,
  ourApproach: OurApproachBlock,
  marquee: MarqueeBlock,
  mission: MissionBlock,
  promoBanner: PromoBannerBlock,
  whyChooseAccordion: WhyChooseAccordionBlock,
}

/*
 * Blocks that manage their own vertical spacing (via `section-y` or an internal
 * `my-16`). These render WITHOUT the outer `my-16` margin so full-width colored
 * bands can sit edge-to-edge. Blocks NOT listed here (cta, formBlock, mediaBlock)
 * keep the outer `my-16` they rely on — preserving existing spacing.
 * See docs/SPACING-AUDIT.md.
 */
const selfSpacedBlocks = new Set([
  'archive',
  'content',
  'ourStory',
  'process',
  'whyChooseUs',
  'blogPosts',
  'ourApproach',
  'marquee',
  'mission',
  'promoBanner',
  'whyChooseAccordion',
  'faq',
  'featureGrid',
  'servicesShowcase',
  'servicesTabs',
  'serviceAreas',
  'stats',
  'testimonials',
])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={selfSpacedBlocks.has(blockType) ? undefined : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
