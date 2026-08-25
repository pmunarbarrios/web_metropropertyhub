import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { useI18n } from "@/i18n";
import { abs } from "@/lib/site";

const TITLE = "Privacy Policy | Metro Pro Hub";
const DESCRIPTION =
  "How we handle the information you submit through our quote form, contact details and website chat.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: abs("/privacy-policy") },
    ],
    links: [{ rel: "canonical", href: abs("/privacy-policy") }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang, t } = useI18n();
  const en = lang === "en";

  return (
    <>
      <PageHero title={t("footer.privacy")} />
      <section className="bg-background">
        <div className="container-page section-y max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            {en
              ? "This page describes how information submitted through this website is handled. Contact details for privacy questions will be published here once finalized: [EMAIL ADDRESS]."
              : "Esta página describe cómo se maneja la información enviada a través de este sitio. Los datos de contacto para consultas de privacidad se publicarán aquí: [EMAIL ADDRESS]."}
          </p>
          <p>
            {en
              ? "Information you submit through the quote form or the website chat — such as your name, phone number, email address, property location and a description of the work — is used to respond to your request and to schedule service."
              : "La información que envías por el formulario de presupuesto o el chat — nombre, teléfono, correo electrónico, ubicación de la propiedad y descripción del trabajo — se utiliza para responder tu solicitud y programar el servicio."}
          </p>
          <p>
            {en
              ? "We do not sell your information. Requests may be processed with service providers used to receive and route messages."
              : "No vendemos tu información. Las solicitudes pueden procesarse con proveedores utilizados para recibir y enrutar mensajes."}
          </p>
        </div>
      </section>
    </>
  );
}
