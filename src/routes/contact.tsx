import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { canonical, pageMeta } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { openChat } from "@/lib/chat-bus";
import { BUSINESS } from "@/lib/contact";

const TITLE = "Contact | Cleaning & Property Services in Staten Island, NY";
const DESCRIPTION =
  "Contact our team for cleaning, maintenance, painting, plumbing, electrical and smart home services in Staten Island and the greater New York area.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
    links: canonical("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();

  const items = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: BUSINESS.phoneDisplay,
      href: BUSINESS.phoneHref,
      isWhatsApp: true,
    },
    { icon: Mail, label: t("contact.email"), value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { icon: MapPin, label: t("contact.area"), value: t("contact.areaValue") },
  ];

  return (
    <>
      <PageHero title={t("contact.title")} subtitle={t("contact.sub")} />

      <section className="bg-background">
        <div className="container-page section-y grid gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.isWhatsApp ? "_blank" : undefined}
                    rel={item.isWhatsApp ? "noopener noreferrer" : undefined}
                    onClick={() =>
                      item.isWhatsApp
                        ? trackEvent("phone_clicked", { location: "contact_page" })
                        : undefined
                    }
                    className="mt-1 block text-base font-semibold hover:text-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-base font-semibold">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-2xl font-bold">{t("quote.title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("quote.sub")}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="quote" size="lg">
                <Link
                  to="/request-a-quote"
                  onClick={() => trackEvent("quote_button_clicked", { location: "contact_page" })}
                >
                  {t("cta.quoteUpper")}
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => openChat()}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t("cta.chat")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
