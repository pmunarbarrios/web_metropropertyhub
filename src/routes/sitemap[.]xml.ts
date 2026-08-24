import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { activeLocations } from "@/data/locations";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";

const BASE_URL = "https://metro-pro-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          ...services.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: s.phase === "core" ? "0.9" : "0.6",
          })),
          { path: "/solutions", changefreq: "monthly", priority: "0.8" },
          ...solutions.map((s) => ({
            path: `/solutions/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          { path: "/locations", changefreq: "monthly", priority: "0.8" },
          ...activeLocations.map((l) => ({
            path: `/locations/${l.slug}`,
            changefreq: "monthly" as const,
            priority: l.coverage === "primary" ? "0.8" : "0.6",
          })),
          { path: "/request-a-quote", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "yearly", priority: "0.6" },
          { path: "/reviews", changefreq: "monthly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.2" },
          { path: "/terms-of-service", changefreq: "yearly", priority: "0.2" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
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
