import type { Block } from 'payload'

export const WhyChooseAccordion: Block = {
  slug: 'whyChooseAccordion',
  interfaceName: 'WhyChooseAccordionBlock',
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
      name: 'items',
      type: 'array',
      label: 'Accordion items',
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'body', type: 'textarea', label: 'Body' },
      ],
    },
  ],
  labels: {
    singular: 'Why Choose Accordion',
    plural: 'Why Choose Accordions',
  },
}
