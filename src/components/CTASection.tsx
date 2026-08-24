import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { openChat } from "@/lib/chat-bus";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-page section-y">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{t("tagline")}</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("final.title")}</h2>
          <p className="mt-4 text-lg text-ink-foreground/75">{t("final.sub")}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="quote" size="xl">
              <Link
                to="/request-a-quote"
                onClick={() => trackEvent("quote_button_clicked", { location: "cta_section" })}
              >
                {t("cta.quoteUpper")}
              </Link>
            </Button>
            <Button
              variant="onDark"
              size="xl"
              onClick={() => {
                trackEvent("chat_opened", { location: "cta_section" });
                openChat();
              }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t("cta.chat")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
