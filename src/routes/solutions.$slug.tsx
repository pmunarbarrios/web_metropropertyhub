import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { locationNames } from "@/data/locations";
import { serviceBySlug } from "@/data/services";
import { solutionBySlug } from "@/data/solutions";
import { useI18n } from "@/i18n";
import { BUSINESS } from "@/lib/contact";
import { breadcrumbLd, canonical, ldScript, pageMeta, serviceLd } from "@/lib/site";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = solutionBySlug(params.slug);
    if (!solution) throw notFound();
    return { slug: solution.slug };
  },
  head: ({ params }) => {
    const solution = solutionBySlug(params.slug);
    if (!solution) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const path = `/solutions/${solution.slug}`;
    const { seoTitle, metaDescription, name } = solution.copy.en;
    return {
      meta: pageMeta({ title: seoTitle, description: metaDescription, path }),
      links: canonical(path),
      scripts: [
        ldScript(
          serviceLd({
            name: `Property services for ${name}`,
            description: metaDescription,
            path,
            areaNames: locationNames,
          }),
        ),
        ldScript(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name, path },
          ]),
        ),
      ],
    };
  },
  component: SolutionDetail,
});

function SolutionDetail() {
  const { slug } = Route.useLoaderData();
  const { lang, t } = useI18n();
  const solution = solutionBySlug(slug);
  if (!solution) return null;
  const copy = solution.copy[lang];
  const related = solution.serviceSlugs
    .map((s) => serviceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-foreground/60">
            <Link to="/solutions" className="hover:text-accent">
              {t("nav.solutions")}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{copy.name}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {copy.seoTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
            {copy.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="quote" size="lg">
              <Link to="/request-a-quote">{t("cta.pricing")}</Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer">
                {t("cta.callNow")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page section-y grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title={t("solutions.included")} />
            <ul className="mt-6 space-y-3">
              {copy.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
            <span className="eyebrow">{t("solutions.outcome")}</span>
            <p className="mt-3 text-lg font-semibold">{copy.outcome}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.short}</p>
            <Button asChild variant="quote" className="mt-6 w-full">
              <Link to="/request-a-quote">{t("cta.availability")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-y">
          <SectionHeading align="left" title={t("solutions.related")} />
          <div className="mt-8">
            <ServiceGrid items={related} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
