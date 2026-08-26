/**
 * Central SEO / site metadata layer.
 * Every route builds its head() from these helpers so titles, canonicals,
 * Open Graph, Twitter cards and structured data stay consistent and scalable.
 */
import { BUSINESS } from "@/lib/contact";

export const SITE_URL = "https://www.metropropertycare.co";
export const BRAND = BUSINESS.name;

export const abs = (path: string) => `${SITE_URL}${path}`;

export const pageTitle = (title: string) => (title.includes(BRAND) ? title : `${title} | ${BRAND}`);

type MetaEntry = { title?: string; name?: string; property?: string; content?: string };

export function pageMeta(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
}): MetaEntry[] {
  const title = pageTitle(input.title);
  const meta: MetaEntry[] = [
    { title },
    { name: "description", content: input.description },
    { property: "og:title", content: title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: abs(input.path) },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: input.description },
  ];
  if (input.image) {
    meta.push({ property: "og:image", content: input.image });
    meta.push({ name: "twitter:image", content: input.image });
  }
  if (input.noindex) meta.push({ name: "robots", content: "noindex" });
  return meta;
}

export const canonical = (path: string) => [{ rel: "canonical", href: abs(path) }];

export const ldScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

/* ---------------------------------- JSON-LD --------------------------------- */

export function localBusinessLd(areaNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    description:
      "Property painting, repairs and cleaning services across Staten Island and the five boroughs of NYC.",
    url: SITE_URL,
    telephone: `+1${BUSINESS.phoneDisplay.replace(/\D/g, "")}`,
    priceRange: "$$",
    image: `${SITE_URL}/favicon.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Staten Island",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: areaNames.map((name) => ({ "@type": "Place", name })),
  };
}

export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
  areaNames: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    serviceType: input.name,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND,
      url: SITE_URL,
    },
    areaServed: input.areaNames.map((name) => ({ "@type": "Place", name })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function articleLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    mainEntityOfPage: abs(input.path),
    author: { "@type": "Organization", name: BRAND },
    publisher: { "@type": "Organization", name: BRAND },
  };
}
