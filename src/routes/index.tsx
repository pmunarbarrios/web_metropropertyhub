import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Hammer,
  Home,
  MapPin,
  Send,
  Sparkles,
  PaintRoller,
  Wrench,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { boroughLocations, locationNames, statenIslandNeighborhoods } from "@/data/locations";
import { services, type Service } from "@/data/services";
import { solutions } from "@/data/solutions";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS } from "@/lib/contact";
import { canonical, ldScript, localBusinessLd, pageMeta } from "@/lib/site";
import drywallImage from "@/assets/drywall-repair.jpg";
import handymanImage from "@/assets/handyman-repair.jpg";
import cleaningImage from "@/assets/apartment-cleaning.jpg";

const TITLE = "Small Property Jobs Across NYC | Painting, Drywall, Handyman, Cleaning";
const DESCRIPTION =
  "Painting, drywall, handyman repairs, apartment cleaning, deep cleaning and property maintenance for homes, apartments and small properties across NYC. Staten Island priority area.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
    links: canonical("/"),
    scripts: [ldScript(localBusinessLd(locationNames))],
  }),
  component: Index,
});

const pick = (slugs: string[]): Service[] =>
  slugs.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as Service[];

function Index() {
  const { lang, t } = useI18n();

  const top = pick([
    "apartment-painting",
    "touch-up-painting",
    "property-maintenance",
    "apartment-cleaning",
    "deep-cleaning",
    "post-renovation-cleanup",
  ]);
  const apartment = pick([
    "apartment-cleaning",
    "move-in-cleaning",
    "move-out-cleaning",
    "rental-turnover",
  ]);
  const painting = pick(["apartment-painting", "room-painting", "touch-up-painting"]);
  const handyman = pick(["property-maintenance", "furniture-removal", "rental-turnover"]);
  const cleaning = pick(["deep-cleaning", "apartment-cleaning", "post-renovation-cleanup"]);

  const smallJobs = [
    { icon: Hammer, t: t("hp.small.1.t"), d: t("hp.small.1.d") },
    { icon: BadgeCheck, t: t("hp.small.2.t"), d: t("hp.small.2.d") },
    { icon: CalendarClock, t: t("hp.small.3.t"), d: t("hp.small.3.d") },
    { icon: Home, t: t("hp.small.4.t"), d: t("hp.small.4.d") },
  ];

  const steps = [
    { n: "01", icon: Send, t: t("how.1.t"), d: t("how.1.d") },
    { n: "02", icon: ClipboardList, t: t("how.2.t"), d: t("how.2.d") },
    { n: "03", icon: CheckCircle2, t: t("how.3.t"), d: t("how.3.d") },
  ];

  return (
    <>
      <Hero />

      <section id="small-jobs" className="border-y border-border bg-surface">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow={t("tagline")}
            title={t("hp.small.title")}
            subtitle={t("hp.small.sub")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {smallJobs.map((item) => (
              <div
                key={item.t}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <item.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="quote" size="lg">
              <Link
                to="/request-a-quote"
                onClick={() => trackEvent("quote_button_clicked", { location: "small_jobs" })}
              >
                {t("cta.quote")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={BUSINESS.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("phone_clicked", { location: "small_jobs" })}
              >
                {t("cta.callNow")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow={t("services.whatWeDo")}
            title={t("hp.top.title")}
            subtitle={t("hp.top.sub")}
          />
          <div className="mt-12">
            <ServiceGrid items={top} />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">{t("cta.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceSection
        id="apartment-services"
        icon={Home}
        title={t("hp.apt.title")}
        subtitle={t("hp.apt.sub")}
        items={apartment}
        tone="surface"
      />

      <MediaSection
        id="painting-drywall"
        icon={PaintRoller}
        title={t("hp.paint.title")}
        subtitle={t("hp.paint.sub")}
        image={drywallImage}
        alt={t("hp.paint.alt")}
        items={painting}
      />

      <MediaSection
        id="handyman"
        icon={Wrench}
        title={t("hp.handy.title")}
        subtitle={t("hp.handy.sub")}
        image={handymanImage}
        alt={t("hp.handy.alt")}
        items={handyman}
        reverse
        tone="surface"
      />

      <MediaSection
        id="cleaning"
        icon={Sparkles}
        title={t("hp.clean.title")}
        subtitle={t("hp.clean.sub")}
        image={cleaningImage}
        alt={t("hp.clean.alt")}
        items={cleaning}
      />

      <section id="solutions" className="bg-surface">
        <div className="container-page section-y">
          <SectionHeading title={t("home.solutionsTitle")} subtitle={t("home.solutionsSub")} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                className="card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-lg font-semibold">{solution.copy[lang].name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {solution.copy[lang].short}
                </p>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: solution.slug }}
                  className="mt-6 text-sm font-semibold text-primary hover:text-accent"
                >
                  {t("cta.viewSolutions")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="staten-island" className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow={t("areas.primary")}
            title={t("hp.si.title")}
            subtitle={t("hp.si.sub")}
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {statenIslandNeighborhoods.map((area) => (
              <li key={area.slug}>
                <Link
                  to="/locations/$slug"
                  params={{ slug: area.slug }}
                  className="card-lift flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted-foreground">{t("hp.si.note")}</p>
        </div>
      </section>

      <section id="boroughs" className="bg-ink text-ink-foreground">
        <div className="container-page section-y">
          <SectionHeading onDark title={t("hp.boroughs.title")} subtitle={t("hp.boroughs.sub")} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {boroughLocations.map((area) => (
              <li key={area.slug}>
                <Link
                  to="/locations/$slug"
                  params={{ slug: area.slug }}
                  className="flex items-center gap-2 rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3 text-sm font-semibold transition-colors hover:border-accent/50"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild variant="onDark" size="lg">
              <Link to="/locations">{t("areas.viewArea")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-y">
          <SectionHeading title={t("how.title")} subtitle={t("how.sub")} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
              >
                <span className="font-display text-3xl font-bold text-accent">{step.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection limit={6} />
      <CTASection />
    </>
  );
}

function ServiceSection({
  id,
  title,
  subtitle,
  items,
  icon: Icon,
  tone = "background",
}: {
  id: string;
  title: string;
  subtitle: string;
  items: Service[];
  icon: typeof Home;
  tone?: "background" | "surface";
}) {
  const { t } = useI18n();
  return (
    <section id={id} className={tone === "surface" ? "bg-surface" : "bg-background"}>
      <div className="container-page section-y">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="inline-flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
          </div>
          <Button
            asChild
            variant="quote"
            onClick={() => trackEvent("quote_button_clicked", { location: id })}
          >
            <Link to="/request-a-quote">{t("cta.quote")}</Link>
          </Button>
        </div>
        <div className="mt-8">
          <ServiceGrid items={items} />
        </div>
      </div>
    </section>
  );
}

function MediaSection({
  id,
  title,
  subtitle,
  items,
  image,
  alt,
  icon: Icon,
  reverse = false,
  tone = "background",
}: {
  id: string;
  title: string;
  subtitle: string;
  items: Service[];
  image: string;
  alt: string;
  icon: typeof Home;
  reverse?: boolean;
  tone?: "background" | "surface";
}) {
  const { lang, t } = useI18n();
  return (
    <section id={id} className={tone === "surface" ? "bg-surface" : "bg-background"}>
      <div className="container-page section-y grid items-center gap-12 lg:grid-cols-2">
        <img
          src={image}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          className={`rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)] ${
            reverse ? "lg:order-2" : ""
          }`}
        />
        <div>
          <h2 className="inline-flex items-center gap-3 text-2xl font-bold sm:text-3xl">
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            {title}
          </h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
          <ul className="mt-7 space-y-3">
            {items.map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="card-lift flex flex-col rounded-xl border border-border bg-card px-5 py-4"
                >
                  <span className="text-sm font-semibold">{service.copy[lang].name}</span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {service.copy[lang].short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant="quote"
            className="mt-7"
            onClick={() => trackEvent("quote_button_clicked", { location: id })}
          >
            <Link to="/request-a-quote">{t("cta.quote")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
