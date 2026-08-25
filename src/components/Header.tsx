import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
const logoUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F031a10a79dca4b47bcf06fd8c14a6703%2Febc2d4826deb4712bf9d7620f60e4e21?format=webp&width=800&height=1200";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n, type TranslationKey } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS } from "@/lib/contact";

const navItems: { to: string; key: TranslationKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/solutions", key: "nav.solutions" },
  { to: "/locations", key: "nav.locations" },
  { to: "/reviews", key: "nav.reviews" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label={t("brand")}>
          <img
            src={logoUrl}
            alt={`${t("brand")} logo`}
            className="h-10 w-auto sm:h-11"
            width={317}
            height={110}
          />
          <span className="hidden text-[11px] uppercase leading-tight tracking-[0.14em] text-muted-foreground xl:block">
            Staten Island, NY
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground after:w-full" }}
              className="relative text-sm font-medium text-muted-foreground transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:text-foreground hover:after:w-full"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={BUSINESS.phoneHref}
            onClick={() => trackEvent("phone_clicked", { location: "header" })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <Button asChild variant="quote">
            <Link
              to="/request-a-quote"
              onClick={() => trackEvent("quote_button_clicked", { location: "header" })}
            >
              {t("cta.quoteUpper")}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Button asChild variant="quote" size="sm">
            <Link
              to="/request-a-quote"
              onClick={() => trackEvent("quote_button_clicked", { location: "header_mobile" })}
            >
              {t("cta.quote")}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t("nav.menu")}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <Button asChild variant="quote" size="lg" className="w-full">
                  <Link to="/request-a-quote" onClick={() => setOpen(false)}>
                    {t("cta.quoteUpper")}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={BUSINESS.phoneHref}
                    onClick={() => trackEvent("phone_clicked", { location: "mobile_menu" })}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {BUSINESS.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
