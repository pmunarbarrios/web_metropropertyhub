import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { locationBySlug, statenIslandNeighborhoods } from "@/data/locations";
import { coreServices } from "@/data/services";
import { useI18n } from "@/i18n";
import { BUSINESS } from "@/lib/contact";
import { breadcrumbLd, canonical, ldScript, localBusinessLd, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = locationBySlug(params.slug);
    if (!location) throw notFound();
    return { slug: location.slug };
  },
  head: ({ params }) => {
    const location = locationBySlug(params.slug);
    if (!location) {
      return { meta: [{ title: "Area not found" }, { name: "robots", content: "noindex" }] };
    }
    const path = `/locations/${location.slug}`;
    const { title, meta } = location.copy.en;
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      ...(location.parent
        ? [{ name: "Staten Island", path: "/locations/staten-island" }]
        : []),
      { name: location.name, path },
    ];
    return {
      meta: pageMeta({ title, description: meta, path }),
      links: canonical(path),
      scripts: [ldScript(localBusinessLd([location.name])), ldScript(breadcrumbLd(crumbs))],
    };
  },
  component: LocationDetail,
});

function LocationDetail() {
  const { slug } = Route.useLoaderData();
  const { lang, t } = useI18n();
  const location = locationBySlug(slug);
  if (!location) return null;
  const copy = location.copy[lang];
  const neighborhoods = location.slug === "staten-island" ? statenIslandNeighborhoods : [];

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="container-page py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-foreground/60">
            <Link to="/locations" className="hover:text-accent">
              {t("nav.locations")}
            </Link>
            {location.parent ? (
              <>
                <span aria-hidden="true"> / </span>
                <Link
                  to="/locations/$slug"
                  params={{ slug: location.parent }}
                  className="hover:text-accent"
                >
                  Staten Island
                </Link>
              </>
            ) : null}
            <span aria-hidden="true"> / </span>
            <span>{location.name}</span>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3.5 py-1.5 text-xs font-semibold text-ink-foreground/80">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {location.coverage === "primary" ? t("areas.primary") : t("areas.onRequest")}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
            {copy.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="quote" size="lg">
              <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={BUSINESS.phoneHref}>{t("cta.callNow")}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page section-y">
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{copy.body}</p>

          {neighborhoods.length > 0 ? (
            <div className="mt-12">
              <SectionHeading align="left" title={t("areas.siTitle")} />
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to="/locations/$slug"
                      params={{ slug: n.slug }}
                      className="card-lift flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
                    >
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12">
            <SectionHeading align="left" title={t("services.title")} />
            <div className="mt-8">
              <ServiceGrid items={coreServices.filter((s) => s.featured)} />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
