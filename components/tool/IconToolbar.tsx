'use client'

import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type IndentValue = '2' | '3' | '4' | 't' | '0'

const INDENT_OPTIONS = [
  {
    value: '2',
    label: '2 spaces',
    icon: (
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M1 2h11M4 6h7M7 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '3',
    label: '3 spaces',
    icon: (
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M1 2h11M5 6h6M8 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '4',
    label: '4 spaces',
    icon: (
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M1 2h11M6 6h5M9 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 't',
    label: 'Tab (\\t)',
    icon: (
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M2 6l2-2M2 6l2 2M4 6h7M11 3v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '0',
    label: 'Compact (0)',
    icon: (
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M1 6h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface IconToolbarProps {
  onFormat: () => void
  onMinify: () => void
  onValidate: () => void
  onSortKeys: () => void
  onRepair: () => void
  onEscape: () => void
  onUnescape: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onClear: () => void
  onUpload: (content: string) => void
  onSample: () => void
  onCopy: () => void
  onDownload: () => void
  onFullscreen: () => void
  indent: IndentValue
  onIndentChange: (value: IndentValue) => void
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground"
        aria-label={label}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="text-xs">{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function IconToolbar({
  onFormat,
  onMinify,
  onValidate,
  onSortKeys,
  onRepair,
  onEscape,
  onUnescape,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onClear,
  onUpload,
  onSample,
  onCopy,
  onDownload,
  onFullscreen,
  indent,
  onIndentChange,
}: IconToolbarProps) {
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [urlError, setUrlError] = useState('')

  const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

  function handleUploadFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      if (file.size > MAX_SIZE) {
        setUrlError('File too large — maximum is 10 MB')
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => onUpload(ev.target?.result as string)
      reader.readAsText(file)
    }
    input.click()
  }

  async function handleLoadUrl() {
    if (!url.trim()) return
    setLoading(true)
    setUrlError('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const contentLength = res.headers.get('content-length')
      if (contentLength && parseInt(contentLength) > MAX_SIZE) {
        throw new Error('Response too large — maximum is 10 MB')
      }
      const text = await res.text()
      if (text.length > MAX_SIZE) throw new Error('Response too large — maximum is 10 MB')
      JSON.parse(text)
      onUpload(text)
      setShowUrlModal(false)
      setUrl('')
    } catch (e: any) {
      setUrlError(e.name === 'AbortError' ? 'Request timed out after 10 s' : `Failed to load: ${e.message}`)
    } finally {
      clearTimeout(timeout)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="rounded-lg border bg-card px-2 py-1.5 flex items-center gap-3 flex-wrap">

        {/* Transform */}
        <div className="flex items-center">
          <IconBtn label="Format JSON (Ctrl+I)" onClick={onFormat}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 4h11M2 7.5h7M2 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Compact JSON (Ctrl+Shift+I)" onClick={onMinify}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M2 6h11M2 9h11M2 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Sort keys A-Z" onClick={onSortKeys}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 4h7M2 7.5h5M2 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 3v9M8.5 10l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Validate JSON" onClick={onValidate}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4.5 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Repair JSON" onClick={onRepair}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10.5 2a3 3 0 0 0-2.83 4L3 10.5 4.5 12l4.5-4.67A3 3 0 1 0 10.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Escape JSON string" onClick={onEscape}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 4.5h9M3 7.5h9M6 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M1.5 2.5l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Unescape JSON string" onClick={onUnescape}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 4.5h9M3 7.5h9M6 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4.5 2.5l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Undo last action"
            title="Undo last action"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M4 7H11.5C12.9 7 14 8.1 14 9.5S12.9 12 11.5 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 4.5L3.5 7 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Redo last action"
            title="Redo last action"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M11 7H3.5C2.1 7 1 8.1 1 9.5S2.1 12 3.5 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 4.5L11.5 7 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* File */}
        <div className="flex items-center">
          <IconBtn label="Load sample JSON" onClick={onSample}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="3" y="1.5" width="9" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5.5 5h4M5.5 7.5h4M5.5 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Open file" onClick={handleUploadFile}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4H6l1.5 1.5H12A1.5 1.5 0 0 1 13 7v4a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11V5.5z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </IconBtn>
          <IconBtn label="Load from URL" onClick={() => setShowUrlModal(true)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.5 2C7.5 2 5.5 4.5 5.5 7.5s2 5.5 2 5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.5 2C7.5 2 9.5 4.5 9.5 7.5s-2 5.5-2 5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 7.5h11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </IconBtn>
          <IconBtn label="Clear editor" onClick={onClear}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
        </div>

        {/* Output */}
        <div className="flex items-center">
          <IconBtn label="Copy to clipboard" onClick={onCopy}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 10V3h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Download JSON file" onClick={onDownload}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2v8M4.5 7.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
          <IconBtn label="Fullscreen editor" onClick={onFullscreen}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 2h4M2 2v4M13 2h-4M13 2v4M2 13h4M2 13v-4M13 13h-4M13 13v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconBtn>
        </div>

        {/* Indent */}
        <Select value={indent} onValueChange={(v) => onIndentChange(v as IndentValue)}>
          <SelectTrigger className="h-8 w-36 text-xs gap-2 ml-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INDENT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{opt.icon}</span>
                  <span>{opt.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

      {/* Load URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background rounded-xl border shadow-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium">Load from URL</h2>
              <button
                onClick={() => { setShowUrlModal(false); setUrlError('') }}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <input
                type="url"
                placeholder="https://api.example.com/data.json"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {urlError && <p className="text-xs text-red-500 mt-1">{urlError}</p>}
            </div>
            <Button className="w-full mb-4" onClick={handleLoadUrl} disabled={loading || !url.trim()}>
              {loading ? 'Loading...' : 'Load URL'}
            </Button>
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => { setShowUrlModal(false); setUrlError('') }}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
