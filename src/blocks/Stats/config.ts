import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      // Section title, e.g. "Trusted Across Alabama".
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
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          // The number/figure. Text (not number) so values like "1,500" or
          // "5.0" keep their formatting; prefix/suffix add symbols.
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          // Optional symbol shown before the value, e.g. "$".
          name: 'prefix',
          type: 'text',
          label: 'Prefix',
        },
        {
          // Optional symbol shown after the value, e.g. "+" or "%".
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
        },
      ],
    },
  ],
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
}
