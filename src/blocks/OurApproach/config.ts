import type { Block } from 'payload'

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro',
    },
    {
      // Bold subheading above the list, e.g. "We help:".
      name: 'listHeading',
      type: 'text',
      label: 'List heading',
    },
    {
      name: 'items',
      type: 'array',
      label: 'List items',
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'text', type: 'textarea', label: 'Text' },
      ],
    },
    {
      // Closing paragraph below the list.
      name: 'footnote',
      type: 'textarea',
      label: 'Footnote',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
  labels: {
    singular: 'Our Approach',
    plural: 'Our Approach',
  },
}
