import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/faq";
import { useI18n } from "@/i18n";

export function FAQSection({ limit }: { limit?: number }) {
  const { lang, t } = useI18n();
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section id="faq" className="bg-background">
      <div className="container-page section-y">
        <SectionHeading eyebrow="FAQ" title={t("faq.title")} subtitle={t("faq.sub")} />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={item.en.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item[lang].q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item[lang].a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
