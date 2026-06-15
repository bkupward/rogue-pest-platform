import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** Optional CMS-provided logo URL; falls back to the bundled brand logo. */
  src?: string | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Rogue Pest Solutions"
      width={283}
      height={83}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-auto', className)}
      src={src || '/rogue-logo.png'}
    />
  )
}
