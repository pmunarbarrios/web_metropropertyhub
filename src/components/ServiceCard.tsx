import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Briefcase,
  Brush,
  Building2,
  Cpu,
  DoorOpen,
  Droplets,
  Hammer,
  Home,
  KeyRound,
  Layers,
  PaintBucket,
  PaintRoller,
  Sofa,
  Sparkles,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/data/services";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";

const icons: Record<string, LucideIcon> = {
  Boxes,
  Brush,
  Building2,
  DoorOpen,
  Droplets,
  Hammer,
  KeyRound,
  PaintBucket,
  Sparkles,
  Briefcase,
  Home,
  Layers,
  PaintRoller,
  Wrench,
  Zap,
  Cpu,
  Sofa,
  Truck,
  AlertTriangle,
};

export function ServiceCard({ service }: { service: Service }) {
  const { lang, t } = useI18n();
  const copy = service.copy[lang];
  const Icon = icons[service.icon] ?? Building2;

  return (
    <article className="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-card-foreground">{copy.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{copy.short}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="inline-flex items-center gap-1.5 text-primary hover:text-accent"
        >
          {t("cta.learnMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          to="/request-a-quote"
          search={{ service: service.slug }}
          onClick={() => trackEvent("quote_button_clicked", { location: "service_card" })}
          className="text-muted-foreground hover:text-foreground"
        >
          {t("cta.quote")}
        </Link>
      </div>
    </article>
  );
}

export function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
