import type { Block } from 'payload'

export const BlogPosts: Block = {
  slug: 'blogPosts',
  interfaceName: 'BlogPostsBlock',
  fields: [
    {
      // Small uppercase overline, e.g. "We Stop Bugs".
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      // Section heading, e.g. "Rogue Pest Solutions Pest Blog Posts".
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      // How many of the most recent posts to show.
      name: 'limit',
      type: 'number',
      label: 'Number of posts',
      defaultValue: 3,
      admin: { step: 1 },
    },
  ],
  labels: {
    singular: 'Blog Posts',
    plural: 'Blog Posts',
  },
}
