import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact - JSON Formatter Online',
  description: 'Send feedback, bug reports, or feature requests to the JSON Formatter Online team.',
  alternates: { canonical: 'https://jsonformatter.codes/contact' },
  openGraph: {
    title: 'Contact - JSON Formatter Online',
    description: 'Send feedback, bug reports, or feature requests.',
    url: 'https://jsonformatter.codes/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16">

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Contact</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Bug report, feature request, or just want to say hi - fill in the form below
          and I&apos;ll get back to you.
        </p>

        <div className="space-y-6">

          {/* Contact form */}
          <ContactForm />


        </div>
      </main>
      <Footer />
    </>
  )
}
