'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FAQ_ITEMS } from '@/lib/faq-data'

export function FaqSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 id="faq-heading" className="text-base font-medium">
            JSON Formatter and JSON Validator - Frequently Asked Questions
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={[FAQ_ITEMS[0].question]}>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>
                <h3 className="text-sm font-medium">{item.question}</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
