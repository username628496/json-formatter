'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[420px] bg-muted animate-pulse rounded-md">
      <span className="text-xs text-muted-foreground">Loading...</span>
    </div>
  ),
})

type ViewMode = 'code' | 'tree' | 'text'

function TreeNode({ data, keyName, depth }: { data: any; keyName?: string; depth: number }) {
  const [open, setOpen] = useState(depth < 2)
  const isObject = data !== null && typeof data === 'object'
  const isArray = Array.isArray(data)

  if (!isObject) {
    const color =
      typeof data === 'string' ? 'text-green-600 dark:text-green-400' :
      typeof data === 'number' ? 'text-blue-600 dark:text-blue-400' :
      typeof data === 'boolean' ? 'text-purple-600 dark:text-purple-400' :
      'text-gray-400'
    return (
      <div className="flex items-center gap-1 py-0.5" style={{ paddingLeft: depth * 16 }}>
        {keyName !== undefined && (
          <span className="text-foreground font-medium">{keyName}{': '}</span>
        )}
        <span className={color}>
          {typeof data === 'string' ? '"' + data + '"' : String(data)}
        </span>
      </div>
    )
  }

  const entries: [string, any][] = isArray
    ? data.map((v: any, i: number) => [String(i), v])
    : Object.entries(data)
  const bracket = isArray ? ['[', ']'] : ['{', '}']

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <div
        className="flex items-center gap-1 py-0.5 cursor-pointer hover:text-foreground"
        onClick={() => setOpen(!open)}
      >
        <span className="text-muted-foreground text-xs w-3">
          {open ? '▾' : '▸'}
        </span>
        {keyName !== undefined && (
          <span className="text-foreground font-medium">{keyName}{': '}</span>
        )}
        <span className="text-muted-foreground">
          {bracket[0]}
          {!open && (
            <span className="text-xs ml-1 text-muted-foreground">
              {entries.length} {isArray ? 'items' : 'keys'}
            </span>
          )}
          {!open && bracket[1]}
        </span>
      </div>
      {open && (
        <>
          {entries.map(([k, v]: [string, any]) => (
            <TreeNode key={k} data={v} keyName={isArray ? undefined : k} depth={depth + 1} />
          ))}
          <div style={{ paddingLeft: 0 }} className="py-0.5">
            <span className="text-muted-foreground">{bracket[1]}</span>
          </div>
        </>
      )}
    </div>
  )
}

interface OutputPanelProps {
  value: string
  label: string
  byteSize: number
  status: 'formatted' | 'minified' | 'validated' | 'error'
  language?: string
}

export function OutputPanel({
  value,
  label,
  byteSize,
  status,
  language = 'json',
}: OutputPanelProps) {
  const { resolvedTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('code')

  let parsedValue: any = null
  try {
    parsedValue = JSON.parse(value)
  } catch {
    parsedValue = null
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  function handleDownload() {
    const blob = new Blob([value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'output.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const badgeClass =
    status === 'error'
      ? 'text-red-600 border-red-300 bg-red-50'
      : status === 'formatted' || status === 'minified'
      ? 'text-green-600 border-green-300 bg-green-50'
      : 'text-blue-600 border-blue-300 bg-blue-50'

  const badgeLabel =
    status === 'formatted' ? 'Formatted' :
    status === 'minified' ? 'Minified' :
    status === 'validated' ? 'Valid' :
    'Error'

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">OUTPUT</span>
          <Badge variant="outline" className={`text-xs ${badgeClass}`}>
            {badgeLabel}
          </Badge>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 border border-border rounded-md p-0.5">
          {(['code', 'tree', 'text'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 py-0.5 text-xs rounded transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-foreground text-background'
                  : 'hover:bg-muted'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleDownload} disabled={!value}>
            Download
          </Button>
        </div>
      </div>

      {viewMode === 'code' && (
        <div className="bg-muted/30">
          <MonacoEditor
            height="420px"
            language={language}
            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
            value={value || ''}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 12,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              renderWhitespace: 'none',
              overviewRulerLanes: 0,
              scrollbar: { vertical: 'auto', horizontal: 'auto' },
            }}
          />
        </div>
      )}

      {viewMode === 'tree' && (
        <div className="bg-muted/30 min-h-[420px] max-h-[420px] overflow-auto p-3 font-mono text-xs">
          {parsedValue !== null ? (
            <TreeNode data={parsedValue} depth={0} />
          ) : (
            <span className="text-muted-foreground">Output will appear here...</span>
          )}
        </div>
      )}

      {viewMode === 'text' && (
        <textarea
          readOnly
          value={value}
          className="w-full min-h-[420px] max-h-[420px] p-3 text-xs font-mono bg-muted/30 border-none outline-none resize-none text-foreground"
        />
      )}

      <div className="flex items-center justify-between px-3 py-2 border-t">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{byteSize} bytes</span>
      </div>
    </div>
  )
}
