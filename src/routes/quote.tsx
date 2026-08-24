import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Short, shareable URL for the quote flow. The form itself lives at
 * /request-a-quote, so this permanently redirects and preserves ?service=.
 */
export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => ({
    ...(typeof search["service"] === "string" ? { service: search["service"] } : {}),
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/request-a-quote",
      search: search.service ? { service: search.service } : {},
      statusCode: 301,
    });
  },
});
