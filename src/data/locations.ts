import type { Language } from "@/i18n";

/**
 * Location layer for local SEO.
 *
 * `active: false` removes a location from navigation, the sitemap and the
 * location index, and its page returns 404 — so coverage can be expanded or
 * paused later without touching route code, and we never claim service in an
 * area we do not actually cover.
 */
export type Coverage = "primary" | "on-request";

export type LocationCopy = { title: string; meta: string; intro: string; body: string };

export type Location = {
  slug: string;
  name: string;
  type: "borough" | "neighborhood" | "metro";
  parent?: string;
  coverage: Coverage;
  active: boolean;
  copy: Record<Language, LocationCopy>;
};

type Focus = { en: string; es: string };

/** Builds consistent, non keyword-stuffed copy for a Staten Island neighborhood. */
function siNeighborhood(slug: string, name: string, focus: Focus, active = true): Location {
  return {
    slug,
    name,
    type: "neighborhood",
    parent: "staten-island",
    coverage: "primary",
    active,
    copy: {
      en: {
        title: `Apartment Cleaning & Small Jobs in ${name}, Staten Island`,
        meta: `Apartment cleaning, move-in and move-out cleaning, room painting, patching and small property jobs in ${name}, Staten Island. Fast quotes, small jobs welcome.`,
        intro: `${name} is part of our primary Staten Island service area. We take the small jobs most contractors skip: apartment and deep cleaning, move-in and move-out cleaning, room painting, wall patching, rental turnovers and furniture or waste removal.`,
        body: `${focus.en} Because our crews already work across Staten Island every week, scheduling in ${name} is straightforward — usually within a few days, and often sooner for one-room or single-unit jobs.`,
      },
      es: {
        title: `Limpieza de Apartamentos y Trabajos Pequeños en ${name}, Staten Island`,
        meta: `Limpieza de apartamentos, limpieza de mudanza, pintura de habitaciones, reparación de paredes y trabajos pequeños en ${name}, Staten Island. Presupuestos rápidos.`,
        intro: `${name} forma parte de nuestra zona principal en Staten Island. Hacemos los trabajos pequeños que muchos contratistas rechazan: limpieza de apartamentos y limpieza profunda, limpieza de mudanza, pintura de habitaciones, reparación de paredes, preparación de alquileres y retiro de muebles o escombros.`,
        body: `${focus.es} Como nuestros equipos ya trabajan en Staten Island cada semana, programar en ${name} es sencillo: normalmente en pocos días, y a menudo antes para trabajos de una habitación o una sola unidad.`,
      },
    },
  };
}

function borough(
  slug: string,
  name: string,
  copy: { en: { intro: string; body: string }; es: { intro: string; body: string } },
): Location {
  return {
    slug,
    name,
    type: "borough",
    coverage: "on-request",
    active: true,
    copy: {
      en: {
        title: `Apartment Cleaning & Small Property Jobs in ${name}`,
        meta: `Apartment cleaning, move-out cleaning, room painting and small property jobs in ${name}. Coverage confirmed per request from our Staten Island base.`,
        ...copy.en,
      },
      es: {
        title: `Limpieza de Apartamentos y Trabajos Pequeños en ${name}`,
        meta: `Limpieza de apartamentos, limpieza de mudanza, pintura de habitaciones y trabajos pequeños en ${name}. Cobertura confirmada por solicitud.`,
        ...copy.es,
      },
    },
  };
}

