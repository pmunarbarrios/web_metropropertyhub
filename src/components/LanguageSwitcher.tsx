import { useI18n, type Language } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  const choose = (next: Language) => {
    if (next === lang) return;
    setLang(next);
    trackEvent("language_changed", { language: next });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background p-0.5 text-xs font-semibold",
        className,
      )}
      role="group"
      aria-label={t("lang.label")}
    >
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => choose(code)}
          aria-pressed={lang === code}
          className={cn(
            "rounded-full px-3 py-1 uppercase tracking-wide transition-colors",
            lang === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
