import yaml from 'js-yaml'

function xmlEscape(val: string): string {
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function toXML(obj: any, rootName = 'root', indent = 0): string {
  const pad = '  '.repeat(indent)

  if (Array.isArray(obj)) {
    return obj
      .map((item) => `${pad}<item>\n${toXML(item, 'item', indent + 1)}${pad}</item>`)
      .join('\n')
  }

  if (obj && typeof obj === 'object') {
    const inner = Object.keys(obj)
      .map((key) => {
        const val = obj[key]
        if (typeof val === 'object' && val !== null) {
          return `${pad}  <${key}>\n${toXML(val, key, indent + 1)}${pad}  </${key}>`
        }
        return `${pad}  <${key}>${xmlEscape(String(val ?? ''))}</${key}>`
      })
      .join('\n')
    return indent === 0
      ? `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${inner}\n</${rootName}>`
      : `${inner}\n`
  }

  return `${pad}${xmlEscape(String(obj ?? ''))}`
}

function csvEscape(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

export function toCSV(obj: any): string {
  const rows = Array.isArray(obj) ? obj : [obj]
  if (!rows.length) return ''
  const keys = Object.keys(rows[0])
  const header = keys.map(csvEscape).join(',')
  const body = rows
    .map((row) =>
      keys
        .map((k) => csvEscape(String(row[k] ?? '')))
        .join(',')
    )
    .join('\n')
  return `${header}\n${body}`
}

export function toYAML(obj: any): string {
  return yaml.dump(obj, { indent: 2 })
}

export function toTypeScript(obj: any, name = 'Root'): string {
  const interfaces: string[] = []
  const seen = new Set<string>()

  function safeKey(k: string): string {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`
  }

  function getType(val: any, key: string): string {
    if (val === null) return 'null'
    if (Array.isArray(val)) {
      if (val.length === 0) return 'unknown[]'
      const itemType = getType(val[0], key)
      return itemType === 'null' ? 'unknown[]' : `${itemType}[]`
    }
    if (typeof val === 'object') {
      const ifName = key.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^[0-9]/, '_$&')
      const capitalized = ifName.charAt(0).toUpperCase() + ifName.slice(1)
      buildInterface(val, capitalized)
      return capitalized
    }
    return typeof val
  }

  function buildInterface(o: any, ifName: string) {
    if (seen.has(ifName)) return
    seen.add(ifName)
    const lines = [`export interface ${ifName} {`]
    Object.keys(o).forEach((k) => {
      lines.push(`  ${safeKey(k)}: ${getType(o[k], k)};`)
    })
    lines.push('}')
    interfaces.push(lines.join('\n'))
  }

  if (!obj || typeof obj !== 'object') return ''
  buildInterface(obj, name)
  return interfaces.reverse().join('\n\n')
}
