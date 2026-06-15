import type { Block } from 'payload'

export const ServicesShowcase: Block = {
  slug: 'servicesShowcase',
  interfaceName: 'ServicesShowcaseBlock',
  fields: [
    {
      // Section title, e.g. "Our Pest Control Services".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      // Supporting line under the heading, e.g. "Tailored, Effective, Safe.".
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      // Controls where the list comes from:
      // - automatic: query the Services collection (newest set, all)
      // - manual: only the hand-picked Services below
      // Mirrors the Archive block's populateBy pattern.
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'automatic',
      options: [
        { label: 'Automatic (all services)', value: 'automatic' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      // Hand-picked services, shown only in manual mode.
      name: 'selectedServices',
      type: 'relationship',
      label: 'Selected Services',
      relationTo: 'services',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
      },
    },
    {
      // Toggle the service featured image in each card.
      name: 'showImages',
      type: 'checkbox',
      label: 'Show Images',
      defaultValue: true,
    },
    {
      // Toggle the short-description excerpt in each card.
      name: 'showExcerpts',
      type: 'checkbox',
      label: 'Show Excerpts',
      defaultValue: true,
    },
    {
      // Optional section-level button label, e.g. "View All Services".
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      // Destination for the section button, e.g. "/services".
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
    },
  ],
  labels: {
    singular: 'Services Showcase',
    plural: 'Services Showcases',
  },
}
