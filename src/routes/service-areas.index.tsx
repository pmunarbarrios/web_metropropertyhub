import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — the location architecture now lives under /locations. */
export const Route = createFileRoute("/service-areas/")({
  beforeLoad: () => {
    throw redirect({ to: "/locations", statusCode: 301 });
  },
});
