import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  fields: [
    {
      // Small uppercase overline above the heading, e.g.
      // "Stress-Free from Start to Finish".
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      // Section heading, e.g. "Our Clear and Proven Process".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Each step shows an icon, a title and a short description.',
      },
      fields: [
        {
          // Icon shown inside the circle. An uploaded SVG/PNG renders best.
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          // Circle background colour. Matches the alternating yellow/white
          // treatment in the design.
          name: 'iconColor',
          type: 'select',
          label: 'Icon circle colour',
          defaultValue: 'yellow',
          options: [
            { label: 'Yellow', value: 'yellow' },
            { label: 'White', value: 'white' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
    {
      // Optional phone call-to-action button below the steps.
      name: 'cta',
      type: 'group',
      label: 'Call to action',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button label',
          admin: {
            description: 'e.g. a phone number. Leave blank to hide the button.',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button link',
          admin: {
            description: 'e.g. tel:8663707378',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Process',
    plural: 'Process',
  },
}
