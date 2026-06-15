import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  fields: [
    {
      // Small uppercase overline, e.g.
      // "Dedicated to Quality Service and Community Engagement".
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      // Section heading, e.g. "Why Birmingham, Alabama Homeowners Choose Us".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      // Intro paragraph shown centered below the heading.
      name: 'intro',
      type: 'textarea',
      label: 'Intro',
    },
    {
      // The large photo shown on the left, overlapped by the red card.
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Rendered as a two-column grid inside the red card.',
      },
      fields: [
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
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      maxRows: 2,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
          admin: {
            description: 'e.g. /contact or tel:8663707378',
          },
        },
        {
          // Shows a phone icon before the label (for the call button).
          name: 'showPhoneIcon',
          type: 'checkbox',
          label: 'Show phone icon',
          defaultValue: false,
        },
      ],
    },
  ],
  labels: {
    singular: 'Why Choose Us',
    plural: 'Why Choose Us',
  },
}
