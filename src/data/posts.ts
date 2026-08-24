import type { Language } from "@/i18n";

export type PostCopy = {
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  /** Simple section blocks so posts can later come from a CMS or database. */
  sections: { heading: string; paragraphs: string[] }[];
};

export type Post = {
  slug: string;
  /** ISO date of publication. */
  date: string;
  category: "cleaning" | "maintenance" | "guides";
  published: boolean;
  copy: Record<Language, PostCopy>;
};

export const posts: Post[] = [
  {
    slug: "commercial-cleaning-checklist-staten-island",
    date: "2026-02-10",
    category: "cleaning",
    published: true,
    copy: {
      en: {
        title: "What a Commercial Cleaning Scope Should Cover",
        seoTitle: "Commercial Cleaning Scope Checklist for Staten Island Businesses",
        metaDescription:
          "A practical checklist of what a commercial cleaning scope of work should include, from daily tasks to periodic deep cleaning, for Staten Island properties.",
        excerpt:
          "Most cleaning problems come from a vague scope of work. Here is what a clear commercial cleaning agreement should spell out.",
        sections: [
          {
            heading: "Start with frequency, not price",
            paragraphs: [
              "Before comparing quotes, decide how often each area actually needs attention. Entrances, restrooms and shared kitchens usually need daily service, while conference rooms, glass partitions and storage areas can often move to a weekly or monthly cycle.",
              "A scope built around frequency makes quotes comparable, because two vendors are then pricing the same work rather than a general idea of clean.",
            ],
          },
          {
            heading: "Daily tasks worth writing down",
            paragraphs: [
              "Trash and recycling removal, restroom sanitation and restocking, entrance and lobby floors, high-touch surfaces such as door handles and light switches, and a quick reset of shared spaces.",
              "These are the items building occupants notice first, so they belong in the daily list even when the rest of the scope is lighter.",
            ],
          },
          {
            heading: "Periodic work that protects the property",
            paragraphs: [
              "Floor care is the clearest example: stripping and waxing hard floors, machine scrubbing tile, and hot water extraction on carpet extend the life of the surface and cost far less than early replacement.",
              "Interior glass, vents, baseboards and upholstery cleaning also fit better on a quarterly or semiannual schedule than on a daily one.",
            ],
          },
          {
            heading: "Access, hours and communication",
            paragraphs: [
              "Write down who has keys or codes, which hours the crew can work, where supplies are stored, and who to contact when something needs attention outside the normal scope.",
              "In buildings with after-hours restrictions this is often the difference between a program that runs quietly and one that needs constant follow-up.",
            ],
          },
        ],
      },
      es: {
        title: "Qué Debe Cubrir un Alcance de Limpieza Comercial",
        seoTitle: "Checklist de Limpieza Comercial para Negocios en Staten Island",
        metaDescription:
          "Checklist práctico de lo que debe incluir un alcance de limpieza comercial, desde tareas diarias hasta limpieza profunda periódica, para propiedades en Staten Island.",
        excerpt:
          "La mayoría de los problemas de limpieza vienen de un alcance poco claro. Esto es lo que debería especificar un acuerdo de limpieza comercial.",
        sections: [
          {
            heading: "Empieza por la frecuencia, no por el precio",
            paragraphs: [
              "Antes de comparar presupuestos, define con qué frecuencia necesita atención cada área. Entradas, baños y cocinas compartidas suelen requerir servicio diario, mientras que salas de reuniones, mamparas de vidrio y depósitos pueden pasar a un ciclo semanal o mensual.",
              "Un alcance basado en frecuencia hace comparables los presupuestos, porque dos proveedores cotizan el mismo trabajo y no una idea general de limpieza.",
            ],
          },
          {
            heading: "Tareas diarias que conviene dejar por escrito",
            paragraphs: [
              "Retiro de basura y reciclaje, sanitización y reposición en baños, pisos de entrada y lobby, superficies de contacto frecuente como manijas e interruptores, y el orden de los espacios compartidos.",
              "Son los puntos que los ocupantes notan primero, así que deben estar en la lista diaria aunque el resto del alcance sea más liviano.",
            ],
          },
          {
            heading: "Trabajo periódico que protege la propiedad",
            paragraphs: [
              "El cuidado de pisos es el ejemplo más claro: decapado y encerado, fregado mecánico de cerámica y extracción con agua caliente en alfombras alargan la vida del material y cuestan mucho menos que reemplazarlo antes de tiempo.",
              "Vidrios interiores, rejillas de ventilación, zócalos y tapicería también encajan mejor en un calendario trimestral o semestral.",
            ],
          },
          {
            heading: "Accesos, horarios y comunicación",
            paragraphs: [
              "Anota quién tiene llaves o códigos, en qué horarios puede trabajar el equipo, dónde se guardan los insumos y a quién contactar cuando surge algo fuera del alcance habitual.",
              "En edificios con restricciones horarias, esto marca la diferencia entre un programa que funciona solo y uno que exige seguimiento constante.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "preparing-your-home-for-interior-painting",
    date: "2026-03-04",
    category: "guides",
    published: true,
    copy: {
      en: {
        title: "Preparing Your Home for Interior Painting",
        seoTitle: "How to Prepare a Home for Interior Painting",
        metaDescription:
          "What to do before an interior painting project starts: surface prep, furniture, scheduling and the questions to ask before work begins.",
        excerpt:
          "A smooth painting project is mostly preparation. Here is what happens before the first coat and what you can do in advance.",
        sections: [
          {
            heading: "Surfaces decide the finish",
            paragraphs: [
              "Patching, sanding and priming take longer than painting itself, and they determine how the finish looks in a year. Walls with moisture stains, peeling paint or previous repairs need to be addressed before color goes on.",
              "If a wall has an ongoing moisture issue, the source should be fixed first — otherwise the new coat will fail in the same spot.",
            ],
          },
          {
            heading: "What to move and what we handle",
            paragraphs: [
              "Small items, wall decor, electronics and anything fragile are best cleared by the owner. Larger furniture can usually be moved to the center of the room and covered.",
              "Ask ahead how floors, fixtures and trim will be protected, and confirm whether outlet covers and switch plates are removed rather than painted around.",
            ],
          },
          {
            heading: "Scheduling around the household",
            paragraphs: [
              "Room-by-room scheduling keeps most of the home usable during the project. Ventilation and drying times matter more in winter, when windows stay closed.",
              "Confirm the number of coats, the finish for each room, and who supplies paint before the start date so there are no pauses mid-project.",
            ],
          },
        ],
      },
      es: {
        title: "Cómo Preparar tu Casa para Pintura Interior",
        seoTitle: "Cómo Preparar una Casa para Pintura Interior",
        metaDescription:
          "Qué hacer antes de que comience un proyecto de pintura interior: preparación de superficies, muebles, horarios y preguntas clave antes de empezar.",
        excerpt:
          "Un buen proyecto de pintura es sobre todo preparación. Esto es lo que ocurre antes de la primera capa y lo que puedes adelantar.",
        sections: [
          {
            heading: "Las superficies definen el acabado",
            paragraphs: [
              "Resanar, lijar e imprimar toma más tiempo que pintar, y determina cómo se verá el acabado dentro de un año. Las paredes con manchas de humedad, pintura descascarada o reparaciones previas deben tratarse antes del color.",
              "Si una pared tiene un problema de humedad activo, primero hay que resolver el origen; de lo contrario la nueva capa fallará en el mismo punto.",
            ],
          },
          {
            heading: "Qué mover y qué hacemos nosotros",
            paragraphs: [
              "Lo mejor es que el propietario retire objetos pequeños, decoración, electrónica y piezas frágiles. Los muebles grandes suelen moverse al centro de la habitación y cubrirse.",
              "Pregunta cómo se protegerán pisos, luminarias y molduras, y confirma si se retiran las tapas de tomacorrientes e interruptores en lugar de pintar alrededor.",
            ],
          },
          {
            heading: "Programar según la rutina de la casa",
            paragraphs: [
              "Trabajar habitación por habitación mantiene la casa utilizable durante el proyecto. La ventilación y los tiempos de secado importan más en invierno, cuando las ventanas permanecen cerradas.",
              "Confirma la cantidad de capas, el acabado de cada ambiente y quién suministra la pintura antes de la fecha de inicio para evitar pausas.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "smart-home-upgrades-that-are-worth-it",
    date: "2026-04-15",
    category: "maintenance",
    published: true,
    copy: {
      en: {
        title: "Smart Home Upgrades Worth Installing First",
        seoTitle: "Smart Home Upgrades Worth Installing First",
        metaDescription:
          "A practical order for smart home installations — thermostats, lighting, cameras, locks and sensors — and the wiring questions to check before buying.",
        excerpt:
          "Not every smart device earns its place. These are the installations that tend to pay off, and what to check before buying hardware.",
        sections: [
          {
            heading: "Start with what runs every day",
            paragraphs: [
              "Thermostats and lighting are used constantly, so scheduling and automation show up on the utility bill and in daily comfort. They also tend to be the simplest retrofits in an existing home.",
              "Cameras, video doorbells and smart locks come next, because they change how the property is accessed and monitored.",
            ],
          },
          {
            heading: "Check the wiring before you buy",
            paragraphs: [
              "Many smart thermostats require a C-wire, some switches require a neutral in the box, and older homes often have neither. Confirming this before ordering hardware avoids returns and rework.",
              "Wi-Fi coverage matters just as much: a device in a basement or detached garage may need a wired connection or an access point rather than a stronger router.",
            ],
          },
          {
            heading: "Keep the system maintainable",
            paragraphs: [
              "Choose devices that work within one ecosystem where possible, document accounts and device names, and keep a plan for what happens when internet or power drops.",
              "Sensors for water leaks, smoke and freezing temperatures are inexpensive and are often the upgrade that prevents the most expensive repair.",
            ],
          },
        ],
      },
      es: {
        title: "Mejoras de Smart Home que Vale la Pena Instalar Primero",
        seoTitle: "Mejoras de Smart Home que Vale la Pena Instalar Primero",
        metaDescription:
          "Un orden práctico para instalaciones de domótica —termostatos, iluminación, cámaras, cerraduras y sensores— y qué revisar antes de comprar equipos.",
        excerpt:
          "No todo dispositivo inteligente se justifica. Estas son las instalaciones que suelen rendir y qué revisar antes de comprar.",
        sections: [
          {
            heading: "Empieza por lo que usas todos los días",
            paragraphs: [
              "Los termostatos y la iluminación se usan constantemente, así que la programación y la automatización se notan en la factura y en el confort diario. También suelen ser las instalaciones más simples en una casa existente.",
              "Después vienen cámaras, videoporteros y cerraduras inteligentes, porque cambian la forma de acceder y supervisar la propiedad.",
            ],
          },
          {
            heading: "Revisa el cableado antes de comprar",
            paragraphs: [
              "Muchos termostatos inteligentes requieren cable C, algunos interruptores requieren neutro en la caja, y las casas antiguas a menudo no tienen ninguno. Verificarlo antes de comprar evita devoluciones y retrabajos.",
              "La cobertura Wi-Fi importa igual: un dispositivo en el sótano o en un garaje separado puede necesitar conexión cableada o un punto de acceso, no un router más potente.",
            ],
          },
          {
            heading: "Mantén el sistema fácil de mantener",
            paragraphs: [
              "Elige dispositivos dentro de un mismo ecosistema cuando sea posible, documenta cuentas y nombres, y define qué pasa si se cae el internet o la energía.",
              "Los sensores de fuga de agua, humo y bajas temperaturas son económicos y suelen ser la mejora que evita la reparación más cara.",
            ],
          },
        ],
      },
    },
  },
];

export const publishedPosts = posts
  .filter((p) => p.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = (slug: string) => publishedPosts.find((p) => p.slug === slug);
