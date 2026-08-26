import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MapPin } from "lucide-react";
import serviceImage from "@/assets/service-painting.jpg";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { boroughLocations } from "@/data/locations";
import { serviceBySlug, services } from "@/data/services";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbLd, canonical, ldScript, pageMeta, serviceLd } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const { seoTitle, metaDescription, name } = service.copy.en;
    const path = `/services/${service.slug}`;
    return {
      meta: pageMeta({ title: seoTitle, description: metaDescription, path }),
      links: canonical(path),
      scripts: [
        ldScript(
          serviceLd({ name, description: metaDescription, path, areaNames: ["New York City"] }),
        ),
        ldScript(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name, path },
          ]),
        ),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const { lang, t } = useI18n();
  const service = serviceBySlug(slug);
  if (!service) return null;
  const copy = service.copy[lang];
  const related = services.filter((s) => s.slug !== service.slug && s.featured).slice(0, 3);

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-ink-foreground/60">
              <Link to="/services" className="hover:text-accent">
                {t("nav.services")}
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{copy.name}</span>
            </nav>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{copy.seoTitle}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-foreground/75">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="quote" size="lg">
                <Link
                  to="/request-a-quote"
                  search={{ service: service.slug }}
                  onClick={() => trackEvent("quote_button_clicked", { location: "service_page" })}
                >
                  {t("cta.quoteUpper")}
                </Link>
              </Button>
              <Button asChild variant="onDark" size="lg">
                <Link to="/contact">{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
          <img
            src={serviceImage}
            alt={copy.name}
            width={1200}
            height={800}
            loading="lazy"
            className="rounded-3xl border border-ink-foreground/10 object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page section-y grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading align="left" title={copy.name} subtitle={copy.short} />
            <ul className="mt-8 space-y-3">
              {copy.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-base font-semibold">{t("areas.title")}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {boroughLocations.map((area) => (
                <li key={area.slug}>
                  <Link
                    to="/locations/$slug"
                    params={{ slug: area.slug }}
                    className="inline-flex items-center gap-2 hover:text-foreground"
                  >
                    <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="quote" className="mt-6 w-full">
              <Link to="/request-a-quote" search={{ service: service.slug }}>
                {t("cta.quote")}
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-y">
          <SectionHeading align="left" title={t("services.related")} />
          <div className="mt-8">
            <ServiceGrid items={related} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
