import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold sm:text-4xl",
          onDark ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            onDark ? "text-ink-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow ?? t("tagline")}</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          {subtitle ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-foreground/75">{subtitle}</p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
