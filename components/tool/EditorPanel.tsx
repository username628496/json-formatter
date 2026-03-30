'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[420px] bg-muted animate-pulse rounded-md">
      <span className="text-xs text-muted-foreground">Loading editor...</span>
    </div>
  ),
})

interface EditorPanelProps {
  value: string
  onChange: (value: string) => void
  isValid: boolean
  errorMessage?: string
  byteSize: number
}

export function EditorPanel({
  value,
  onChange,
  isValid,
  errorMessage,
  byteSize,
}: EditorPanelProps) {
  const { resolvedTheme } = useTheme()

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch {}
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">INPUT</span>
          <Badge variant="outline" className="text-xs">JSON</Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handlePaste}>
          Paste
        </Button>
      </div>

      <div className="bg-muted/30">
        <Suspense>
          <MonacoEditor
            height="420px"
            language="json"
            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
            value={value}
            onChange={(v) => onChange(v ?? '')}
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              tabSize: 2,
              renderWhitespace: 'none',
              overviewRulerLanes: 0,
            }}
          />
        </Suspense>
      </div>

      <div className="flex items-center justify-between px-3 py-2 border-t">
        {isValid ? (
          <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50">
            Valid JSON
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-red-600 border-red-300 bg-red-50">
            {errorMessage ?? 'Invalid JSON'}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">{byteSize} bytes</span>
      </div>
    </div>
  )
}