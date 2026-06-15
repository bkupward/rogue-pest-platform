import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      // Short brand line under the footer logo, e.g. "Trusted Services For Homes".
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      // "Company" column.
      name: 'navItems',
      type: 'array',
      label: 'Company Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      // "Customer Support" column.
      name: 'supportLinks',
      type: 'array',
      label: 'Customer Support Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      // Social profile URLs — each renders as a red circular icon button.
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
      ],
    },
    {
      // Bottom-bar "Designed & Managed by …" credit.
      name: 'credit',
      type: 'group',
      label: 'Credit',
      fields: [
        { name: 'prefix', type: 'text', label: 'Prefix', defaultValue: 'Designed & Managed with ❤️ by' },
        { name: 'name', type: 'text', label: 'Name', defaultValue: 'SAVAGE' },
        { name: 'url', type: 'text', label: 'URL', defaultValue: 'https://savagestrategic.io' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
