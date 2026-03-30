export function formatJSON(input: string, indent: number | string): string {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, indent === 0 ? 0 : indent)
  }
  
  export function minifyJSON(input: string): string {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  }
  
  export function validateJSON(input: string): {
    valid: boolean
    error?: string
  } {
    try {
      JSON.parse(input)
      return { valid: true }
    } catch (e: any) {
      return { valid: false, error: e.message }
    }
  }
  
  export function sortKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(sortKeys)
    if (obj && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = sortKeys(obj[key])
          return acc
        }, {})
    }
    return obj
  }
  
  export function countKeys(obj: any): number {
    if (!obj || typeof obj !== 'object') return 0
    const values = Array.isArray(obj) ? obj : Object.values(obj)
    const ownKeys = Array.isArray(obj) ? 0 : Object.keys(obj).length
    return ownKeys + values.reduce((sum: number, v) => sum + countKeys(v), 0)
  }
  
  export function getDepth(obj: any, depth = 0): number {
    if (!obj || typeof obj !== 'object') return depth
    const values = Array.isArray(obj) ? obj : Object.values(obj)
    if (values.length === 0) return depth + 1
    return Math.max(...values.map((v) => getDepth(v, depth + 1)))
  }
  
  export function getByteSize(str: string): number {
    return new TextEncoder().encode(str).length
  }

export function getLineCount(str: string): number {
  if (!str) return 0
  return str.split('\n').length
}

export function escapeJSON(input: string): string {
  // Wraps the entire input as an escaped JSON string value
  return JSON.stringify(input)
}

export function unescapeJSON(input: string): string {
  const parsed = JSON.parse(input)
  if (typeof parsed !== 'string') {
    throw new Error('Input is not an escaped JSON string')
  }
  return parsed
}

export function repairJSON(input: string): string {
  let str = input.trim()
  // Remove JS comments (// and /* */)
  str = str.replace(/\/\/[^\n]*/g, '')
  str = str.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove trailing commas before } or ]
  str = str.replace(/,(\s*[}\]])/g, '$1')
  // Replace single quotes with double quotes for keys and string values
  str = str.replace(/'([^']+)'(\s*:)/g, '"$1"$2')
  str = str.replace(/:\s*'([^']*)'/g, ': "$1"')
  // Add quotes to unquoted keys
  str = str.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3')
  // Remove JSONP wrapper if present (e.g. callback({...}))
  str = str.replace(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/, '').replace(/\)\s*;?\s*$/, '')
  try {
    JSON.parse(str)
    return str
  } catch {
    return str
  }
}