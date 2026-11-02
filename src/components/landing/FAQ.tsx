"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

export const FAQ = () => {
  const { t } = useI18n();
  const { faq } = t.sections;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-border border-t"
    >
      <div className="section-sm">
        <div className="text-center">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-heading" className="text-display mt-3 text-balance">
            {faq.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-border border-b last:border-b-0"
            >
              <AccordionTrigger className="text-foreground hover:no-underline py-5 text-left text-base font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/75 pb-5 text-sm leading-relaxed md:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
