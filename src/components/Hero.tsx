import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Hammer, MapPin, Home, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-painting.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS } from "@/lib/contact";

export function Hero() {
  const { t } = useI18n();

  const support = [
    { icon: Hammer, label: t("hero.s1") },
    { icon: BadgeCheck, label: t("hero.s2") },
    { icon: Home, label: t("hero.s3") },
    { icon: Building2, label: t("hero.s4") },
  ];

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/5 px-3.5 py-1.5 text-xs font-semibold text-ink-foreground/80">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {t("hero.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl xl:text-6xl">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/75">
            {t("hero.sub")}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-ink-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {t("hero.local")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="quote" size="xl">
              <Link
                to="/request-a-quote"
                onClick={() => trackEvent("quote_button_clicked", { location: "hero" })}
              >
                {t("cta.quote")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="onDark" size="xl">
              <a
                href={BUSINESS.phoneHref}
                onClick={() => trackEvent("phone_clicked", { location: "hero" })}
              >
                {t("cta.callNow")}
              </a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {support.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm text-ink-foreground/75">
                <item.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-ink-foreground/10 shadow-[var(--shadow-lift)]">
            <img
              src={heroImage}
              alt={t("hero.imageAlt")}
              width={1600}
              height={1104}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-[var(--shadow-lift)] sm:block">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t("areas.primary")}
            </p>
            <p className="mt-1 font-display text-lg font-bold">Staten Island, NY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
