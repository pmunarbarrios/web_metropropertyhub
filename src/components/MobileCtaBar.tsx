import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { openChat } from "@/lib/chat-bus";
import { BUSINESS } from "@/lib/contact";

/** Sticky conversion bar shown on small screens. */
export function MobileCtaBar() {
  const { t } = useI18n();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={BUSINESS.phoneHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("phone_clicked", { location: "mobile_bar" })}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-semibold text-foreground"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t("cta.call")}
        </a>
        <Link
          to="/request-a-quote"
          onClick={() => trackEvent("quote_button_clicked", { location: "mobile_bar" })}
          className="inline-flex h-11 flex-[1.4] items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground"
        >
          {t("cta.quoteUpper")}
        </Link>
        <button
          type="button"
          aria-label={t("chat.open")}
          onClick={() => {
            trackEvent("chat_opened", { location: "mobile_bar" });
            openChat();
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
