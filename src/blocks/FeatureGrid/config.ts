import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  fields: [
    {
      // Section title, e.g. "Why Birmingham Homeowners Choose Us" or
      // "Our Clear and Proven Process".
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
      // The single toggle that makes this block reusable:
      // - grid: unordered feature cards (Why Choose Us)
      // - steps: numbered, ordered steps (the process section)
      // The item fields are identical; only presentation changes.
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Feature grid', value: 'grid' },
        { label: 'Numbered steps', value: 'steps' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          // Optional icon/emoji shown in grid mode. In steps mode the position
          // number is shown instead (derived from the item order).
          name: 'icon',
          type: 'text',
          label: 'Icon',
          admin: {
            description: 'Optional icon name or emoji (shown in grid layout).',
          },
        },
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
  ],
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
}
