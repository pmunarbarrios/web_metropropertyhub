import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
import { useI18n } from "@/i18n";
import { breadcrumbLd, canonical, ldScript, pageMeta } from "@/lib/site";

const TITLE = "Solutions for Landlords, Realtors & Property Managers";
const DESCRIPTION =
  "How Metro Pro Hub supports landlords, realtors and property managers in Staten Island and NYC with turnovers, cleaning, patching and painting.";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/solutions" }),
    links: canonical("/solutions"),
    scripts: [
      ldScript(
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]),
      ),
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const { lang, t } = useI18n();

  return (
    <>
      <PageHero title={t("solutions.title")} subtitle={t("solutions.sub")}>
        <Button asChild variant="quote" size="lg">
          <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
        </Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((solution) => {
              const copy = solution.copy[lang];
              return (
                <article
                  key={solution.slug}
                  className="card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
                >
                  <h2 className="text-xl font-bold">{copy.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {copy.short}
                  </p>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: solution.slug }}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
                  >
                    {t("cta.learnMore")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
