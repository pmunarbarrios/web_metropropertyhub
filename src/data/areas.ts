import type { Language } from "@/i18n";

export type Area = {
  slug: string;
  name: string;
  primary?: boolean;
  copy: Record<Language, { title: string; meta: string; intro: string; body: string }>;
};

export const areas: Area[] = [
  {
    slug: "staten-island",
    name: "Staten Island",
    primary: true,
    copy: {
      en: {
        title: "Cleaning & Property Services in Staten Island, NY",
        meta: "Cleaning services in Staten Island: commercial and residential cleaning, painting, plumbing, electrical and smart home installation. Free quotes.",
        intro:
          "Staten Island is our primary service area. From office buildings and retail spaces to houses and apartments, we cover cleaning, maintenance, painting, plumbing, electrical and smart home work across the borough.",
        body: "Because Staten Island is where we focus, scheduling is straightforward and we can plan recurring service around how your property actually runs — nightly office cleaning, weekly residential visits, or project work like painting and floor refinishing.",
      },
      es: {
        title: "Limpieza y Servicios para Propiedades en Staten Island, NY",
        meta: "Servicios de limpieza en Staten Island: limpieza comercial y residencial, pintura, plomería, electricidad y domótica. Presupuestos gratuitos.",
        intro:
          "Staten Island es nuestra zona principal de servicio. Desde edificios de oficinas y locales hasta casas y apartamentos, cubrimos limpieza, mantenimiento, pintura, plomería, electricidad y domótica en todo el borough.",
        body: "Al concentrarnos en Staten Island, la programación es simple y podemos planificar el servicio recurrente según el funcionamiento real de tu propiedad: limpieza nocturna de oficinas, visitas semanales o proyectos como pintura y restauración de pisos.",
      },
    },
  },
  {
    slug: "brooklyn",
    name: "Brooklyn",
    copy: {
      en: {
        title: "Cleaning & Property Services in Brooklyn",
        meta: "Commercial and residential cleaning, painting, plumbing, electrical and smart home services for properties in Brooklyn. Request a free quote.",
        intro:
          "We serve properties in Brooklyn from our Staten Island base, covering commercial cleaning, residential cleaning, painting, plumbing, electrical and smart home installations.",
        body: "Availability in Brooklyn is confirmed based on the property, the scope and the schedule. Send us the address and details through the quote form and our team will confirm what we can cover.",
      },
      es: {
        title: "Limpieza y Servicios para Propiedades en Brooklyn",
        meta: "Limpieza comercial y residencial, pintura, plomería, electricidad y domótica para propiedades en Brooklyn. Solicita tu presupuesto.",
        intro:
          "Atendemos propiedades en Brooklyn desde nuestra base en Staten Island, con limpieza comercial y residencial, pintura, plomería, electricidad e instalaciones smart home.",
        body: "La disponibilidad en Brooklyn se confirma según la propiedad, el alcance y el horario. Envíanos la dirección y los detalles y nuestro equipo confirmará la cobertura.",
      },
    },
  },
  {
    slug: "queens",
    name: "Queens",
    copy: {
      en: {
        title: "Cleaning & Property Services in Queens",
        meta: "Cleaning, maintenance, painting, plumbing, electrical and smart home services for commercial and residential properties in Queens.",
        intro:
          "Offices, retail spaces and homes in Queens can request the same range of services: cleaning programs, property maintenance, painting, plumbing, electrical and smart home installation.",
        body: "Tell us the property type, location and what you need. We confirm coverage in Queens case by case before scheduling.",
      },
      es: {
        title: "Limpieza y Servicios para Propiedades en Queens",
        meta: "Limpieza, mantenimiento, pintura, plomería, electricidad y domótica para propiedades comerciales y residenciales en Queens.",
        intro:
          "Oficinas, locales y hogares en Queens pueden solicitar la misma gama de servicios: programas de limpieza, mantenimiento, pintura, plomería, electricidad y domótica.",
        body: "Cuéntanos el tipo de propiedad, la ubicación y lo que necesitas. Confirmamos la cobertura en Queens caso por caso antes de programar.",
      },
    },
  },
  {
    slug: "manhattan",
    name: "Manhattan",
    copy: {
      en: {
        title: "Cleaning & Property Services in Manhattan",
        meta: "Commercial cleaning, office cleaning, painting, plumbing, electrical and smart home services for Manhattan properties. Free quote.",
        intro:
          "Manhattan properties often need cleaning outside business hours and maintenance that fits building rules. We plan the work around those constraints.",
        body: "Share the building requirements along with your request and we will confirm what we can schedule and when.",
      },
      es: {
        title: "Limpieza y Servicios para Propiedades en Manhattan",
        meta: "Limpieza comercial, limpieza de oficinas, pintura, plomería, electricidad y domótica para propiedades en Manhattan.",
        intro:
          "Las propiedades en Manhattan suelen necesitar limpieza fuera del horario laboral y mantenimiento acorde a las reglas del edificio. Planificamos el trabajo según esas condiciones.",
        body: "Comparte los requisitos del edificio junto con tu solicitud y confirmaremos qué podemos programar y cuándo.",
      },
    },
  },
  {
    slug: "bronx",
    name: "Bronx",
    copy: {
      en: {
        title: "Cleaning & Property Services in the Bronx",
        meta: "Cleaning, painting, plumbing, electrical and smart home services for residential and commercial properties in the Bronx.",
        intro:
          "We take requests from residential and commercial properties in the Bronx across our full range of cleaning and property services.",
        body: "Coverage in the Bronx is confirmed per request. Send the address and scope and we will follow up with a quote and availability.",
      },
      es: {
        title: "Limpieza y Servicios para Propiedades en el Bronx",
        meta: "Limpieza, pintura, plomería, electricidad y domótica para propiedades residenciales y comerciales en el Bronx.",
        intro:
          "Recibimos solicitudes de propiedades residenciales y comerciales en el Bronx para toda nuestra gama de servicios.",
        body: "La cobertura en el Bronx se confirma por solicitud. Envía la dirección y el alcance y te responderemos con un presupuesto y disponibilidad.",
      },
    },
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
