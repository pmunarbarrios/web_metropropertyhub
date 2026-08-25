import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { useI18n } from "@/i18n";
import { abs } from "@/lib/site";

const TITLE = "Terms of Service | Metro Pro Hub";
const DESCRIPTION = "Terms that apply to the use of this website and to service requests.";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: abs("/terms-of-service") },
    ],
    links: [{ rel: "canonical", href: abs("/terms-of-service") }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang, t } = useI18n();
  const en = lang === "en";

  return (
    <>
      <PageHero title={t("footer.terms")} />
      <section className="bg-background">
        <div className="container-page section-y max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            {en
              ? "This website provides information about services and a way to request a quote. Submitting a request does not create a service agreement until scope, pricing and scheduling are confirmed by both parties."
              : "Este sitio ofrece información sobre servicios y una forma de solicitar un presupuesto. El envío de una solicitud no crea un acuerdo de servicio hasta que ambas partes confirmen alcance, precio y programación."}
          </p>
          <p>
            {en
              ? "Service availability, coverage areas and timing are confirmed per request. Content on this site may be updated at any time."
              : "La disponibilidad, las zonas de cobertura y los tiempos se confirman por solicitud. El contenido de este sitio puede actualizarse en cualquier momento."}
          </p>
          <p>
            {en
              ? "Questions about these terms can be sent to [EMAIL ADDRESS]."
              : "Las consultas sobre estos términos pueden enviarse a [EMAIL ADDRESS]."}
          </p>
        </div>
      </section>
    </>
  );
}
