export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What Is a JSON Formatter?',
    answer:
      'A JSON formatter takes raw, compressed JSON text and restructures it with consistent indentation and line breaks - making each key-value pair readable on its own line and each nested level visually distinct. Developers use it when debugging API responses from services such as GitHub REST API, Stripe, and Firebase.',
  },
  {
    question: 'What Is the Difference Between Format and Minify?',
    answer:
      'Format adds indentation and line breaks so humans can read the structure clearly. Minify removes all whitespace to reduce file size by 15-40% - the standard for JSON served in production APIs where every byte affects load time.',
  },
  {
    question: 'Which Indent Size Should You Use for JSON?',
    answer:
      '2 spaces is the most common choice for JavaScript and Node.js projects. 4 spaces follows the standard for Python (PEP 8) and Java (Google Style Guide). Tab matches the default for Go and C projects. Compact (0) produces the same output as minification.',
  },
  {
    question: 'Does This Tool Send My JSON to a Server?',
    answer:
      'No. All formatting, validation, minification and conversion runs locally in your browser using JavaScript. Your JSON data never reaches jsonformatter.codes servers at any point. You can disconnect from the internet after the page loads and the tool continues to work.',
  },
  {
    question: 'Why Does My JSON Show an Error?',
    answer:
      'The 5 most common JSON errors are: single quotes instead of double quotes around keys or string values, a trailing comma after the last element, an unquoted object key, an unclosed bracket or brace, and a JavaScript comment inside the structure. Click Repair JSON to fix all 5 automatically.',
  },
  {
    question: 'What Formats Can You Convert JSON To?',
    answer:
      'The Convert section exports JSON as XML, CSV, YAML, and TypeScript interfaces. XML targets SOAP API integrations and enterprise systems. CSV produces spreadsheet output for Excel and Google Sheets. YAML targets Docker Compose, Kubernetes, and CI/CD configuration files.',
  },
]
