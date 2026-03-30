import Link from 'next/link'

export interface ContentSection {
  id: string
  heading: string
  content: React.ReactNode
}

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: 'what-is-heading',
    heading: 'What Is a JSON Formatter?',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          A{' '}
          <Link href="/" className="underline hover:text-foreground transition-colors">
            JSON formatter
          </Link>{' '}
          is a browser-based tool that restructures raw,
          compressed JSON text into an indented, readable document -
          detecting syntax errors at the exact line and column where they
          occur. Developers use a JSON formatter when debugging API responses
          from services such as GitHub REST API, Stripe payment API, and
          Firebase database API, where unformatted JSON makes structure and
          errors invisible.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          JSON (JavaScript Object Notation) is defined in{' '}
          <a
            href="https://tools.ietf.org/html/rfc8259"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="underline hover:text-foreground transition-colors"
          >
            RFC 8259
          </a>{' '}
          as a lightweight data-interchange format built on 7 value types:
          string, number, object, array, boolean, null, and nested objects.
          A single API response from a production endpoint can contain 200+
          nested key-value pairs compressed into one unreadable line. The
          JSON formatter applies consistent indentation - 2 spaces, 4 spaces,
          or tab - to every nested level, restoring readability in under one
          second.
        </p>
      </>
    ),
  },
  {
    id: 'how-works-heading',
    heading: 'How Does a JSON Formatter Work?',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Formatting JSON applies 4 operations in sequence: parsing the raw
          text against RFC 8259 syntax rules, detecting and reporting errors
          at the specific line and column, applying the selected indentation
          level to every nested object and array, and rendering the result
          with syntax highlighting that color-codes strings, numbers,
          booleans, and keys.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The parser validates JSON structure before formatting. If the input
          contains a missing comma between key-value pairs, an unclosed
          bracket, an unquoted key, or a trailing comma after the last
          element - the formatter halts and reports the exact error location.
          Formatting applies only to valid JSON, so the output is always
          syntactically correct.
        </p>
      </>
    ),
  },
  {
    id: 'difference-heading',
    heading: 'JSON Formatter vs JSON Validator - What Is the Difference?',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          A JSON formatter restructures valid JSON for readability. A JSON
          validator checks whether JSON text conforms to RFC 8259 and reports
          syntax errors. This tool performs both operations simultaneously: the
          validator runs on every keystroke, highlighting errors in real time,
          while the formatter applies indentation only after validation passes.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The 5 most common JSON validation errors are: single quotes instead
          of double quotes around keys or string values, a trailing comma after
          the last element in an object or array, an unquoted object key, an
          unclosed bracket or brace, and a JavaScript comment inside the
          structure. The Repair JSON function corrects all 5 error types
          automatically.
        </p>
      </>
    ),
  },
  {
    id: 'indent-heading',
    heading: 'Which Indent Size Should You Use for JSON?',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        The correct indent size depends on the language standard governing
        your project. 2 spaces follows the JavaScript Standard Style used by
        Node.js, npm, React, and Vue. 4 spaces matches{' '}
        <a
          href="https://peps.python.org/pep-0008/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="underline hover:text-foreground transition-colors"
        >
          PEP 8
        </a>{' '}
        for Python and the Google Java Style Guide for Java. Tab indentation
        aligns with the default formatter settings in Go, C, and Rust. Compact
        (0) produces minified JSON with all whitespace removed.
      </p>
    ),
  },
  {
    id: 'minify-heading',
    heading: 'When to Minify JSON - and When Not To',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          JSON minification removes all whitespace and line breaks, reducing
          payload size by 15-40% for typical API responses. A 10 KB formatted
          JSON configuration file compresses to 6-8 KB after minification.
          Smaller payloads reduce bandwidth consumption and lower API response
          times in production environments.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Do not minify JSON that developers read directly. Configuration
          files, local development data, and documentation examples benefit
          from full indentation. Minified JSON committed to version control
          produces unreadable diffs - obscuring what changed between commits
          and slowing code review.
        </p>
      </>
    ),
  },
  {
    id: 'convert-heading',
    heading: 'Convert JSON to XML, CSV, YAML and TypeScript',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        JSON conversion produces 4 output formats from a single input. XML
        conversion targets SOAP API integrations and enterprise systems that
        require markup-based data exchange. CSV conversion produces
        spreadsheet-compatible output for Excel and Google Sheets data
        analysis. YAML conversion targets Docker Compose, Kubernetes
        manifests, and CI/CD pipeline configuration files. TypeScript
        interface generation produces type-safe interface definitions from any
        JSON structure - eliminating manual type writing in TypeScript and
        Angular projects.
      </p>
    ),
  },
  {
    id: 'limitations-heading',
    heading: 'What a JSON Formatter Cannot Do',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        A JSON formatter validates syntax against RFC 8259 but does not
        validate JSON Schema - it cannot check whether a value matches an
        expected type, range, or pattern defined in a schema file. It does not
        evaluate JavaScript expressions inside JSON strings. It does not parse
        JSON5, JSONC (JSON with comments), or HJSON formats - though the
        Repair JSON function removes comments before formatting. For JSON
        Schema validation, use a dedicated schema validator such as{' '}
        <a
          href="https://ajv.js.org"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="underline hover:text-foreground transition-colors"
        >
          Ajv
        </a>
        .
      </p>
    ),
  },
]
