import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty.
//
// This is the slug:'home' fallback rendered by app/(frontend)/[slug]/page.tsx
// when no `home` Page exists in the database yet. It scaffolds the full homepage
// block stack so the structure can be assembled and previewed without seeding
// collection content.
//
// Blocks omitted on purpose (they require seeded relationships and must be added
// in the admin once that content exists):
//   - Free Quote form  (formBlock → requires a Forms doc)        [position 1]
//   - Our Story image   (mediaBlock → requires a Media upload)   [position 4]
//   - Why Choose Us image (mediaBlock → requires a Media upload) [position 12]
//   - Instant Estimate form (formBlock → requires a Forms doc)   [position 17]
// The hero image is likewise left unset — attach it in the admin.
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Home',
  hero: {
    type: 'highImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h1',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Your Guard Against Pests in Alabama!',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Reliable, eco-friendly pest control for homes and businesses across Alabama.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Request a Quote',
          url: '/contact',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'Call Now',
          url: '/contact',
        },
      },
    ],
    trustBullets: [
      { text: 'Experienced Team' },
      { text: 'Clear Communication' },
      { text: 'Result Guarantee' },
    ],
    ratingBadge: {
      enabled: true,
      source: 'facebook',
      rating: '5.0',
      label: 'Customer Rating',
    },
  },
  meta: {
    description: 'Eco-friendly pest control for homes and businesses across Alabama.',
    title: 'Rogue Pest Solutions',
  },
  layout: [
    // [1] Free Quote form — omitted (formBlock requires a Forms doc)

    // [2] Testimonials — queries the Testimonials collection (featured)
    {
      blockType: 'testimonials',
      heading: 'What Our Customers Say',
      subheading: 'Trusted by homeowners across Alabama',
      populateBy: 'automatic',
      featuredOnly: true,
      showRating: true,
      limit: 3,
    },

    // [3] Our Story — intro copy (body to be written by an editor)
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Our Story',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          enableLink: false,
        },
      ],
    },

    // [4] Our Story image — omitted (mediaBlock requires a Media upload)

    // [5] Our Story values
    {
      blockType: 'featureGrid',
      heading: 'Why Homeowners Trust Us',
      layout: 'grid',
      items: [],
    },

    // [6] Stats
    {
      blockType: 'stats',
      heading: 'Trusted Across Alabama',
      stats: [
        { value: '1500', suffix: '+', label: 'Customers Served' },
        { value: '20', suffix: '+', label: 'Years Experience' },
        { value: '98', suffix: '%', label: 'Customer Satisfaction' },
        { value: '5.0', label: 'Rating' },
      ],
    },

    // [7] Services overview — queries the Services collection
    {
      blockType: 'servicesShowcase',
      heading: 'Our Pest Control Services',
      subheading: 'Tailored, Effective, Safe.',
      populateBy: 'automatic',
      showImages: true,
      showExcerpts: true,
      buttonText: 'View All Services',
      buttonUrl: '/services',
    },

    // [8] Process steps (numbered)
    {
      blockType: 'featureGrid',
      heading: 'Our Clear and Proven Process',
      subheading: 'Stress-Free from Start to Finish',
      layout: 'steps',
      items: [],
    },

    // [9] CTA
    {
      blockType: 'cta',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Ready for a pest-free property?',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      links: [],
    },

    // [10] Why Choose Us — intro copy
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Why Choose Us',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          enableLink: false,
        },
      ],
    },

    // [11] Why Choose Us value cards
    {
      blockType: 'featureGrid',
      heading: 'Why Birmingham Homeowners Choose Us',
      layout: 'grid',
      items: [],
    },

    // [12] Why Choose Us image — omitted (mediaBlock requires a Media upload)

    // [13] CTA
    {
      blockType: 'cta',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Get a Free Quote',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      links: [],
    },

    // [14] FAQ — queries the FAQs collection
    {
      blockType: 'faq',
      heading: 'Have Questions? We’ve Got the Answers',
      populateBy: 'automatic',
      limit: 10,
    },

    // [15] Latest posts — queries the Posts collection
    {
      blockType: 'archive',
      introContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'From the Blog',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      populateBy: 'collection',
      relationTo: 'posts',
      limit: 3,
    },

    // [16] Service areas — queries the Locations collection
    {
      blockType: 'serviceAreas',
      heading: 'Local Service You Can Count On',
      subheading: 'Proudly Serving Homes & Businesses Across Alabama',
      populateBy: 'automatic',
      showImages: true,
      showExcerpts: true,
      buttonText: 'View All Locations',
      buttonUrl: '/locations',
    },

    // [17] Instant Estimate form — omitted (formBlock requires a Forms doc)
  ],
}
