import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    // Public read — FAQs are shown on the marketing site.
    read: anyone,
    // Only logged-in admin users can create/update/delete them.
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    // Use the question as the document label in the admin list/edit views.
    useAsTitle: 'question',
    defaultColumns: ['question', 'topic', 'relatedService', 'relatedLocation', 'displayOrder'],
  },
  fields: [
    {
      // The question text. Used as the admin document title (see `useAsTitle`)
      // and as the accordion header on the front end.
      name: 'question',
      type: 'text',
      label: 'Question',
      required: true,
    },
    {
      // The answer. richText (not textarea) because answers often need links
      // (e.g. to a service page) and light formatting; uses the project's
      // default Lexical editor, consistent with Services/Locations content.
      name: 'answer',
      type: 'richText',
      label: 'Answer',
      required: true,
    },
    {
      // Optional grouping so a block can show, e.g., only termite questions.
      // Kept as a select for consistent, filterable values.
      name: 'topic',
      type: 'select',
      label: 'Topic',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Termite', value: 'termite' },
        { label: 'Mosquito', value: 'mosquito' },
        { label: 'Rodent', value: 'rodent' },
        { label: 'Safety', value: 'safety' },
        { label: 'Pricing', value: 'pricing' },
      ],
    },
    {
      // Optional link to the service this FAQ relates to, so a service page can
      // surface its own questions (the reference site repeats FAQs per service).
      name: 'relatedService',
      type: 'relationship',
      label: 'Related Service',
      relationTo: 'services',
    },
    {
      // Optional link to the service area this FAQ relates to, so a location
      // page can surface region-specific questions.
      name: 'relatedLocation',
      type: 'relationship',
      label: 'Related Location',
      relationTo: 'locations',
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
  ],
  // Auto-manage `createdAt` / `updatedAt` (matches Services/Locations).
  timestamps: true,
}
