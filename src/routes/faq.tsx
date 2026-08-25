import { createFileRoute } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { PageHero } from "@/components/SectionHeading";
import { faqs } from "@/data/faq";
import { useI18n } from "@/i18n";
import { canonical, faqLd, ldScript, pageMeta } from "@/lib/site";

const TITLE = "FAQ | Cleaning & Property Services in Staten Island";
const DESCRIPTION =
  "Answers about service areas, commercial and residential cleaning, painting, plumbing, electrical, smart home installation and quotes.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/faq" }),
    links: canonical("/faq"),
    scripts: [ldScript(faqLd(faqs.map((item) => item.en)))],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("faq.title")} subtitle={t("faq.sub")} />
      <FAQSection />
      <CTASection />
    </>
  );
}
