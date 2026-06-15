import type { Block } from 'payload'

export const ServiceAreas: Block = {
  slug: 'serviceAreas',
  interfaceName: 'ServiceAreasBlock',
  fields: [
    {
      // Small uppercase overline, e.g. "Local Service You Can Count On".
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      // Main heading, e.g. "Proudly Serving Homes & Businesses Across Alabama".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      // Paragraph shown below the heading.
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      // Legacy supporting line. Kept for backwards compatibility — used as the
      // description when the Description field above is empty.
      name: 'subheading',
      type: 'text',
      label: 'Subheading (legacy)',
    },
    {
      // automatic: query the Locations collection (all)
      // manual: only the hand-picked Locations. Mirrors ServicesShowcase.
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'automatic',
      options: [
        { label: 'Automatic (all locations)', value: 'automatic' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      // Hand-picked locations, shown only in manual mode.
      name: 'selectedLocations',
      type: 'relationship',
      label: 'Selected Locations',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
      },
    },
    {
      // Toggle the location hero image in each card.
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
      // Optional section-level button label, e.g. "View All Locations".
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      // Destination for the section button, e.g. "/locations".
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
    },
  ],
  labels: {
    singular: 'Service Areas',
    plural: 'Service Areas',
  },
}
