import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  activeLocations,
  boroughLocations,
  locationNames,
  statenIslandNeighborhoods,
  type Location,
} from "@/data/locations";
import { useI18n } from "@/i18n";
import { breadcrumbLd, canonical, ldScript, localBusinessLd, pageMeta } from "@/lib/site";

const TITLE = "Service Areas in NYC | Staten Island & the Five Boroughs";
const DESCRIPTION =
  "Where Metro Pro Hub works: Staten Island as our primary area, plus Brooklyn, Queens, Manhattan and the Bronx on request for small property jobs.";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/locations" }),
    links: canonical("/locations"),
    scripts: [
      ldScript(localBusinessLd(locationNames)),
      ldScript(
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]),
      ),
    ],
  }),
  component: LocationsPage,
});

function LocationCard({ location }: { location: Location }) {
  const { lang, t } = useI18n();
  return (
    <article className="card-lift rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {location.coverage === "primary" ? t("areas.primary") : t("areas.onRequest")}
      </span>
      <h3 className="mt-3 text-xl font-bold">{location.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {location.copy[lang].intro}
      </p>
      <Link
        to="/locations/$slug"
        params={{ slug: location.slug }}
        className="mt-5 inline-block text-sm font-semibold text-primary hover:text-accent"
      >
        {t("areas.viewArea")}
      </Link>
    </article>
  );
}

function LocationsPage() {
  const { t } = useI18n();
  const boroughs = boroughLocations;
  const metro = activeLocations.filter((l) => l.type === "metro");

  return (
    <>
      <PageHero eyebrow={t("areas.primary")} title={t("areas.title")} subtitle={t("areas.sub")}>
        <Button asChild variant="quote" size="lg">
          <Link to="/request-a-quote">{t("cta.quoteUpper")}</Link>
        </Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading align="left" title={t("areas.boroughs")} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...metro, ...boroughs].map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{t("areas.note")}</p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-y">
          <SectionHeading
            align="left"
            eyebrow={t("areas.primary")}
            title={t("areas.siTitle")}
            subtitle={t("areas.siSub")}
          />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {statenIslandNeighborhoods.map((n) => (
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
      </section>

      <CTASection />
    </>
  );
}
