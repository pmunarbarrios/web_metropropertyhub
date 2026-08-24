import type { Language } from "@/i18n";

/**
 * Service catalog.
 *
 * `phase` controls commercial focus without deleting anything:
 *  - "core"      → small, fast, high-demand jobs. Featured everywhere.
 *  - "expansion" → larger/commercial work we can quote on request. Visible,
 *                  but never the headline. Flip to "core" when we scale.
 */
export type ServiceCategory = "cleaning" | "painting" | "turnover" | "maintenance" | "commercial";
export type ServicePhase = "core" | "expansion";

export type ServiceCopy = {
  name: string;
  short: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
};

export type Service = {
  slug: string;
  icon: string;
  categories: ServiceCategory[];
  phase: ServicePhase;
  featured?: boolean;
  copy: Record<Language, ServiceCopy>;
};

export const services: Service[] = [
  /* ------------------------------- Cleaning ------------------------------- */
  {
    slug: "apartment-cleaning",
    icon: "Home",
    categories: ["cleaning"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Apartment Cleaning",
        short: "One-time or recurring cleaning for apartments, condos and small homes.",
        seoTitle: "Apartment Cleaning in Staten Island & NYC",
        metaDescription:
          "Apartment cleaning in Staten Island and across NYC. One-time or recurring service for apartments, condos and small homes. Fast quotes, small jobs welcome.",
        intro:
          "Small apartment? That is exactly the job we want. We clean studios, one and two bedroom apartments and condos on a schedule that fits you — once, weekly or monthly.",
        bullets: [
          "Kitchens, bathrooms, bedrooms and living areas",
          "Floors vacuumed, mopped and detailed",
          "Surfaces, fixtures and appliance exteriors",
          "One-time, weekly, biweekly or monthly",
          "Occupied or vacant units",
        ],
      },
      es: {
        name: "Limpieza de Apartamentos",
        short: "Limpieza puntual o recurrente para apartamentos, condominios y casas pequeñas.",
        seoTitle: "Limpieza de Apartamentos en Staten Island y NYC",
        metaDescription:
          "Limpieza de apartamentos en Staten Island y NYC. Servicio puntual o recurrente para apartamentos, condominios y casas pequeñas. Presupuesto rápido.",
        intro:
          "¿Apartamento pequeño? Ese es justo el trabajo que buscamos. Limpiamos estudios, apartamentos de una o dos habitaciones y condominios con la frecuencia que necesites.",
        bullets: [
          "Cocinas, baños, habitaciones y salas",
          "Pisos aspirados, trapeados y detallados",
          "Superficies, accesorios y exteriores de electrodomésticos",
          "Servicio puntual, semanal, quincenal o mensual",
          "Unidades ocupadas o vacías",
        ],
      },
    },
  },
  {
    slug: "deep-cleaning",
    icon: "Sparkles",
    categories: ["cleaning"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Deep Cleaning",
        short: "A detailed reset for units that need more than routine cleaning.",
        seoTitle: "Deep Cleaning Services in Staten Island & NYC",
        metaDescription:
          "Deep cleaning for apartments and small properties in Staten Island and NYC. Detailed kitchen, bathroom and buildup cleaning. Request pricing today.",
        intro:
          "When a routine clean is not enough, a deep clean gets into the places daily cleaning skips: buildup, grout, appliance interiors, baseboards and behind furniture.",
        bullets: [
          "Kitchen degreasing and appliance interiors",
          "Bathroom scale, grout and tile detail",
          "Baseboards, door frames, vents and switches",
          "Inside cabinets and closets on request",
          "Ideal before a move, a sale or a listing",
        ],
      },
      es: {
        name: "Limpieza Profunda",
        short: "Un reinicio detallado para unidades que necesitan más que limpieza rutinaria.",
        seoTitle: "Limpieza Profunda en Staten Island y NYC",
        metaDescription:
          "Limpieza profunda para apartamentos y propiedades pequeñas en Staten Island y NYC. Cocina, baños y acumulación de suciedad al detalle.",
        intro:
          "Cuando la limpieza rutinaria no alcanza, la limpieza profunda llega a lo que se suele omitir: acumulación, juntas, interiores de electrodomésticos, zócalos y detrás de los muebles.",
        bullets: [
          "Desengrase de cocina e interiores de electrodomésticos",
          "Sarro, juntas y azulejos del baño",
          "Zócalos, marcos, rejillas e interruptores",
          "Interior de gabinetes y closets bajo pedido",
          "Ideal antes de una mudanza, venta o publicación",
        ],
      },
    },
  },
  {
    slug: "move-in-cleaning",
    icon: "DoorOpen",
    categories: ["cleaning", "turnover"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Move-In Cleaning",
        short: "A clean, ready unit before the boxes arrive.",
        seoTitle: "Move-In Cleaning in Staten Island & NYC",
        metaDescription:
          "Move-in cleaning in Staten Island and NYC. We clean the empty unit before you move in — kitchen, bathrooms, closets and floors. Fast scheduling.",
        intro:
          "Moving into a place someone else just left is easier when the unit has been cleaned properly first. We work in the empty apartment so you start fresh on day one.",
        bullets: [
          "Full clean while the unit is empty",
          "Inside cabinets, drawers and closets",
          "Bathrooms and kitchen sanitized",
          "Floors, windowsills and fixtures",
          "Scheduled around your move date",
        ],
      },
      es: {
        name: "Limpieza de Entrada (Move-In)",
        short: "Una unidad limpia y lista antes de que lleguen las cajas.",
        seoTitle: "Limpieza Move-In en Staten Island y NYC",
        metaDescription:
          "Limpieza move-in en Staten Island y NYC. Limpiamos la unidad vacía antes de tu mudanza: cocina, baños, closets y pisos. Agenda rápida.",
        intro:
          "Mudarte a un lugar que alguien acaba de dejar es mucho mejor si la unidad se limpió bien antes. Trabajamos con el apartamento vacío para que empieces desde cero.",
        bullets: [
          "Limpieza completa con la unidad vacía",
          "Interior de gabinetes, cajones y closets",
          "Baños y cocina sanitizados",
          "Pisos, alféizares y accesorios",
          "Programado según tu fecha de mudanza",
        ],
      },
    },
  },
  {
    slug: "move-out-cleaning",
    icon: "Boxes",
    categories: ["cleaning", "turnover"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Move-Out Cleaning",
        short: "Leave the unit in the condition the lease expects.",
        seoTitle: "Move-Out Cleaning in Staten Island & NYC",
        metaDescription:
          "Move-out cleaning in Staten Island and NYC for tenants, landlords and realtors. Detailed cleaning of empty units. Get pricing in minutes.",
        intro:
          "Move-out cleaning is about the details a walkthrough looks for. We clean the empty unit top to bottom so the handover goes smoothly for tenant and owner alike.",
        bullets: [
          "Empty-unit deep clean",
          "Appliance interiors and cabinet insides",
          "Bathroom and kitchen detail work",
          "Marks, dust and debris removed",
          "Coordinated with your move-out date",
        ],
      },
      es: {
        name: "Limpieza de Salida (Move-Out)",
        short: "Entrega la unidad en las condiciones que exige el contrato.",
        seoTitle: "Limpieza Move-Out en Staten Island y NYC",
        metaDescription:
          "Limpieza move-out en Staten Island y NYC para inquilinos, propietarios y agentes. Limpieza detallada de unidades vacías. Precio en minutos.",
        intro:
          "La limpieza de salida se trata de los detalles que revisa una inspección. Limpiamos la unidad vacía de arriba abajo para que la entrega sea sencilla.",
        bullets: [
          "Limpieza profunda con la unidad vacía",
          "Interiores de electrodomésticos y gabinetes",
          "Detalle de baño y cocina",
          "Marcas, polvo y escombros retirados",
          "Coordinado con tu fecha de salida",
        ],
      },
    },
  },
  {
    slug: "post-renovation-cleanup",
    icon: "Hammer",
    categories: ["cleaning", "maintenance"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Post-Renovation Cleanup",
        short: "Construction dust and debris cleared so the space is usable again.",
        seoTitle: "Post-Renovation Cleanup in Staten Island & NYC",
        metaDescription:
          "Post-renovation and post-construction cleanup in Staten Island and NYC. Dust removal, debris clearing and final detail cleaning for small projects.",
        intro:
          "After a renovation, fine dust ends up everywhere. We clear debris, remove the dust that settles on every surface and finish with a detail clean so the space can be used or shown.",
        bullets: [
          "Debris and packaging removal",
          "Fine construction dust on all surfaces",
          "Windows, sills, vents and fixtures",
          "Floor cleaning and protection removal",
          "Final detail pass before handover",
        ],
      },
      es: {
        name: "Limpieza Post-Renovación",
        short: "Polvo y escombros de obra retirados para volver a usar el espacio.",
        seoTitle: "Limpieza Post-Renovación en Staten Island y NYC",
        metaDescription:
          "Limpieza post-renovación y post-construcción en Staten Island y NYC. Retiro de polvo, escombros y limpieza final de detalle en proyectos pequeños.",
        intro:
          "Después de una renovación el polvo fino queda en todas partes. Retiramos escombros, eliminamos el polvo de cada superficie y terminamos con una limpieza de detalle.",
        bullets: [
          "Retiro de escombros y embalajes",
          "Polvo fino de obra en todas las superficies",
          "Ventanas, alféizares, rejillas y accesorios",
          "Limpieza de pisos y retiro de protecciones",
          "Pase final de detalle antes de la entrega",
        ],
      },
    },
  },

  /* ------------------------------- Painting ------------------------------- */
  {
    slug: "apartment-painting",
    icon: "PaintRoller",
    categories: ["painting"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Apartment Painting",
        short: "Full interior repaint of an apartment, usually in days not weeks.",
        seoTitle: "Apartment Painting in Staten Island & NYC",
        metaDescription:
          "Apartment painting in Staten Island and NYC. Interior repaints for apartments and condos with proper prep and clean finishes. Request a quote.",
        intro:
          "A repaint is the fastest way to make a unit feel new. We prep the walls, protect the space and paint the whole apartment with clean lines and a tidy finish.",
        bullets: [
          "Walls, ceilings, trim and doors",
          "Patching, sanding and priming",
          "Furniture and floor protection",
          "Low-odor paint options for occupied units",
          "Typical apartment finished in a few days",
        ],
      },
      es: {
        name: "Pintura de Apartamentos",
        short: "Repintado interior completo de un apartamento, en días y no semanas.",
        seoTitle: "Pintura de Apartamentos en Staten Island y NYC",
        metaDescription:
          "Pintura de apartamentos en Staten Island y NYC. Repintado interior con preparación adecuada y acabados limpios. Solicita tu presupuesto.",
        intro:
          "Repintar es la forma más rápida de renovar una unidad. Preparamos las paredes, protegemos el espacio y pintamos todo el apartamento con líneas limpias.",
        bullets: [
          "Paredes, techos, molduras y puertas",
          "Resane, lijado e imprimación",
          "Protección de muebles y pisos",
          "Pinturas de bajo olor para unidades ocupadas",
          "Apartamento típico terminado en pocos días",
        ],
      },
    },
  },
  {
    slug: "room-painting",
    icon: "Brush",
    categories: ["painting"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Room Painting",
        short: "One room, one accent wall, one weekend job. No minimum project size.",
        seoTitle: "Room Painting Services in Staten Island & NYC",
        metaDescription:
          "Single-room painting in Staten Island and NYC. Bedrooms, living rooms, accent walls and small spaces painted with proper prep. Small jobs welcome.",
        intro:
          "You should not have to book a whole-home project to get one room painted. We take single-room jobs and treat them with the same prep and finish as a full repaint.",
        bullets: [
          "Bedrooms, living rooms, offices and hallways",
          "Accent walls and color changes",
          "Ceiling and trim included on request",
          "Prep, patching and two coats",
          "No minimum project size",
        ],
      },
      es: {
        name: "Pintura por Habitación",
        short: "Una habitación, una pared de acento, un trabajo de fin de semana.",
        seoTitle: "Pintura por Habitación en Staten Island y NYC",
        metaDescription:
          "Pintura de una sola habitación en Staten Island y NYC. Dormitorios, salas, paredes de acento y espacios pequeños. Aceptamos trabajos pequeños.",
        intro:
          "No deberías contratar un proyecto completo para pintar una sola habitación. Aceptamos trabajos de una habitación con la misma preparación y acabado.",
        bullets: [
          "Dormitorios, salas, oficinas y pasillos",
          "Paredes de acento y cambios de color",
          "Techo y molduras bajo pedido",
          "Preparación, resane y dos manos",
          "Sin tamaño mínimo de proyecto",
        ],
      },
    },
  },
  {
    slug: "touch-up-painting",
    icon: "PaintBucket",
    categories: ["painting", "maintenance"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Touch-Up & Wall Patching",
        short: "Holes, dents, scuffs and marks repaired and repainted.",
        seoTitle: "Touch-Up Painting & Wall Patching in Staten Island & NYC",
        metaDescription:
          "Touch-up painting and wall patching in Staten Island and NYC. Nail holes, dents, scuffs and drywall repairs fixed and repainted. Quick turnaround.",
        intro:
          "Between tenants, before a showing or after furniture moves, most walls just need patching and touch-ups. It is a short visit that changes how the whole unit reads.",
        bullets: [
          "Nail holes, anchors and small drywall damage",
          "Dents, cracks and corner repairs",
          "Scuff and mark removal",
          "Color matching to existing paint",
          "Often completed in a single visit",
        ],
      },
      es: {
        name: "Retoques y Resane de Paredes",
        short: "Huecos, golpes, rayones y marcas reparados y repintados.",
        seoTitle: "Retoques de Pintura y Resane en Staten Island y NYC",
        metaDescription:
          "Retoques de pintura y resane de paredes en Staten Island y NYC. Huecos de clavos, golpes, rayones y reparación de drywall. Respuesta rápida.",
        intro:
          "Entre inquilinos, antes de una visita o después de mover muebles, la mayoría de las paredes solo necesitan resane y retoques. Es una visita corta con gran impacto.",
        bullets: [
          "Huecos de clavos, anclajes y daños pequeños de drywall",
          "Golpes, grietas y reparación de esquinas",
          "Eliminación de rayones y marcas",
          "Igualación de color con la pintura existente",
          "Normalmente resuelto en una sola visita",
        ],
      },
    },
  },

  /* ------------------------ Turnover & maintenance ------------------------ */
  {
    slug: "rental-turnover",
    icon: "KeyRound",
    categories: ["turnover", "cleaning", "painting"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Rental Turnover",
        short: "Clean, patch, paint and prep a unit between tenants — one coordinated visit.",
        seoTitle: "Rental Turnover Services in Staten Island & NYC",
        metaDescription:
          "Rental turnover in Staten Island and NYC for landlords and property managers. Cleaning, patching, painting and prep between tenants. One point of contact.",
        intro:
          "Vacancy costs money. Turnover packages combine move-out cleaning, wall repairs, touch-up or full painting and final prep, coordinated so the unit is rent-ready fast.",
        bullets: [
          "Move-out clean of the vacated unit",
          "Wall patching and repainting",
          "Small repairs and fixture checks",
          "Debris and leftover item removal",
          "Photo-ready for listings and showings",
        ],
      },
      es: {
        name: "Preparación entre Inquilinos",
        short: "Limpiar, resanar, pintar y preparar la unidad en una sola coordinación.",
        seoTitle: "Turnover de Alquileres en Staten Island y NYC",
        metaDescription:
          "Turnover de alquileres en Staten Island y NYC para propietarios y administradores. Limpieza, resane, pintura y preparación entre inquilinos.",
        intro:
          "La vacancia cuesta dinero. Los paquetes de turnover combinan limpieza de salida, reparación de paredes, pintura y preparación final para alquilar rápido.",
        bullets: [
          "Limpieza de salida de la unidad desocupada",
          "Resane y repintado de paredes",
          "Reparaciones menores y revisión de accesorios",
          "Retiro de escombros y objetos olvidados",
          "Lista para fotos y visitas",
        ],
      },
    },
  },
  {
    slug: "property-maintenance",
    icon: "Wrench",
    categories: ["maintenance"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Small Property Maintenance",
        short: "The short list of small fixes most contractors will not come out for.",
        seoTitle: "Small Property Maintenance in Staten Island & NYC",
        metaDescription:
          "Small property maintenance in Staten Island and NYC. Minor repairs, fixture swaps, hardware and punch-list work for apartments and small properties.",
        intro:
          "Most properties collect a short list of small tasks. We handle that list in one visit instead of leaving it for a job that never gets scheduled.",
        bullets: [
          "Fixture, hardware and accessory replacement",
          "Doors, hinges, handles and locks adjusted",
          "Shelving, blinds and mounting",
          "Punch-list and walkthrough items",
          "Common area and hallway upkeep",
        ],
      },
      es: {
        name: "Mantenimiento de Propiedades Pequeñas",
        short: "Esa lista corta de arreglos que casi ningún contratista quiere atender.",
        seoTitle: "Mantenimiento de Propiedades en Staten Island y NYC",
        metaDescription:
          "Mantenimiento de propiedades pequeñas en Staten Island y NYC. Reparaciones menores, cambio de accesorios y pendientes de lista para apartamentos.",
        intro:
          "Casi toda propiedad acumula una lista corta de tareas pequeñas. Resolvemos esa lista en una sola visita en lugar de dejarla pendiente indefinidamente.",
        bullets: [
          "Cambio de accesorios, herrajes y luminarias",
          "Ajuste de puertas, bisagras, manijas y cerraduras",
          "Estantes, persianas y montajes",
          "Pendientes de inspección y lista final",
          "Mantenimiento de áreas comunes y pasillos",
        ],
      },
    },
  },
  {
    slug: "furniture-removal",
    icon: "Truck",
    categories: ["maintenance", "turnover"],
    phase: "core",
    featured: true,
    copy: {
      en: {
        name: "Furniture & Waste Removal",
        short: "Old furniture, appliances and junk cleared out of the unit.",
        seoTitle: "Furniture & Junk Removal in Staten Island & NYC",
        metaDescription:
          "Furniture and waste removal in Staten Island and NYC. Old furniture, appliances and leftover items cleared from apartments and small properties.",
        intro:
          "Before cleaning or painting can happen, the leftovers have to go. We remove furniture, appliances and accumulated items and leave the space clear.",
        bullets: [
          "Furniture, mattresses and appliances",
          "Leftover tenant belongings",
          "Basement, closet and storage clear-outs",
          "Renovation leftovers and packaging",
          "Bundled with cleaning or turnover work",
        ],
      },
      es: {
        name: "Retiro de Muebles y Desechos",
        short: "Muebles viejos, electrodomésticos y trastos retirados de la unidad.",
        seoTitle: "Retiro de Muebles y Trastos en Staten Island y NYC",
        metaDescription:
          "Retiro de muebles y desechos en Staten Island y NYC. Muebles viejos, electrodomésticos y objetos olvidados en apartamentos y propiedades pequeñas.",
        intro:
          "Antes de limpiar o pintar hay que sacar lo que sobra. Retiramos muebles, electrodomésticos y objetos acumulados y dejamos el espacio despejado.",
        bullets: [
          "Muebles, colchones y electrodomésticos",
          "Pertenencias dejadas por inquilinos",
          "Vaciado de sótanos, closets y depósitos",
          "Sobrantes y embalajes de renovación",
          "Se combina con limpieza o turnover",
        ],
      },
    },
  },

  /* ---------------------------- Expansion phase --------------------------- */
  {
    slug: "commercial-cleaning",
    icon: "Building2",
    categories: ["commercial", "cleaning"],
    phase: "expansion",
    copy: {
      en: {
        name: "Commercial Cleaning",
        short: "Cleaning programs for small commercial spaces and storefronts.",
        seoTitle: "Small Commercial Cleaning in Staten Island & NYC",
        metaDescription:
          "Commercial cleaning for small businesses, storefronts and shared spaces in Staten Island and NYC. Scheduled or one-time service. Request a quote.",
        intro:
          "We take on small commercial spaces — storefronts, studios, salons, shared offices — with a scope built around your hours instead of a fixed corporate package.",
        bullets: [
          "Storefronts, studios and small offices",
          "Common areas, entrances and restrooms",
          "Trash removal and restocking",
          "Evening and weekend schedules",
          "One-time or recurring",
        ],
      },
      es: {
        name: "Limpieza Comercial",
        short: "Programas de limpieza para espacios comerciales pequeños y locales.",
        seoTitle: "Limpieza Comercial Pequeña en Staten Island y NYC",
        metaDescription:
          "Limpieza comercial para pequeños negocios, locales y espacios compartidos en Staten Island y NYC. Servicio programado o puntual.",
        intro:
          "Atendemos espacios comerciales pequeños — locales, estudios, salones, oficinas compartidas — con un alcance ajustado a tus horarios.",
        bullets: [
          "Locales, estudios y oficinas pequeñas",
          "Áreas comunes, entradas y baños",
          "Retiro de basura y reposición",
          "Horarios nocturnos y de fin de semana",
          "Puntual o recurrente",
        ],
      },
    },
  },
  {
    slug: "office-cleaning",
    icon: "Briefcase",
    categories: ["commercial", "cleaning"],
    phase: "expansion",
    copy: {
      en: {
        name: "Office Cleaning",
        short: "Scheduled cleaning for small and mid-size offices.",
        seoTitle: "Office Cleaning in Staten Island & NYC",
        metaDescription:
          "Office cleaning in Staten Island and NYC. Workstations, meeting rooms, kitchens and restrooms cleaned on a schedule that fits your team.",
        intro:
          "Workstations, meeting rooms, pantries and restrooms cleaned on a schedule that works around your team rather than interrupting it.",
        bullets: [
          "Workstations and meeting rooms",
          "Pantries and break rooms",
          "Restroom cleaning and sanitation",
          "Trash removal and recycling",
          "Daily, nightly or weekly",
        ],
      },
      es: {
        name: "Limpieza de Oficinas",
        short: "Limpieza programada para oficinas pequeñas y medianas.",
        seoTitle: "Limpieza de Oficinas en Staten Island y NYC",
        metaDescription:
          "Limpieza de oficinas en Staten Island y NYC. Puestos de trabajo, salas de reunión, cocinas y baños en el horario que funcione para tu equipo.",
        intro:
          "Puestos de trabajo, salas de reunión, cocinas y baños limpiados en un horario que se adapta a tu equipo en lugar de interrumpirlo.",
        bullets: [
          "Puestos de trabajo y salas de reunión",
          "Cocinas y áreas de descanso",
          "Limpieza y sanitización de baños",
          "Retiro de basura y reciclaje",
          "Diario, nocturno o semanal",
        ],
      },
    },
  },
  {
    slug: "floor-care",
    icon: "Layers",
    categories: ["commercial", "maintenance"],
    phase: "expansion",
    copy: {
      en: {
        name: "Floor Care",
        short: "Hard floor cleaning, polishing and maintenance programs.",
        seoTitle: "Floor Care Services in Staten Island & NYC",
        metaDescription:
          "Floor care in Staten Island and NYC. Hard surface cleaning, polishing and maintenance for apartments, small offices and commercial spaces.",
        intro:
          "Floors take the most wear in any property. We clean, polish and maintain hard surfaces so they hold up longer between bigger projects.",
        bullets: [
          "Hard surface and tile cleaning",
          "Polishing and buffing",
          "Grout cleaning",
          "Scheduled maintenance programs",
          "Residential and small commercial",
        ],
      },
      es: {
        name: "Cuidado de Pisos",
        short: "Limpieza, pulido y mantenimiento de pisos duros.",
        seoTitle: "Cuidado de Pisos en Staten Island y NYC",
        metaDescription:
          "Cuidado de pisos en Staten Island y NYC. Limpieza, pulido y mantenimiento de superficies duras para apartamentos, oficinas y locales.",
        intro:
          "Los pisos reciben el mayor desgaste. Limpiamos, pulimos y mantenemos superficies duras para que duren más entre proyectos mayores.",
        bullets: [
          "Limpieza de superficies duras y azulejos",
          "Pulido y abrillantado",
          "Limpieza de juntas",
          "Programas de mantenimiento",
          "Residencial y comercial pequeño",
        ],
      },
    },
  },
  {
    slug: "plumbing",
    icon: "Droplets",
    categories: ["maintenance"],
    phase: "expansion",
    copy: {
      en: {
        name: "Plumbing (on request)",
        short: "Minor plumbing coordination through licensed partners.",
        seoTitle: "Plumbing Coordination in Staten Island & NYC",
        metaDescription:
          "Plumbing coordination for small property jobs in Staten Island and NYC. Fixture swaps and minor issues handled with licensed partners.",
        intro:
          "Plumbing work is coordinated with licensed partners so a small fixture issue does not stall a turnover or a cleaning schedule.",
        bullets: [
          "Fixture and faucet replacement",
          "Minor leaks and drainage issues",
          "Coordination with licensed partners",
          "Bundled with turnover work",
          "Scope confirmed before scheduling",
        ],
      },
      es: {
        name: "Plomería (bajo pedido)",
        short: "Coordinación de plomería menor con socios licenciados.",
        seoTitle: "Coordinación de Plomería en Staten Island y NYC",
        metaDescription:
          "Coordinación de plomería para trabajos pequeños en Staten Island y NYC. Cambio de accesorios y problemas menores con socios licenciados.",
        intro:
          "El trabajo de plomería se coordina con socios licenciados para que un problema menor no detenga un turnover o una limpieza.",
        bullets: [
          "Cambio de accesorios y grifería",
          "Fugas menores y problemas de drenaje",
          "Coordinación con socios licenciados",
          "Se combina con trabajos de turnover",
          "Alcance confirmado antes de agendar",
        ],
      },
    },
  },
  {
    slug: "electrical",
    icon: "Zap",
    categories: ["maintenance"],
    phase: "expansion",
    copy: {
      en: {
        name: "Electrical (on request)",
        short: "Fixture and device work coordinated through licensed partners.",
        seoTitle: "Electrical Coordination in Staten Island & NYC",
        metaDescription:
          "Electrical coordination for small property jobs in Staten Island and NYC. Fixtures, outlets and devices handled with licensed partners.",
        intro:
          "Light fixtures, outlets and switches are coordinated with licensed partners and scheduled alongside the rest of the work on the property.",
        bullets: [
          "Light fixture replacement",
          "Outlets, switches and covers",
          "Smart device installation",
          "Coordination with licensed partners",
          "Scope confirmed before scheduling",
        ],
      },
      es: {
        name: "Electricidad (bajo pedido)",
        short: "Trabajo de luminarias y dispositivos con socios licenciados.",
        seoTitle: "Coordinación Eléctrica en Staten Island y NYC",
        metaDescription:
          "Coordinación eléctrica para trabajos pequeños en Staten Island y NYC. Luminarias, tomas y dispositivos con socios licenciados.",
        intro:
          "Luminarias, tomacorrientes e interruptores se coordinan con socios licenciados y se programan junto con el resto del trabajo.",
        bullets: [
          "Cambio de luminarias",
          "Tomacorrientes, interruptores y tapas",
          "Instalación de dispositivos inteligentes",
          "Coordinación con socios licenciados",
          "Alcance confirmado antes de agendar",
        ],
      },
    },
  },
];

export const coreServices = services.filter((s) => s.phase === "core");
export const expansionServices = services.filter((s) => s.phase === "expansion");
export const featuredServices = services.filter((s) => s.featured);

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (category: ServiceCategory) =>
  services.filter((s) => s.categories.includes(category));

export const quoteServiceOptions = (lang: Language) =>
  services.map((s) => ({ value: s.slug, label: s.copy[lang].name }));
