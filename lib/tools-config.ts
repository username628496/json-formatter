export interface ToolConfig {
    slug: string
    label: string
    description: string
    focusMode: 'format' | 'validate' | 'minify' | 'convert'
  }
  
  export const TOOLS_CONFIG: ToolConfig[] = [
    {
      slug: 'json-formatter',
      label: 'JSON Formatter',
      description: 'Format and beautify JSON',
      focusMode: 'format',
    },
    {
      slug: 'json-validator',
      label: 'JSON Validator',
      description: 'Validate and fix JSON errors',
      focusMode: 'validate',
    },
    {
      slug: 'json-minifier',
      label: 'JSON Minifier',
      description: 'Minify and compress JSON',
      focusMode: 'minify',
    },
    {
      slug: 'json-to-xml',
      label: 'JSON to XML',
      description: 'Convert JSON to XML format',
      focusMode: 'convert',
    },
    {
      slug: 'json-to-csv',
      label: 'JSON to CSV',
      description: 'Export JSON as CSV spreadsheet',
      focusMode: 'convert',
    },
    {
      slug: 'json-to-yaml',
      label: 'JSON to YAML',
      description: 'Convert JSON to YAML config',
      focusMode: 'convert',
    },
    {
      slug: 'json-to-typescript',
      label: 'JSON to TypeScript',
      description: 'Generate TypeScript interfaces',
      focusMode: 'convert',
    },
  ]