export const locations: Location[] = [
  {
    slug: "new-york-city",
    name: "New York City",
    type: "metro",
    coverage: "primary",
    active: true,
    copy: {
      en: {
        title: "Apartment Cleaning & Small Property Jobs in New York City",
        meta: "Apartment cleaning, move-in and move-out cleaning, room painting, patching and rental turnovers across New York City. Staten Island is our primary area.",
        intro:
          "Metro Pro Hub covers small, fast property jobs across New York City's five boroughs. Staten Island is our primary service area during launch, and we take requests from Brooklyn, Queens, Manhattan and the Bronx.",
        body: "Most of our work is single units and single rooms: an apartment clean before a showing, a move-out clean after a tenant leaves, a bedroom repaint, patched walls, a rental turnover between leases, or furniture and debris hauled out. Small jobs are the job — not a favor squeezed between larger contracts.",
      },
      es: {
        title: "Limpieza de Apartamentos y Trabajos Pequeños en New York City",
        meta: "Limpieza de apartamentos, limpieza de mudanza, pintura de habitaciones y preparación de alquileres en New York City. Staten Island es nuestra zona principal.",
        intro:
          "Metro Pro Hub atiende trabajos pequeños y rápidos en los cinco boroughs de New York City. Staten Island es nuestra zona principal durante el lanzamiento, y recibimos solicitudes de Brooklyn, Queens, Manhattan y el Bronx.",
        body: "La mayoría de nuestro trabajo son unidades y habitaciones individuales: limpiar un apartamento antes de una visita, limpieza después de una mudanza, pintar un cuarto, reparar paredes, preparar un alquiler entre inquilinos o retirar muebles y escombros. Los trabajos pequeños son el objetivo, no un favor entre contratos grandes.",
      },
    },
  },
  {
    slug: "staten-island",
    name: "Staten Island",
    type: "borough",
    coverage: "primary",
    active: true,
    copy: {
      en: {
        title: "Apartment Cleaning, Painting & Small Jobs in Staten Island, NY",
        meta: "Staten Island apartment cleaning, move-in and move-out cleaning, room painting, wall patching, rental turnovers and furniture removal. Fast quotes, small jobs welcome.",
        intro:
          "Staten Island is our primary service area. We handle apartment and deep cleaning, move-in and move-out cleaning, room and apartment painting, touch-ups and patching, rental turnovers, small maintenance tasks and furniture or waste removal.",
        body: "We work across the North Shore, Mid-Island and South Shore, including Great Kills, New Dorp, Eltingville, Tottenville, Annadale, Oakwood, Todt Hill and St. George. Because this is where we focus, response times are short and a single unit or a single room is a normal job for us.",
      },
      es: {
        title: "Limpieza, Pintura y Trabajos Pequeños en Staten Island, NY",
        meta: "Limpieza de apartamentos en Staten Island, limpieza de mudanza, pintura de habitaciones, reparación de paredes, preparación de alquileres y retiro de muebles.",
        intro:
          "Staten Island es nuestra zona principal de servicio. Hacemos limpieza de apartamentos y limpieza profunda, limpieza de mudanza, pintura de habitaciones y apartamentos, retoques y reparación de paredes, preparación de alquileres, mantenimiento pequeño y retiro de muebles o escombros.",
        body: "Trabajamos en North Shore, Mid-Island y South Shore, incluyendo Great Kills, New Dorp, Eltingville, Tottenville, Annadale, Oakwood, Todt Hill y St. George. Al concentrarnos aquí, los tiempos de respuesta son cortos y una sola unidad o una sola habitación es un trabajo normal para nosotros.",
      },
    },
  },
  siNeighborhood("great-kills", "Great Kills", {
    en: "Great Kills mixes single-family homes with a busy commercial strip, so we see a steady mix of house cleaning, room painting and small storefront jobs.",
    es: "Great Kills combina casas unifamiliares con una zona comercial activa, así que atendemos limpieza de casas, pintura de habitaciones y trabajos pequeños en locales.",
  }),
  siNeighborhood("new-dorp", "New Dorp", {
    en: "New Dorp has a dense rental market along with residential blocks, which usually means move-out cleaning and quick turnovers between tenants.",
    es: "New Dorp tiene un mercado de alquiler denso junto a zonas residenciales, lo que suele implicar limpieza de mudanza y preparación rápida entre inquilinos.",
  }),
  siNeighborhood("eltingville", "Eltingville", {
    en: "Most Eltingville requests are residential — deep cleans, interior painting and small repairs in family homes.",
    es: "La mayoría de las solicitudes en Eltingville son residenciales: limpiezas profundas, pintura interior y reparaciones pequeñas en casas de familia.",
  }),
  siNeighborhood("tottenville", "Tottenville", {
    en: "Tottenville sits at the southern end of the borough and is largely residential, so we plan South Shore routes to keep arrival windows tight.",
    es: "Tottenville está en el extremo sur del borough y es mayormente residencial, así que planificamos las rutas del South Shore para cumplir los horarios.",
  }),
  siNeighborhood("annadale", "Annadale", {
    en: "In Annadale we mostly work on homes: deep cleans, move-in and move-out cleaning, room painting and small maintenance tasks.",
    es: "En Annadale trabajamos sobre todo en viviendas: limpiezas profundas, limpieza de mudanza, pintura de habitaciones y mantenimiento pequeño.",
  }),
  siNeighborhood("oakwood", "Oakwood", {
    en: "Oakwood requests often combine a cleaning with a short punch list — patched walls, a repainted room, a few small fixes before a listing or a lease.",
    es: "En Oakwood las solicitudes suelen combinar limpieza con una lista corta de pendientes: paredes reparadas, un cuarto repintado y arreglos pequeños antes de una venta o un alquiler.",
  }),
  siNeighborhood("todt-hill", "Todt Hill", {
    en: "Todt Hill homes tend to be larger, so we scope carefully and keep the same crew on the property when possible.",
    es: "Las casas en Todt Hill suelen ser más grandes, por lo que definimos el alcance con cuidado y mantenemos el mismo equipo cuando es posible.",
  }),
  siNeighborhood("st-george", "St. George", {
    en: "St. George has apartments and mixed-use buildings near the ferry, where turnovers and post-renovation cleanups are the most common requests.",
    es: "St. George tiene apartamentos y edificios de uso mixto cerca del ferry, donde las preparaciones de alquiler y las limpiezas post-obra son lo más común.",
  }),
  borough("brooklyn", "Brooklyn", {
    en: {
      intro:
        "We take small-job requests from Brooklyn apartments and small properties from our Staten Island base. Coverage is confirmed per request based on the unit, the scope and the schedule.",
      body: "Move-out cleans, single-room painting, patching and rental turnovers are the work we schedule most often in Brooklyn. Send the address and details through the quote form and we will confirm availability.",
    },
    es: {
      intro:
        "Recibimos solicitudes de trabajos pequeños en apartamentos y propiedades de Brooklyn desde nuestra base en Staten Island. La cobertura se confirma según la unidad, el alcance y el horario.",
      body: "Limpieza de mudanza, pintura de una habitación, reparación de paredes y preparación de alquileres son los trabajos que más programamos en Brooklyn. Envía la dirección y los detalles y confirmamos disponibilidad.",
    },
  }),
  borough("queens", "Queens", {
    en: {
      intro:
        "Apartments, condos and small properties in Queens can request the same small-job services. Availability is confirmed case by case.",
      body: "Tell us the unit type, location and what you need — a deep clean, a repainted room, a turnover between tenants — and we will confirm coverage before scheduling.",
    },
    es: {
      intro:
        "Apartamentos, condominios y propiedades pequeñas en Queens pueden solicitar los mismos servicios. La disponibilidad se confirma caso por caso.",
      body: "Cuéntanos el tipo de unidad, la ubicación y lo que necesitas —limpieza profunda, una habitación pintada, preparación entre inquilinos— y confirmamos la cobertura antes de programar.",
    },
  }),
  borough("manhattan", "Manhattan", {
    en: {
      intro:
        "Manhattan units often need work scheduled around building rules, elevator reservations and service entrances. We plan the job around those constraints.",
      body: "Small apartment cleans, touch-up painting and move-out preparation are typical Manhattan requests. Share the building requirements with your quote and we will confirm what we can schedule.",
    },
    es: {
      intro:
        "Las unidades en Manhattan suelen requerir coordinación con reglas del edificio, reservas de ascensor y entradas de servicio. Planificamos el trabajo según esas condiciones.",
      body: "Limpieza de apartamentos pequeños, retoques de pintura y preparación de mudanza son solicitudes típicas en Manhattan. Comparte los requisitos del edificio y confirmamos qué podemos programar.",
    },
  }),
  borough("bronx", "Bronx", {
    en: {
      intro:
        "We take small-job requests from residential and small commercial properties in the Bronx across our core service list.",
      body: "Coverage is confirmed per request. Send the address and scope — cleaning, painting, patching, turnover or removal — and we will follow up with pricing and availability.",
    },
    es: {
      intro:
        "Recibimos solicitudes de trabajos pequeños en propiedades residenciales y comerciales pequeñas del Bronx dentro de nuestros servicios principales.",
      body: "La cobertura se confirma por solicitud. Envía la dirección y el alcance —limpieza, pintura, reparación, preparación de alquiler o retiro— y te respondemos con precio y disponibilidad.",
    },
  }),
];

export const activeLocations = locations.filter((l) => l.active);
export const primaryLocations = activeLocations.filter((l) => l.coverage === "primary");
export const onRequestLocations = activeLocations.filter((l) => l.coverage === "on-request");
export const boroughLocations = activeLocations.filter((l) => l.type === "borough");
export const statenIslandNeighborhoods = activeLocations.filter(
  (l) => l.type === "neighborhood" && l.parent === "staten-island",
);
export const locationBySlug = (slug: string) => activeLocations.find((l) => l.slug === slug);
export const locationNames = activeLocations.map((l) => l.name);
