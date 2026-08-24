import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { servicesByCategory } from "@/data/services";
import { useI18n } from "@/i18n";
import { canonical, pageMeta } from "@/lib/site";

const TITLE = "Property Services in Staten Island | Cleaning, Painting, Plumbing";
const DESCRIPTION =
  "Explore commercial cleaning, residential cleaning, floor care, painting, plumbing, electrical and smart home services in Staten Island, NY.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/services" }),
    links: canonical("/services"),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t("services.title")} subtitle={t("services.sub")}>
        <Button asChild variant="quote" size="lg">
          <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
        </Button>
      </PageHero>

      {(
        [
          ["cleaning", t("services.cleaning")],
          ["painting", t("services.painting")],
          ["turnover", t("services.turnover")],
          ["maintenance", t("services.maintenance")],
          ["commercial", t("services.commercial")],
        ] as const
      ).map(([category, label], index) => (
        <section key={category} className={index % 2 === 1 ? "bg-surface" : "bg-background"}>
          <div className="container-page section-y">
            <SectionHeading align="left" title={label} />
            <div className="mt-8">
              <ServiceGrid items={servicesByCategory(category)} />
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
