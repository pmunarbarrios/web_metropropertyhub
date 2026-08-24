import type { Language } from "@/i18n";

/**
 * Audience-focused landing pages. Each one maps a customer type to the core
 * services they actually buy, so we can qualify leads and route them in n8n
 * without inventing new service categories.
 */
export type SolutionCopy = {
  name: string;
  seoTitle: string;
  metaDescription: string;
  short: string;
  intro: string;
  bullets: string[];
  outcome: string;
};

export type Solution = {
  slug: string;
  icon: string;
  /** Service slugs surfaced on the page — keeps internal linking honest. */
  serviceSlugs: string[];
  copy: Record<Language, SolutionCopy>;
};

export const solutions: Solution[] = [
  {
    slug: "landlords",
    icon: "KeyRound",
    serviceSlugs: [
      "move-out-cleaning",
      "move-in-cleaning",
      "rental-turnover",
      "touch-up-painting",
      "furniture-removal",
    ],
    copy: {
      en: {
        name: "Landlords",
        seoTitle: "Property Services for Landlords in Staten Island & NYC",
        metaDescription:
          "Turnover cleaning, patching and painting for landlords in Staten Island and NYC. Get a unit rent-ready fast, one unit at a time.",
        short: "Get a unit rent-ready between tenants without chasing five different contractors.",
        intro:
          "Every vacant day costs money. We handle the work between tenants — clean the unit, patch and repaint the walls, clear whatever was left behind — so the listing photos happen sooner and the unit shows well.",
        bullets: [
          "Move-out cleaning after the tenant leaves",
          "Wall patching and touch-up or full room painting",
          "Furniture and debris removal from the unit",
          "Move-in cleaning before the new tenant arrives",
          "One point of contact for the whole turnover",
        ],
        outcome: "Fewer vacant days, one invoice, one crew.",
      },
      es: {
        name: "Propietarios de Alquiler",
        seoTitle: "Servicios para Propietarios de Alquiler en Staten Island y NYC",
        metaDescription:
          "Limpieza de mudanza, reparación de paredes y pintura para propietarios en Staten Island y NYC. Deja la unidad lista para alquilar rápido.",
        short: "Deja una unidad lista para alquilar sin coordinar cinco contratistas distintos.",
        intro:
          "Cada día vacío cuesta dinero. Nos encargamos del trabajo entre inquilinos: limpiar la unidad, reparar y pintar las paredes, retirar lo que quedó, para que las fotos y las visitas ocurran antes.",
        bullets: [
          "Limpieza después de la salida del inquilino",
          "Reparación de paredes y pintura de retoque o completa",
          "Retiro de muebles y escombros de la unidad",
          "Limpieza previa a la llegada del nuevo inquilino",
          "Un solo contacto para toda la preparación",
        ],
        outcome: "Menos días vacíos, una sola factura, un solo equipo.",
      },
    },
  },
  {
    slug: "realtors",
    icon: "Handshake",
    serviceSlugs: [
      "deep-cleaning",
      "touch-up-painting",
      "room-painting",
      "furniture-removal",
      "apartment-cleaning",
    ],
    copy: {
      en: {
        name: "Realtors",
        seoTitle: "Listing Prep & Cleaning for Realtors in Staten Island & NYC",
        metaDescription:
          "Pre-listing cleaning, touch-up painting and clear-outs for realtors in Staten Island and NYC. Fast scheduling before photos and open houses.",
        short: "Get a listing photo-ready before the shoot, not after the first showing.",
        intro:
          "A listing sells faster when it is clean, bright and empty of clutter. We work to your photo date: deep clean, scuff and mark touch-ups, and removal of whatever should not appear in the photos.",
        bullets: [
          "Pre-listing deep cleaning",
          "Touch-up painting for scuffs, marks and nail holes",
          "Clear-out of leftover furniture and clutter",
          "Scheduling aligned with photo and open-house dates",
          "Repeat scheduling for agents with several listings",
        ],
        outcome: "Better photos, better showings, quicker offers.",
      },
      es: {
        name: "Agentes Inmobiliarios",
        seoTitle: "Preparación de Propiedades para Agentes en Staten Island y NYC",
        metaDescription:
          "Limpieza previa a la publicación, retoques de pintura y despeje de espacios para agentes inmobiliarios en Staten Island y NYC.",
        short: "Deja la propiedad lista para las fotos, no después de la primera visita.",
        intro:
          "Una propiedad se vende más rápido cuando está limpia, luminosa y sin desorden. Trabajamos según tu fecha de fotos: limpieza profunda, retoques de pintura y retiro de lo que no debe salir en las imágenes.",
        bullets: [
          "Limpieza profunda antes de publicar",
          "Retoques de pintura en marcas, golpes y agujeros",
          "Retiro de muebles sobrantes y desorden",
          "Programación según fechas de fotos y visitas abiertas",
          "Servicio recurrente para agentes con varias propiedades",
        ],
        outcome: "Mejores fotos, mejores visitas, ofertas más rápidas.",
      },
    },
  },
  {
    slug: "property-managers",
    icon: "Building2",
    serviceSlugs: [
      "property-maintenance",
      "rental-turnover",
      "post-renovation-cleanup",
      "apartment-cleaning",
      "furniture-removal",
    ],
    copy: {
      en: {
        name: "Property Managers",
        seoTitle: "Small-Job Support for Property Managers in Staten Island & NYC",
        metaDescription:
          "A reliable crew for the small jobs property managers deal with daily: unit cleaning, patching, painting, turnovers and removals in Staten Island and NYC.",
        short: "A dependable crew for the small jobs that pile up across your portfolio.",
        intro:
          "Managers usually do not need a general contractor — they need someone who shows up for a two-hour job. We take the recurring small work across your units so it stops sitting on the list.",
        bullets: [
          "Unit cleaning and turnovers on request",
          "Small maintenance tasks and punch-list items",
          "Patching and painting after repairs",
          "Post-renovation cleanup before handover",
          "Straightforward scheduling and written scopes",
        ],
        outcome: "Small work closed out fast, without escalating it.",
      },
      es: {
        name: "Administradores de Propiedades",
        seoTitle: "Apoyo en Trabajos Pequeños para Administradores en Staten Island y NYC",
        metaDescription:
          "Un equipo confiable para los trabajos pequeños del día a día: limpieza de unidades, reparación, pintura, preparación de alquileres y retiros.",
        short: "Un equipo confiable para los trabajos pequeños que se acumulan en tu portafolio.",
        intro:
          "Los administradores no suelen necesitar un contratista general: necesitan a alguien que llegue para un trabajo de dos horas. Nos encargamos del trabajo pequeño y recurrente en tus unidades.",
        bullets: [
          "Limpieza de unidades y preparación entre inquilinos",
          "Mantenimiento pequeño y pendientes de lista",
          "Reparación y pintura después de arreglos",
          "Limpieza post-obra antes de la entrega",
          "Programación simple y alcances por escrito",
        ],
        outcome: "Trabajos pequeños cerrados rápido, sin escalarlos.",
      },
    },
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
