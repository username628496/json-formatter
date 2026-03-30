import { Card, CardContent } from '@/components/ui/card'
import { CONTENT_SECTIONS } from '@/lib/content-data'

function ContentBlock({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-base font-medium mb-3">
        {heading}
      </h2>
      {children}
    </section>
  )
}

export function ContentSection() {
  return (
    <Card>
      <CardContent className="py-4 space-y-8">
        {CONTENT_SECTIONS.map((section) => (
          <ContentBlock key={section.id} id={section.id} heading={section.heading}>
            {section.content}
          </ContentBlock>
        ))}
      </CardContent>
    </Card>
  )
}
