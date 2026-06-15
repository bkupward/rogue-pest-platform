import type { Post, BlogPostsBlock as BlogPostsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'

const formatDate = (value?: string | null): string => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const BlogPostsBlock: React.FC<BlogPostsBlockProps & { id?: string }> = async (props) => {
  const { id, eyebrow, heading, limit } = props

  const payload = await getPayload({ config: configPromise })
  const fetched = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit || 3,
    overrideAccess: false,
    sort: '-publishedAt',
  })
  const posts: Post[] = fetched.docs

  if (posts.length === 0) return null

  return (
    <section className="section-y" id={`block-${id}`}>
      <div className="container">
        {(eyebrow || heading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <p className="mb-3 font-sans text-[13.9px] font-extrabold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-prompt text-[32px] font-extrabold tracking-[-0.5px] text-[#2f2c2b] md:text-[38px]">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const href = `/posts/${post.slug}`
            const image =
              (post.heroImage && typeof post.heroImage === 'object' && post.heroImage) ||
              (post.meta?.image && typeof post.meta.image === 'object' && post.meta.image) ||
              null
            const excerpt = post.meta?.description
            const date = formatDate(post.publishedAt)

            return (
              <article
                key={post.id ?? index}
                className="group flex flex-col overflow-hidden rounded-xl border border-[rgba(0,41,81,0.2)] bg-white"
              >
                <Link href={href} className="block aspect-[411/300] overflow-hidden bg-[#f8f8f8]">
                  {image && (
                    <Media
                      resource={image}
                      imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  {date && (
                    <p className="font-prompt text-[14px] uppercase leading-6 text-[#1a1a1a]">
                      {date}
                    </p>
                  )}
                  <h3 className="mt-1 font-prompt text-[21px] font-semibold leading-[26px] text-[#2f2c2b]">
                    <Link href={href} className="transition-colors hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                  {excerpt && (
                    <p className="mt-3 line-clamp-3 font-prompt text-[14px] leading-6 text-[#1a1a1a]">
                      {excerpt}
                    </p>
                  )}
                  <Link
                    href={href}
                    className="mt-4 inline-flex font-heading text-[16px] font-bold text-primary hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
