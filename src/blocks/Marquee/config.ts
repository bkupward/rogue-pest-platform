import type { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  fields: [
    {
      // The line of text that scrolls continuously across the band.
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
    },
  ],
  labels: {
    singular: 'Marquee',
    plural: 'Marquees',
  },
}
