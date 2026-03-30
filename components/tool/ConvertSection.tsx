'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toXML, toCSV, toYAML, toTypeScript } from '@/lib/converters'

interface ConvertFormat {
  key: string
  label: string
  description: string
  convert: (obj: any) => string
}

const FORMATS: ConvertFormat[] = [
  {
    key: 'xml',
    label: 'XML',
    description: 'Markup - SOAP',
    convert: (obj) => toXML(obj),
  },
  {
    key: 'csv',
    label: 'CSV',
    description: 'Excel - Sheets',
    convert: (obj) => toCSV(obj),
  },
  {
    key: 'yaml',
    label: 'YAML',
    description: 'Docker - K8s',
    convert: (obj) => toYAML(obj),
  },
  {
    key: 'typescript',
    label: 'TypeScript',
    description: 'Interface type',
    convert: (obj) => toTypeScript(obj),
  },
]

interface ConvertSectionProps {
  input: string
}

export function ConvertSection({ input }: ConvertSectionProps) {
  const [activeFormat, setActiveFormat] = useState<string | null>(null)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function handleConvert(format: ConvertFormat) {
    try {
      const parsed = JSON.parse(input)
      const result = format.convert(parsed)
      setOutput(result)
      setActiveFormat(format.key)
    } catch {
      setOutput('Error: Invalid JSON input')
      setActiveFormat(format.key)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  function handleDownload() {
    const ext: Record<string, string> = {
      xml: 'xml',
      csv: 'csv',
      yaml: 'yaml',
      typescript: 'ts',
    }
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `output.${ext[activeFormat ?? 'xml'] ?? 'txt'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Convert JSON to</span>
          <span className="text-xs text-muted-foreground">
            Click to convert and copy
          </span>
        </div>

        {/* Format buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {FORMATS.map((format) => {
            const active = activeFormat === format.key
            return (
              <button
                key={format.key}
                onClick={() => handleConvert(format)}
                className="rounded-lg p-3 text-left transition-colors"
                style={active ? {
                  border: '2px solid var(--color-border-info)',
                  background: 'var(--color-background-info)',
                } : {
                  border: '0.5px solid var(--color-border-tertiary)',
                  background: 'var(--color-background-secondary)',
                }}
              >
                <p
                  className="text-xs font-medium"
                  style={{ color: active ? 'var(--color-text-info)' : 'var(--color-text-primary)' }}
                >
                  {format.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: active ? 'var(--color-text-info)' : 'var(--color-text-secondary)', opacity: active ? 0.7 : 1 }}
                >
                  {format.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Output preview */}
        {activeFormat && output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {FORMATS.find((f) => f.key === activeFormat)?.label} output
              </span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-muted/50 rounded-lg p-3 text-xs font-mono leading-relaxed overflow-auto max-h-48 whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}