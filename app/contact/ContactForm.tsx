'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  'Bug report',
  'Feature request',
  'General feedback',
  'Other',
]

// Replace with your Formspree endpoint: https://formspree.io/f/YOUR_ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdkrpjo'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (!message.trim()) e.message = 'Message is required'
    else if (message.trim().length < 10) e.message = 'Message is too short'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) throw new Error('Submit failed')
      setStatus('success')
      setName(''); setEmail(''); setSubject(SUBJECTS[0]); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11l5 5 9-9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-medium text-sm mb-1">Message sent!</p>
        <p className="text-xs text-muted-foreground mb-5">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:no-underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg border bg-card p-6 space-y-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium mb-1.5" htmlFor="cf-name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
            placeholder="Your name"
            autoComplete="name"
            className={`w-full px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.name ? 'border-red-400' : 'border-border'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium mb-1.5" htmlFor="cf-email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
            placeholder="you@example.com"
            autoComplete="email"
            className={`w-full px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.email ? 'border-red-400' : 'border-border'}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium mb-1.5" htmlFor="cf-subject">
          Subject
        </label>
        <select
          id="cf-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium mb-1.5" htmlFor="cf-message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: '' })) }}
          placeholder="Describe your bug, request, or feedback..."
          rows={5}
          maxLength={2000}
          className={`w-full px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-border'}`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.message
            ? <p className="text-xs text-red-500">{errors.message}</p>
            : <span />}
          <span className="text-xs text-muted-foreground">{message.length} / 2000</span>
        </div>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
          Something went wrong. Please try again or email hello@jsonformatter.codes directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

    </form>
  )
}
