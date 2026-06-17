import type { Block } from 'payload'

export const PromoBanner: Block = {
  slug: 'promoBanner',
  interfaceName: 'PromoBannerBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button label',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button link',
    },
    {
      // Image shown on the right side of the banner.
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
  labels: {
    singular: 'Promo Banner',
    plural: 'Promo Banners',
  },
}
