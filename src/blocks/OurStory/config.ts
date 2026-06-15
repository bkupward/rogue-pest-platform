import type { Block } from 'payload'

import { link } from '@/fields/link'

export const OurStory: Block = {
  slug: 'ourStory',
  interfaceName: 'OurStoryBlock',
  labels: {
    singular: 'Our Story',
    plural: 'Our Story',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Who We Are',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Our Story',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
    },
    {
      // Left-hand image. Optional — falls back to the static brand image.
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'checklist',
      type: 'array',
      label: 'Checklist',
      maxRows: 5,
      admin: { initCollapsed: true },
      fields: [
        {
          // Bold lead-in, e.g. "Customized Treatments:".
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
        },
      ],
    },
    link({ appearances: false }),
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'value', type: 'text', label: 'Value', required: true },
        { name: 'suffix', type: 'text', label: 'Suffix', defaultValue: '+' },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
    },
    {
      // Decorative truck image shown bottom-right. Toggle off to hide.
      name: 'showTruck',
      type: 'checkbox',
      label: 'Show decorative truck',
      defaultValue: true,
    },
  ],
}
