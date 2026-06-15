import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      // Optional announcement bar shown above the main nav. Disabled by default
      // so the header looks unchanged until an editor opts in. The phone number
      // and CTA shown in the bar come from the CompanyInfo global, not here.
      name: 'promoBar',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show promo bar',
        },
        {
          name: 'message',
          type: 'text',
          label: 'Promo message',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enabled),
            description: 'e.g. "Keep your backyard bite-free all season — Call Now!"',
          },
        },
      ],
    },
    {
      // Destination for the "Customer Portal" link in the top utility bar.
      name: 'customerPortalUrl',
      type: 'text',
      label: 'Customer Portal URL',
      admin: {
        description: 'Link target for the "Customer Portal" link in the top bar.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
