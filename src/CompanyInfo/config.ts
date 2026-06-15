import type { GlobalConfig } from 'payload'

import { revalidateCompanyInfo } from './hooks/revalidateCompanyInfo'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Site-wide business details (phone, address, hours, ratings, primary CTA) read across the whole site.',
  },
  fields: [
    {
      // Full brand wordmark logo — used in the header (and anywhere the full
      // logo is shown). Falls back to /public/rogue-logo.png when empty.
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (wordmark)',
    },
    {
      // Square brand monogram — used in the footer and the services tabs.
      // Falls back to /public/rogue-monogram.jpg when empty.
      name: 'logoIcon',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Icon (monogram)',
    },
    {
      // Legal/brand name, used in the footer, copyright line, and SEO.
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      required: true,
    },
    {
      // The main phone number — appears in the promo bar, CTAs, and footer.
      name: 'phone',
      type: 'text',
      label: 'Phone',
      required: true,
    },
    {
      // Primary contact email shown on the contact page and footer.
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      // Street portion of the business address (e.g. "84 Coy Drive").
      name: 'streetAddress',
      type: 'text',
      label: 'Street Address',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
    },
    {
      name: 'zip',
      type: 'text',
      label: 'Zip',
    },
    {
      // Free-form hours, e.g. "Mon - Sun: 8AM - 9PM". Textarea so multiple
      // lines / day ranges can be entered.
      name: 'businessHours',
      type: 'textarea',
      label: 'Business Hours',
    },
    {
      // Star rating shown in trust badges, e.g. "4.9". Stored as text so values
      // like "5.0" keep their trailing zero.
      name: 'googleRating',
      type: 'text',
      label: 'Google Rating',
    },
    {
      name: 'facebookRating',
      type: 'text',
      label: 'Facebook Rating',
    },
    {
      // Label for the main site-wide call-to-action button, e.g. "Request a Quote".
      name: 'primaryCtaText',
      type: 'text',
      label: 'Primary CTA Text',
    },
    {
      // Destination for the primary CTA, e.g. "/contact" or a tel: link.
      name: 'primaryCtaUrl',
      type: 'text',
      label: 'Primary CTA URL',
    },
  ],
  hooks: {
    afterChange: [revalidateCompanyInfo],
  },
}
