import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About - JSON Formatter Online',
  description: 'Learn about JSON Formatter Online — a free, privacy-first developer tool that runs entirely in your browser.',
  alternates: { canonical: 'https://jsonformatter.codes/about' },
  openGraph: {
    title: 'About - JSON Formatter Online',
    description: 'Free, privacy-first JSON tool. No signup, no server, no tracking.',
    url: 'https://jsonformatter.codes/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16">

        <h1 className="text-2xl font-semibold tracking-tight mb-2">About JSON Formatter Online</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Built for developers who want a fast, trustworthy JSON tool with no friction.
        </p>

        <div className="space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-medium text-base mb-2">What is this?</h2>
            <p className="text-muted-foreground">
              JSON Formatter Online is a free browser-based tool for formatting, validating,
              minifying, and converting JSON data. It supports indentation styles (2 spaces,
              4 spaces, tab, compact), key sorting, JSON repair, escape/unescape, and
              conversion to XML, CSV, YAML, and TypeScript interfaces.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">How it works</h2>
            <p className="text-muted-foreground">
              Everything runs locally in your browser using JavaScript. When you paste or
              upload JSON, it never leaves your device — there is no backend, no upload
              endpoint, and no network request involved in processing your data. The tool
              works offline once the page has loaded.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Why we built it</h2>
            <p className="text-muted-foreground">
              Most online JSON tools either send your data to a server, show intrusive ads,
              require an account, or load slowly. We wanted a tool that respects developer
              workflow: instant, private, and reliable. JSON Formatter Online has no ads,
              no signup, no paywalls, and no cookies beyond what the browser requires.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Standards compliance</h2>
            <p className="text-muted-foreground">
              JSON validation follows{' '}
              <a
                href="https://www.rfc-editor.org/rfc/rfc8259"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:no-underline text-foreground"
              >
                RFC 8259
              </a>
              , the current IETF standard for JSON. CSV output follows RFC 4180.
              TypeScript interface generation targets TypeScript 5.x syntax.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Contact & support</h2>
            <p className="text-muted-foreground">
              Found a bug or have a feature request?{' '}
              <a href="/contact" className="underline underline-offset-2 hover:no-underline text-foreground">
                Get in touch
              </a>.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
