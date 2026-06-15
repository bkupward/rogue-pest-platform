import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      // Section title, e.g. "What Our Customers Say".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      // Supporting line, e.g. "Trusted by Birmingham, Cullman, Huntsville…".
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      // automatic: query the Testimonials collection (with the filters below)
      // manual: only the hand-picked Testimonials. Mirrors the Archive /
      // ServicesShowcase populateBy pattern.
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
      // Show only reviews flagged Featured — used on the homepage / about page.
      name: 'featuredOnly',
      type: 'checkbox',
      label: 'Featured only',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Restrict to one service area — used on a location page to show local
      // reviews. Reads the `location` relationship on each testimonial.
      name: 'filterByLocation',
      type: 'relationship',
      label: 'Filter By Location',
      relationTo: 'locations',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Cap how many are shown (testimonials can grow large over time).
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 6,
      admin: {
        step: 1,
        condition: (_, siblingData) => siblingData?.populateBy === 'automatic',
      },
    },
    {
      // Hand-picked reviews, shown only in manual mode.
      name: 'selectedTestimonials',
      type: 'relationship',
      label: 'Selected Testimonials',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
      },
    },
    {
      // Toggle the star rating display per card.
      name: 'showRating',
      type: 'checkbox',
      label: 'Show Rating',
      defaultValue: true,
    },
  ],
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
}
