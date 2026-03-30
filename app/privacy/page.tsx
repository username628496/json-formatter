import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - JSON Formatter Online',
  description: 'Privacy policy for JSON Formatter Online. We collect no personal data. All JSON processing runs locally in your browser.',
  alternates: { canonical: 'https://jsonformatter.codes/privacy' },
  openGraph: {
    title: 'Privacy Policy - JSON Formatter Online',
    description: 'We collect no personal data. All processing runs in your browser.',
    url: 'https://jsonformatter.codes/privacy',
    type: 'website',
  },
}

const LAST_UPDATED = 'March 30, 2026'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16">

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-medium text-base mb-2">Summary</h2>
            <p className="text-muted-foreground">
              JSON Formatter Online does not collect, store, or transmit any personal data
              or the JSON content you process. All formatting, validation, and conversion
              runs entirely within your browser. Nothing is sent to our servers.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Data we do not collect</h2>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>The JSON data you paste, type, or upload</li>
              <li>Your name, email address, or any account information</li>
              <li>IP addresses tied to your usage</li>
              <li>Browsing history or cross-site tracking data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">How the tool works</h2>
            <p className="text-muted-foreground">
              When you use JSON Formatter Online, your input is processed by JavaScript
              running in your browser tab. No data is uploaded to any server at any point.
              The tool functions offline once the page is cached by your browser.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Cookies</h2>
            <p className="text-muted-foreground">
              We do not set advertising or tracking cookies. Your dark/light mode preference
              is stored in your browser&apos;s local storage and never transmitted anywhere.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Third-party services</h2>
            <p className="text-muted-foreground">
              We use standard web hosting infrastructure to serve the application files.
              Hosting providers may log standard server access logs (IP address, timestamp,
              page requested) as required for network operations. These logs are not used
              for advertising or sold to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Analytics</h2>
            <p className="text-muted-foreground">
              We may use privacy-respecting, cookie-free analytics (such as page view
              counts) to understand which features are used. These measurements do not
              include any personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Children&apos;s privacy</h2>
            <p className="text-muted-foreground">
              JSON Formatter Online is a developer tool not directed at children under 13.
              We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Changes to this policy</h2>
            <p className="text-muted-foreground">
              If we make material changes to this policy, we will update the &quot;Last
              updated&quot; date at the top of this page. Continued use of the tool after
              changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-base mb-2">Contact</h2>
            <p className="text-muted-foreground">
              Questions about this policy?{' '}
              <a href="/contact" className="underline underline-offset-2 hover:no-underline text-foreground">
                Contact us
              </a>
              .
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
