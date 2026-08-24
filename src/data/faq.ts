import type { Language } from "@/i18n";

export type FaqItem = Record<Language, { q: string; a: string }>;

export const faqs: FaqItem[] = [
  {
    en: {
      q: "What areas do you serve?",
      a: "Staten Island, NY is our primary service area. We also take requests from Brooklyn, Queens, Manhattan and the Bronx, and confirm coverage for each request based on the property and schedule.",
    },
    es: {
      q: "¿Qué zonas atienden?",
      a: "Staten Island, NY es nuestra zona principal. También recibimos solicitudes de Brooklyn, Queens, Manhattan y el Bronx, y confirmamos la cobertura según la propiedad y el horario.",
    },
  },
  {
    en: {
      q: "Do you clean both commercial and residential properties?",
      a: "Yes. We work with offices, retail spaces and commercial buildings as well as houses, apartments and condos. The scope and schedule are defined per property.",
    },
    es: {
      q: "¿Atienden propiedades comerciales y residenciales?",
      a: "Sí. Trabajamos con oficinas, locales y edificios comerciales, además de casas, apartamentos y condominios. El alcance y el horario se definen por propiedad.",
    },
  },
  {
    en: {
      q: "How do I get a quote?",
      a: "Use the quote form on this site or start a chat. Tell us the service, the property type and the location, and our team will follow up with pricing and availability.",
    },
    es: {
      q: "¿Cómo solicito un presupuesto?",
      a: "Usa el formulario de este sitio o inicia un chat. Indícanos el servicio, el tipo de propiedad y la ubicación, y nuestro equipo te responderá con precios y disponibilidad.",
    },
  },
  {
    en: {
      q: "Can you clean offices outside business hours?",
      a: "Yes. Daily and nightly office cleaning schedules are available so the work does not interrupt your team. We agree on the schedule before service starts.",
    },
    es: {
      q: "¿Pueden limpiar oficinas fuera del horario laboral?",
      a: "Sí. Ofrecemos limpieza diaria y nocturna para que el trabajo no interrumpa a tu equipo. El horario se acuerda antes de iniciar el servicio.",
    },
  },
  {
    en: {
      q: "Do you handle painting for both homes and businesses?",
      a: "Yes, residential and commercial painting, interior and exterior. Surface preparation and protection of the space are part of the scope.",
    },
    es: {
      q: "¿Realizan pintura para hogares y negocios?",
      a: "Sí, pintura residencial y comercial, interior y exterior. La preparación de superficies y la protección del espacio forman parte del alcance.",
    },
  },
  {
    en: {
      q: "What plumbing and electrical work do you do?",
      a: "Plumbing repairs, fixtures and leak issues, plus electrical work such as lighting, fixtures, outlets and upgrades tied to renovations, for residential and commercial properties.",
    },
    es: {
      q: "¿Qué trabajos de plomería y electricidad realizan?",
      a: "Reparaciones de plomería, griferías y fugas, además de trabajos eléctricos como iluminación, luminarias, tomacorrientes y mejoras vinculadas a remodelaciones.",
    },
  },
  {
    en: {
      q: "What does a smart home installation include?",
      a: "It depends on the devices you choose. Typical installations cover smart lighting, thermostats, cameras, doorbells and locks, plus app setup and automations so the system works together.",
    },
    es: {
      q: "¿Qué incluye una instalación smart home?",
      a: "Depende de los dispositivos elegidos. Una instalación típica cubre iluminación inteligente, termostatos, cámaras, timbres y cerraduras, además de la configuración de apps y automatizaciones.",
    },
  },
  {
    en: {
      q: "Can you handle several services for the same property?",
      a: "Yes. Many clients combine cleaning with maintenance, painting, plumbing, electrical or a smart home installation, which keeps everything with one team and one point of contact.",
    },
    es: {
      q: "¿Pueden atender varios servicios para la misma propiedad?",
      a: "Sí. Muchos clientes combinan limpieza con mantenimiento, pintura, plomería, electricidad o domótica, manteniendo todo con un solo equipo y un solo contacto.",
    },
  },
];
