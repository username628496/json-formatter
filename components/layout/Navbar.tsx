'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [shared, setShared] = useState(false)

  function handleShare() {
    const jsonInput = (window as any).__jsonFormatterInput ?? ''
    const baseUrl = window.location.href.split('#')[0]

    if (jsonInput.trim()) {
      try {
        const bytes = new TextEncoder().encode(jsonInput)
        const encoded = btoa(String.fromCharCode(...bytes))
        const shareUrl = `${baseUrl}#data=${encoded}`
        navigator.clipboard.writeText(shareUrl).then(() => {
          setShared(true)
          setTimeout(() => setShared(false), 2000)
        })
      } catch {
        navigator.clipboard.writeText(baseUrl).then(() => {
          setShared(true)
          setTimeout(() => setShared(false), 2000)
        })
      }
    } else {
      navigator.clipboard.writeText(baseUrl).then(() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/json-formatter-logo.png" alt="JSON Formatter Online" width="28" height="28" className="rounded-lg" />
          <span className="font-medium text-sm">JSON Formatter Online</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="dark:hidden">
              <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.3" />
              <path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.93 2.93l.7.7M10.37 10.37l.7.7M10.37 3.63l-.7.7M3.63 10.37l-.7.7"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="hidden dark:block">
              <path d="M12 7.5A5 5 0 1 1 6.5 2a3.5 3.5 0 0 0 5.5 5.5z"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="text-sm px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-85 transition-all"
          >
            {shared ? 'Copied!' : 'Share'}
          </button>

        </div>
      </div>
    </header>
  )
}
