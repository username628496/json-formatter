import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToolLayout } from '@/components/tool/ToolLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
  description:
    'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. Save and share JSON. All processing runs in your browser.',
  alternates: {
    canonical: 'https://jsonformatter.codes',
  },
  openGraph: {
    title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
    description:
      'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. Save and share JSON. All processing runs in your browser.',
    url: 'https://jsonformatter.codes',
    siteName: 'JSON Formatter Online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
    description:
      'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter takes raw, compressed JSON text and restructures it with consistent indentation and line breaks — making each key-value pair readable on its own line and each nested level visually distinct.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between format and minify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Format adds indentation and line breaks for human readability. Minify removes all whitespace to reduce file size by 15-40% — the standard for JSON served in production APIs where every byte affects load time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool send my JSON to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All formatting, validation, minification and conversion runs locally in your browser using JavaScript. Your JSON data never reaches jsonformatter.codes servers at any point.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which indent size should I use for JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2 spaces for JavaScript and Node.js. 4 spaces for Python (PEP 8) and Java (Google Style Guide). Tab for Go and C projects. Compact (0) produces minified output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my JSON show an error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 5 most common JSON errors are: single quotes instead of double quotes, a trailing comma after the last element, an unquoted object key, an unclosed bracket or brace, and a JavaScript comment inside the structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What formats can I convert JSON to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Convert section exports JSON as XML, CSV, YAML, and TypeScript interfaces. XML targets SOAP API integrations. CSV produces spreadsheet output for Excel and Google Sheets. YAML targets Docker Compose and Kubernetes.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <ToolLayout />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
