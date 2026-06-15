import type { Block } from 'payload'

export const ServicesTabs: Block = {
  slug: 'servicesTabs',
  interfaceName: 'ServicesTabsBlock',
  labels: {
    singular: 'Services Tabs',
    plural: 'Services Tabs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Our Pest Control Services: Tailored, Effective, Safe.',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      // Mirrors the ServicesShowcase / Archive populateBy pattern.
      name: 'populateBy',
      type: 'select',
      defaultValue: 'automatic',
      options: [
        { label: 'Automatic (from Services collection)', value: 'automatic' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      name: 'selectedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
        description: 'Max number of service tabs to show.',
      },
    },
    {
      // Shown in a service tab when that service has no Featured Image.
      name: 'defaultImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default tab image',
    },
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA Heading',
      defaultValue: 'Contact Rogue Pest Solutions Today',
    },
    {
      name: 'ctaBody',
      type: 'textarea',
      label: 'CTA Body',
      admin: {
        description: 'Use {phone} to insert the company phone number.',
      },
      defaultValue:
        'If you’re facing pest issues in your Alabama home, don’t wait for the problem to worsen. Contact Rogue Pest Solutions at {phone} for expert pest control services. Our team is ready to inspect your property, provide tailored solutions, and help you maintain a pest-free home. Call today to schedule your appointment!',
    },
  ],
}
