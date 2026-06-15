import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    // Public read — testimonials are shown on the marketing site.
    read: anyone,
    // Only logged-in admin users can create/update/delete them.
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    // Use the customer's name as the document label in the admin list/edit views.
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'rating', 'location', 'featured', 'displayOrder'],
  },
  fields: [
    {
      // Who left the review. Used as the admin document title (see `useAsTitle`)
      // and displayed as the attribution on the front end.
      name: 'customerName',
      type: 'text',
      label: 'Customer Name',
      required: true,
    },
    {
      // The review body. Textarea (not richText) because testimonials are short
      // plain-text quotes, not formatted articles.
      name: 'reviewText',
      type: 'textarea',
      label: 'Review Text',
      required: true,
    },
    {
      // Star rating 1–5, rendered as stars on the front end. Constrained with
      // min/max so editors can't enter out-of-range values; defaults to 5.
      name: 'rating',
      type: 'number',
      label: 'Rating',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        step: 1,
        description: 'Star rating from 1 to 5.',
      },
    },
    {
      // Optional link to the service area this review relates to, so a
      // location-specific block can filter testimonials by region.
      name: 'location',
      type: 'relationship',
      label: 'Location',
      relationTo: 'locations',
    },
    {
      // Flags a standout review for "featured" placements (e.g. homepage).
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
    },
    {
      // Manual sort order for curated lists. Lower numbers appear first.
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      admin: {
        step: 1,
        description: 'Lower numbers appear first in curated lists.',
      },
    },
    {
      // Optional link to the original Google review for verification/credibility.
      name: 'googleReviewUrl',
      type: 'text',
      label: 'Google Review URL',
    },
  ],
  // Auto-manage `createdAt` / `updatedAt` (matches Services/Locations).
  timestamps: true,
}
