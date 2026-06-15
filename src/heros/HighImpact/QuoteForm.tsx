'use client'

import React, { useState } from 'react'
import { ChevronDown, Mail, MapPin, Phone, User } from 'lucide-react'

import { getClientSideURL } from '@/utilities/getURL'

// A single form-builder field (subset we render).
type FormField = {
  blockType: string
  name: string
  label?: string | null
  required?: boolean | null
  defaultValue?: string | null
  placeholder?: string | null
  options?: { label: string; value: string }[] | null
}

export type QuoteFormDoc = {
  id: string | number
  title?: string | null
  submitButtonLabel?: string | null
  fields?: FormField[] | null
}

type Props = {
  form: QuoteFormDoc
  phone?: string | null
  title?: string
}

const inputClass =
  'h-12 w-full rounded-full border border-[rgba(4,43,84,0.2)] bg-white pl-11 pr-4 font-prompt text-[15px] text-[#1a1a1a] outline-none transition-colors placeholder:text-[#717171] focus:border-primary'
const labelClass = 'mb-1 block font-sans text-[14px] font-bold text-[#2f2c2b]'

// Pick a leading icon based on the field name (purely presentational).
const iconFor = (name: string) => {
  if (/name/i.test(name)) return User
  if (/phone|tel/i.test(name)) return Phone
  if (/email/i.test(name)) return Mail
  if (/location|address|city|zip/i.test(name)) return MapPin
  return null
}

export const QuoteForm: React.FC<Props> = ({ form, phone = '866-370-7378', title = 'Get Free Quote' }) => {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fields = (form.fields || []).filter((f) => f && f.name)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const submissionData = Array.from(fd.entries())
      .filter(([, v]) => typeof v === 'string')
      .map(([field, value]) => ({ field, value: String(value) }))

    setSubmitting(true)
    try {
      const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (req.status >= 400) {
        const res = await req.json().catch(() => ({}))
        setError(res?.errors?.[0]?.message || 'Something went wrong. Please call us.')
        setSubmitting(false)
        return
      }
      setDone(true)
    } catch {
      setError('Something went wrong. Please call us.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[514px] overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="bg-primary px-6 py-4 text-center">
        <p className="font-prompt text-[22px] font-bold tracking-[-0.5px] text-white">{title}</p>
      </div>

      {done ? (
        <div className="px-6 py-12 text-center">
          <p className="font-prompt text-lg font-bold text-[#2f2c2b]">Thank you!</p>
          <p className="mt-2 font-prompt text-sm text-[#54595f]">
            We received your request and will reach out shortly.
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-3 px-4 py-5" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Field key={field.name} field={field} phone={phone} />
          ))}

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 h-[51px] w-full rounded-lg bg-primary font-heading text-[16px] font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {submitting ? 'Sending…' : form.submitButtonLabel || 'Request Free Quote'}
          </button>
        </form>
      )}
    </div>
  )
}

const Field: React.FC<{ field: FormField; phone?: string | null }> = ({ field, phone }) => {
  const { blockType, name, label, required } = field
  const id = `qf-${name}`
  const labelEl = label ? (
    <label className={labelClass} htmlFor={id}>
      {label} {required && <span className="text-red-600">*</span>}
    </label>
  ) : null

  // Checkbox (e.g. SMS consent) — small inline legal label.
  if (blockType === 'checkbox') {
    return (
      <label className="flex items-start gap-2.5 pt-1">
        <input
          id={id}
          type="checkbox"
          name={name}
          required={Boolean(required)}
          className="mt-0.5 h-6 w-6 shrink-0 rounded-xl border-2 border-primary accent-primary"
        />
        <span className="font-prompt text-[10px] leading-[14px] text-[#2f2c2b]">{label}</span>
      </label>
    )
  }

  // Select / dropdown.
  if (blockType === 'select') {
    return (
      <div>
        {labelEl}
        <div className="relative">
          <select
            id={id}
            name={name}
            required={Boolean(required)}
            defaultValue=""
            className={`${inputClass} h-[42px] cursor-pointer appearance-none pl-4 pr-10`}
          >
            <option value="" disabled>
              Select…
            </option>
            {(field.options || []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[11px] w-[11px] -translate-y-1/2 text-[#2f2c2b]" />
        </div>
      </div>
    )
  }

  if (blockType === 'textarea') {
    return (
      <div>
        {labelEl}
        <textarea
          id={id}
          name={name}
          required={Boolean(required)}
          rows={3}
          className="w-full rounded-2xl border border-[rgba(4,43,84,0.2)] bg-white px-4 py-3 font-prompt text-[15px] text-[#1a1a1a] outline-none focus:border-primary"
        />
      </div>
    )
  }

  if (blockType === 'message') {
    return <p className="font-prompt text-[12px] text-[#717171]">{label}</p>
  }

  // text / email / number — pill input with leading icon (+ "+1" for phone).
  const Icon = iconFor(name)
  const isPhone = /phone|tel/i.test(name)
  const type = blockType === 'email' ? 'email' : blockType === 'number' ? 'number' : isPhone ? 'tel' : 'text'

  return (
    <div>
      {labelEl}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#1a1a1a] opacity-50" />
        )}
        {isPhone && (
          <span className="pointer-events-none absolute left-[34px] top-1/2 -translate-y-1/2 font-prompt text-[16px] text-[#717171]">
            +1
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          required={Boolean(required)}
          placeholder={field.placeholder || undefined}
          className={`${inputClass} ${isPhone ? 'pl-[58px]' : ''} ${!Icon ? 'pl-4' : ''}`}
          aria-label={label || name}
        />
      </div>
    </div>
  )
}
