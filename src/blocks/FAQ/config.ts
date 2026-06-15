import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      // Section title, e.g. "Have questions? We've got the answers".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      // automatic: query the FAQs collection (with the filters below)
      // manual: only the hand-picked FAQs. Same populateBy pattern as the
      // Archive / ServicesShowcase / Testimonials blocks.
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'automatic',
      options: [
        { label: 'Automatic (from collection)', value: 'automatic' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      // Restrict to one topic. Options mirror the FAQs collection `topic` field.
      name: 'filterByTopic',
      type: 'select',
      label: 'Filter By Topic',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Termite', value: 'termite' },
        { label: 'Mosquito', value: 'mosquito' },
        { label: 'Rodent', value: 'rodent' },
        { label: 'Safety', value: 'safety' },
        { label: 'Pricing', value: 'pricing' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Restrict to FAQs linked to a service — used on a service page.
      name: 'filterByService',
      type: 'relationship',
      label: 'Filter By Service',
      relationTo: 'services',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Restrict to FAQs linked to a location — used on a location page.
      name: 'filterByLocation',
      type: 'relationship',
      label: 'Filter By Location',
      relationTo: 'locations',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 10,
      admin: {
        step: 1,
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Hand-picked FAQs, shown only in manual mode.
      name: 'selectedFaqs',
      type: 'relationship',
      label: 'Selected FAQs',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
      },
    },
  ],
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
}
