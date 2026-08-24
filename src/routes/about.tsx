import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { useI18n } from "@/i18n";
import { canonical, pageMeta } from "@/lib/site";

const TITLE = "About Us | Property Services Company in Staten Island, NY";
const DESCRIPTION =
  "Learn about our cleaning, maintenance, painting, plumbing, electrical and smart home services for commercial and residential properties in Staten Island.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/about" }),
    links: canonical("/about"),
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t("about.title")} subtitle={t("about.sub")}>
        <Button asChild variant="quote" size="lg">
          <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
        </Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-y">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("services.title")}</h2>
          <div className="mt-8">
            <ServiceGrid items={services.filter((s) => s.featured)} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
