import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/metrocare-lockup.png.asset.json";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { boroughLocations, statenIslandNeighborhoods } from "@/data/locations";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS } from "@/lib/contact";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();
  const footerServices = services.filter((s) => s.featured).slice(0, 6);

  return (
    <footer className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img
              src={logoAsset.url}
              alt={`${t("brand")} logo`}
              className="h-11 w-auto"
              width={317}
              height={110}
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.blurb")}
            </p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          <nav aria-label={t("footer.services")}>
            <h2 className="text-sm font-bold uppercase tracking-wider">{t("footer.services")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="hover:text-foreground"
                  >
                    {service.copy[lang].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="font-semibold hover:text-foreground">
                  {t("cta.viewAll")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t("footer.areas")}>
            <h2 className="text-sm font-bold uppercase tracking-wider">{t("footer.areas")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[...boroughLocations, ...statenIslandNeighborhoods.slice(0, 4)].map((location) => (
                <li key={location.slug}>
                  <Link
                    to="/locations/$slug"
                    params={{ slug: location.slug }}
                    className="hover:text-foreground"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/locations" className="font-semibold hover:text-foreground">
                  {t("footer.areas")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider">{t("footer.company")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground">
                  {t("nav.about")}
                </Link>
              </li>
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: solution.slug }}
                    className="hover:text-foreground"
                  >
                    {solution.copy[lang].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/reviews" className="hover:text-foreground">
                  {t("nav.reviews")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-foreground">
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link to="/request-a-quote" className="font-semibold hover:text-foreground">
                  {t("cta.quote")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-foreground">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-foreground">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:grid-cols-3">
          <a
            href={BUSINESS.phoneHref}
            onClick={() => trackEvent("phone_clicked", { location: "footer" })}
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.address}
          </span>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          © {year} {t("brand")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
