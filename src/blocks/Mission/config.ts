import type { Block } from 'payload'

export const Mission: Block = {
  slug: 'mission',
  interfaceName: 'MissionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      // The vertical tab switcher, e.g. "Our Mission" / "Our Values".
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', label: 'Tab label', required: true },
        { name: 'heading', type: 'text', label: 'Content heading' },
        { name: 'body', type: 'textarea', label: 'Content body' },
      ],
    },
    {
      // The highlighted contact card shown beside the tab content.
      name: 'card',
      type: 'group',
      label: 'Contact card',
      fields: [
        { name: 'heading', type: 'text', label: 'Heading' },
        { name: 'body', type: 'textarea', label: 'Body' },
        { name: 'phone', type: 'text', label: 'Phone label' },
        { name: 'phoneUrl', type: 'text', label: 'Phone link' },
        { name: 'secondaryLabel', type: 'text', label: 'Secondary button label' },
        { name: 'secondaryUrl', type: 'text', label: 'Secondary button link' },
      ],
    },
  ],
  labels: {
    singular: 'Mission',
    plural: 'Missions',
  },
}
