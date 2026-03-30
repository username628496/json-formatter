'use client'

import { useState, useEffect, useRef } from 'react'
import { EditorPanel } from './EditorPanel'
import { OutputPanel } from './OutputPanel'
import { IconToolbar, IndentValue } from './IconToolbar'
import { StatsBar } from './StatsBar'
import { ConvertSection } from './ConvertSection'
import { ContentSection } from './ContentSection'
import { FaqSection } from './FaqSection'
import {
  formatJSON,
  minifyJSON,
  validateJSON,
  sortKeys,
  repairJSON,
  escapeJSON,
  unescapeJSON,
  countKeys,
  getDepth,
  getByteSize,
  getLineCount,
} from '@/lib/json-utils'

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "city": "Hanoi",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React"
  ],
  "active": true
}`

type OutputStatus = 'formatted' | 'minified' | 'validated' | 'error'

export function ToolLayout() {
  const [input, setInput] = useState(SAMPLE_JSON)
  const [output, setOutput] = useState('')
  const [outputLabel, setOutputLabel] = useState('Ready')
  const [outputStatus, setOutputStatus] = useState<OutputStatus>('formatted')
  const [indent, setIndent] = useState<IndentValue>('2')
  const [fullscreen, setFullscreen] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [future, setFuture] = useState<string[]>([])
  const formatTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const validation = validateJSON(input)
  const parsedInput = validation.valid ? JSON.parse(input) : null
  const keys = parsedInput ? countKeys(parsedInput) : 0
  const depth = parsedInput ? getDepth(parsedInput) : 0
  const bytes = getByteSize(input)
  const lines = getLineCount(input)
  const chars = input.length

  // Sync input to window global so Navbar Share button can read it
  useEffect(() => {
    (window as any).__jsonFormatterInput = input
  }, [input])

  // Load JSON from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#data=')) {
      try {
        const encoded = hash.replace('#data=', '')
        const decoded = new TextDecoder().decode(
          Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
        )
        setInput(decoded)
      } catch {}
    }
  }, [])

  // Auto-format - debounced so rapid typing doesn't parse on every keystroke
  useEffect(() => {
    if (formatTimer.current) clearTimeout(formatTimer.current)
    formatTimer.current = setTimeout(() => runFormat(input, indent), 300)
    return () => {
      if (formatTimer.current) clearTimeout(formatTimer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, indent])

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false)
        return
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'i' || e.key === 'I') {
          if (e.shiftKey) {
            e.preventDefault()
            runMinify(input)
          } else {
            e.preventDefault()
            runFormat(input, indent)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [input, indent, fullscreen])

  function runFormat(src: string, ind: IndentValue) {
    try {
      const indVal = ind === 't' ? '\t' : ind === '0' ? 0 : parseInt(ind)
      const result = formatJSON(src, indVal)
      setOutput(result)
      setOutputStatus('formatted')
      const indentLabel = ind === 't' ? 'Tab' : ind === '0' ? 'Compact' : `${ind} spaces`
      setOutputLabel(`Beautified - ${indentLabel}`)
    } catch (e: any) {
      setOutput(`Error: ${e.message}`)
      setOutputStatus('error')
      setOutputLabel('Error')
    }
  }

  function runValidate(src: string) {
    const v = validateJSON(src)
    if (v.valid) {
      setOutput('✓ JSON is valid.\n\nNo syntax errors found.')
      setOutputStatus('validated')
      setOutputLabel('Validated')
    } else {
      setOutput(`✗ Invalid JSON:\n\n${v.error}`)
      setOutputStatus('error')
      setOutputLabel('Invalid')
    }
  }

  function runMinify(src: string) {
    try {
      const result = minifyJSON(src)
      const saved = Math.round((1 - getByteSize(result) / getByteSize(src)) * 100)
      setOutput(result)
      setOutputStatus('minified')
      setOutputLabel(`Minified - saved ${saved}%`)
    } catch (e: any) {
      setOutput(`Error: ${e.message}`)
      setOutputStatus('error')
      setOutputLabel('Error')
    }
  }

  function pushHistory(current: string) {
    if (history.length > 0 && history[history.length - 1] === current) return
    const next = [...history, current]
    setHistory(next.length > 50 ? next.slice(-50) : next)
    setFuture([])
  }

  function handleUndo() {
    if (history.length === 0) return
    const restored = history[history.length - 1]
    setHistory(history.slice(0, -1))
    setFuture([input, ...future])
    setInput(restored)
  }

  function handleRedo() {
    if (future.length === 0) return
    const restored = future[0]
    setHistory([...history, input])
    setFuture(future.slice(1))
    setInput(restored)
  }

  function handleFormat() { runFormat(input, indent) }
  function handleMinify() { runMinify(input) }
  function handleValidate() { runValidate(input) }

  function handleSortKeys() {
    try {
      const parsed = JSON.parse(input)
      const sorted = sortKeys(parsed)
      const indVal = indent === 't' ? '\t' : indent === '0' ? 0 : parseInt(indent)
      const result = formatJSON(JSON.stringify(sorted), indVal)
      pushHistory(input)
      setInput(result)
    } catch (e: any) {
      setOutput(`Error: ${e.message}`)
      setOutputStatus('error')
      setOutputLabel('Error')
    }
  }

  function handleRepair() {
    try {
      const repaired = repairJSON(input)
      pushHistory(input)
      setInput(repaired)
      runFormat(repaired, indent)
    } catch (e: any) {
      setOutput('Could not repair: ' + e.message)
      setOutputStatus('error')
    }
  }

  function handleEscape() {
    try {
      const result = escapeJSON(input)
      setOutput(result)
      setOutputStatus('formatted')
      setOutputLabel('Escaped')
    } catch (e: any) {
      setOutput(`Error: ${e.message}`)
      setOutputStatus('error')
      setOutputLabel('Error')
    }
  }

  function handleUnescape() {
    try {
      const result = unescapeJSON(input)
      setOutput(result)
      setOutputStatus('formatted')
      setOutputLabel('Unescaped')
    } catch (e: any) {
      setOutput(`Error: ${e.message}`)
      setOutputStatus('error')
      setOutputLabel('Error')
    }
  }

  function handleClear() {
    pushHistory(input)
    setInput('')
    setOutput('')
    setOutputLabel('Ready')
    setOutputStatus('formatted')
  }

  function handleUpload(content: string) { pushHistory(input); setInput(content) }
  function handleSample() { pushHistory(input); setInput(SAMPLE_JSON) }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
    } catch {}
  }

  function handleDownload() {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'output.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const editorGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <EditorPanel
        value={input}
        onChange={setInput}
        isValid={validation.valid}
        errorMessage={validation.error}
        byteSize={bytes}
      />
      <OutputPanel
        value={output}
        label={outputLabel}
        byteSize={getByteSize(output)}
        status={outputStatus}
      />
    </div>
  )

  return (
    <div className="space-y-3">

      {/* Hero */}
      <div className="text-center pt-6 pb-3">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          JSON Formatter and JSON Validator
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          JSON Formatter, Beautifier and Validator - format JSON data, validate syntax,
          convert JSON to XML, CSV and YAML. All processing runs in your browser.
        </p>
      </div>

      {/* Icon toolbar */}
      <IconToolbar
        onFormat={handleFormat}
        onMinify={handleMinify}
        onValidate={handleValidate}
        onSortKeys={handleSortKeys}
        onRepair={handleRepair}
        onEscape={handleEscape}
        onUnescape={handleUnescape}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={history.length > 0}
        canRedo={future.length > 0}
        onClear={handleClear}
        onUpload={handleUpload}
        onSample={handleSample}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onFullscreen={() => setFullscreen(true)}
        indent={indent}
        onIndentChange={setIndent}
      />

      {/* Editor grid - normal or fullscreen */}
      {fullscreen ? (
        <div className="fixed inset-0 z-50 bg-background p-4 flex flex-col gap-3 overflow-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">JSON Editor - Fullscreen</span>
            <button
              onClick={() => setFullscreen(false)}
              className="text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
            >
              Exit fullscreen (Esc)
            </button>
          </div>
          <IconToolbar
            onFormat={handleFormat}
            onMinify={handleMinify}
            onValidate={handleValidate}
            onSortKeys={handleSortKeys}
            onRepair={handleRepair}
            onEscape={handleEscape}
            onUnescape={handleUnescape}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={history.length > 0}
            canRedo={future.length > 0}
            onClear={handleClear}
            onUpload={handleUpload}
            onSample={handleSample}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onFullscreen={() => setFullscreen(false)}
            indent={indent}
            onIndentChange={setIndent}
          />
          {editorGrid}
        </div>
      ) : (
        editorGrid
      )}

      {/* Stats */}
      <StatsBar keys={keys} depth={depth} bytes={bytes} lines={lines} chars={chars} isValid={validation.valid} />

      {/* Convert */}
      <ConvertSection input={input} />

      {/* SEO content */}
      <ContentSection />
      <FaqSection />

    </div>
  )
}
