import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
  description:
    'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. Save and share JSON. All processing runs in your browser.',
  metadataBase: new URL('https://jsonformatter.codes'),
  verification: {
    google: 'xZska4OK3PAc3_SCC7mtfmq8hct16u5qVBZnmYFPhoo',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
    description:
      'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. Save and share JSON. All processing runs in your browser.',
    url: 'https://jsonformatter.codes',
    siteName: 'JSON Formatter',
    images: [
      {
        url: 'https://jsonformatter.codes/json-formatter-logo.png',
        width: 512,
        height: 512,
        alt: 'JSON Formatter',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter and JSON Validator - Format, Beautify and Lint JSON',
    description:
      'JSON Formatter, Beautifier and JSON Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. Save and share JSON.',
    images: ['https://jsonformatter.codes/json-formatter-logo.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JSON Formatter',
  url: 'https://jsonformatter.codes',
  logo: {
    '@type': 'ImageObject',
    url: 'https://jsonformatter.codes/json-formatter-logo.png',
    width: 512,
    height: 512,
  },
  description:
    'JSON Formatter, Beautifier and Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML.',
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Formatter',
  url: 'https://jsonformatter.codes',
  description:
    'JSON Formatter, Beautifier and Validator. Format JSON data, validate syntax, convert JSON to XML, CSV and YAML. All processing runs in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  inLanguage: 'en',
  isAccessibleForFree: true,
  featureList: [
    'JSON Formatter and Beautifier',
    'JSON Validator and Linter',
    'JSON Minifier and Compressor',
    'JSON Repair Tool',
    'JSON to XML Converter',
    'JSON to CSV Converter',
    'JSON to YAML Converter',
    'JSON to TypeScript Interface Generator',
    'JSON Tree View',
    'JSON Diff and Compare',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <GoogleAnalytics gaId="G-PQTCE6XN0S" />
      </body>
    </html>
  )
}
