import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MessageSquareQuote } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { BUSINESS } from "@/lib/contact";
import { breadcrumbLd, canonical, ldScript, pageMeta } from "@/lib/site";

const TITLE = "Reviews & References | Metro Pro Hub";
const DESCRIPTION =
  "Metro Pro Hub publishes verified customer reviews only. See what you can check today before booking a small property job in Staten Island or NYC.";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/reviews" }),
    links: canonical("/reviews"),
    scripts: [
      ldScript(
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]),
      ),
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t } = useI18n();
  const checks = [t("reviews.why1"), t("reviews.why2"), t("reviews.why3"), t("reviews.why4")];

  return (
    <>
      <PageHero title={t("reviews.title")} subtitle={t("reviews.sub")}>
        <Button asChild variant="quote" size="lg">
          <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
        </Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <MessageSquareQuote className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">{t("reviews.emptyTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("reviews.emptyBody")}
            </p>
            <h3 className="mt-8 text-lg font-semibold">{t("reviews.askTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("reviews.askBody")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="quote">
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={BUSINESS.phoneHref}>{t("cta.callNow")}</a>
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading align="left" title={t("reviews.whyTitle")} />
            <ul className="mt-6 space-y-4">
              {checks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="quote" size="lg" className="mt-8">
              <Link to="/request-a-quote">{t("cta.pricing")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
