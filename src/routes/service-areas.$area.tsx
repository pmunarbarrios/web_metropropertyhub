import { createFileRoute, redirect } from "@tanstack/react-router";
import { locationBySlug } from "@/data/locations";

/** Legacy URL — area pages moved to /locations/$slug. */
export const Route = createFileRoute("/service-areas/$area")({
  beforeLoad: ({ params }) => {
    const location = locationBySlug(params.area);
    if (location) {
      throw redirect({
        to: "/locations/$slug",
        params: { slug: location.slug },
        statusCode: 301,
      });
    }
    throw redirect({ to: "/locations", statusCode: 301 });
  },
});
