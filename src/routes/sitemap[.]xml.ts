import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { activeLocations } from "@/data/locations";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { SITE_URL } from "@/lib/site";

interface SitemapEntry {
  path: string;
  lastmod: string;
  priority: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString();
        const entries: SitemapEntry[] = [
          { path: "/", lastmod, priority: "1.0" },
          { path: "/services", lastmod, priority: "0.8" },
          ...services.map((service) => ({
            path: `/services/${service.slug}`,
            lastmod,
            priority: "0.8",
          })),
          ...solutions.map((solution) => ({
            path: `/solutions/${solution.slug}`,
            lastmod,
            priority: "0.5",
          })),
          { path: "/locations", lastmod, priority: "0.8" },
          ...activeLocations.map((location) => ({
            path: `/locations/${location.slug}`,
            lastmod,
            priority: "0.8",
          })),
          { path: "/about", lastmod, priority: "0.5" },
          { path: "/contact", lastmod, priority: "0.5" },
          { path: "/reviews", lastmod, priority: "0.5" },
          { path: "/faq", lastmod, priority: "0.5" },
          { path: "/request-a-quote", lastmod, priority: "0.5" },
          { path: "/privacy-policy", lastmod, priority: "0.5" },
          { path: "/terms-of-service", lastmod, priority: "0.5" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${e.path}</loc>`,
            `    <lastmod>${e.lastmod}</lastmod>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
