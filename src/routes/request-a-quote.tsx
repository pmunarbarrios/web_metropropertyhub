import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { QuoteForm } from "@/components/QuoteForm";
import { useI18n } from "@/i18n";
import { canonical, pageMeta } from "@/lib/site";

const TITLE = "Request a Free Quote | Cleaning & Property Services Staten Island";
const DESCRIPTION =
  "Request a free quote for cleaning, maintenance, painting, plumbing, electrical or smart home services in Staten Island and the greater New York area.";

type QuoteSearch = { service?: string };

export const Route = createFileRoute("/request-a-quote")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    ...(typeof search['service'] === "string" ? { service: search['service'] } : {}),
  }),
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/request-a-quote" }),
    links: canonical("/request-a-quote"),
  }),
  component: QuotePage,
});

function QuotePage() {
  const { service } = Route.useSearch();
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t("quote.title")} subtitle={t("quote.sub")} />
      <section className="bg-surface">
        <div className="container-page section-y">
          <div className="mx-auto max-w-3xl">
            <QuoteForm {...(service ? { initialService: service } : {})} />
          </div>
        </div>
      </section>
    </>
  );
}
