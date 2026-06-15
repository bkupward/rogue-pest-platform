import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          // Reusable inner-page hero: dark image band, red badge pill, heading,
          // copy and Google/Facebook rating cards. Used on About, Services, etc.
          label: 'Inner Page',
          value: 'inner',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      // Red badge pill above the heading on the Inner Page hero, e.g.
      // "Top-Rated Pest Control in Alabama".
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        condition: (_, { type } = {}) => type === 'inner',
      },
    },
    {
      // Show the Google / Facebook rating cards on the Inner Page hero.
      name: 'showRatings',
      type: 'checkbox',
      label: 'Show rating cards',
      defaultValue: true,
      admin: {
        condition: (_, { type } = {}) => type === 'inner',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      // Short trust statements shown beneath the hero copy, e.g.
      // "Experienced Team", "Clear Communication", "Result Guarantee".
      // Optional — heroes without bullets are unaffected.
      name: 'trustBullets',
      type: 'array',
      label: 'Trust Bullets',
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          // Icon shown beside the badge. Maps to a lucide icon in the hero.
          name: 'icon',
          type: 'select',
          defaultValue: 'users',
          options: [
            { label: 'Team / Users', value: 'users' },
            { label: 'Communication', value: 'message' },
            { label: 'Guarantee / Badge', value: 'badge' },
            { label: 'Shield', value: 'shield' },
            { label: 'Check', value: 'check' },
            { label: 'Star', value: 'star' },
            { label: 'Clock', value: 'clock' },
          ],
        },
      ],
    },
    {
      // Optional social-proof badge (e.g. Facebook 5.0 Customer Rating).
      // Disabled by default so existing heroes render exactly as before.
      name: 'ratingBadge',
      type: 'group',
      label: 'Rating Badge',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show rating badge',
        },
        {
          name: 'source',
          type: 'select',
          options: [
            { label: 'Google', value: 'google' },
            { label: 'Facebook', value: 'facebook' },
          ],
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enabled),
          },
        },
        {
          name: 'rating',
          type: 'text',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enabled),
            description: 'e.g. "5.0"',
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enabled),
            description: 'Optional, e.g. "Customer Rating".',
          },
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'inner'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
