// =============================================================================
// MULTI V3 — la AI de ruta (motor de diálogo ligero).
//
// Mismo patrón que V2 (array de reglas, keywords normalizadas, mejor score
// gana) pero en dosis V3: la AI conversa, teletransporta («llévame a la
// radio») y suelta pistas de los hallazgos sin ponerse pesada.
// =============================================================================

import { MUNDOS, MUNDO_IDS, type HallazgoId, type MundoId } from "./content";

export interface RespuestaAI {
  texto: string;
  /** La AI puede pilotear por ti: viajar directo a un mundo… */
  viajar?: MundoId;
  /** …o llevar el deck a un slide del hub. */
  slide?: "portales" | "contacto";
}

interface ReglaAI {
  keywords: string[];
  respuesta: string | ((hallazgos: HallazgoId[]) => string);
  viajar?: MundoId;
  slide?: RespuestaAI["slide"];
}

const normaliza = (t: string): string =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const REGLAS: ReglaAI[] = [
  // --- Pilotaje por voz: "llévame a…" ---------------------------------------
  { keywords: ["koi", "matsuri", "festival", "linterna"], respuesta: "Rumbo al festival. Abrígate: allá siempre es de noche.", viajar: "koi" },
  { keywords: ["tebeo", "press", "imprenta", "comic", "sticker"], respuesta: "A la imprenta. Cuidado con la tinta fresca.", viajar: "tebeo" },
  { keywords: ["cinta", "radio", "musica", "cassette", "walkman"], respuesta: "Sintonizando Radio Cinta. La AI DJ ya sabe que vas.", viajar: "cinta" },
  { keywords: ["fusion", "denki", "sector", "電気", "nier"], respuesta: "Al sector 電気-OS. Ahí los instrumentos gritan, pero con elegancia.", viajar: "fusion" },
  { keywords: ["gaceta", "periodico", "noticia", "prensa"], respuesta: "A la redacción. Di que vas de mi parte y pregunta por la errata.", viajar: "gaceta" },

  // --- Recruiter-friendly ----------------------------------------------------
  {
    keywords: ["contacto", "cv", "curricul", "reclut", "trabajo", "correo", "email", "mail", "linkedin", "github", "quien eres", "quien es", "marcelo", "contratar"],
    respuesta: "Para eso no hay que viajar: te llevo a la carta de contacto del hub. Ahí vive el humano, con links que sí se pueden copiar.",
    slide: "contacto",
  },

  // --- Meta ------------------------------------------------------------------
  {
    keywords: ["mundo", "portal", "destino", "viajar", "donde", "adonde", "mapa"],
    respuesta: `Hay ${MUNDO_IDS.length} portales en la carta: ${MUNDO_IDS.map((m) => MUNDOS[m].nombre).join(", ")}. También puedes decirme «llévame a la radio» y piloteo yo.`,
    slide: "portales",
  },
  {
    keywords: ["como esta hecho", "como se hizo", "react", "token", "repo", "storybook", "design system", "css", "scss", "familia"],
    respuesta: "Una sola aplicación: tokens → primitivos headless → familias que visten. Cada mundo es otra piel del mismo esqueleto; el warp que ves entre medio es el pipeline real del repo, en versión exprés.",
  },
  {
    keywords: ["fuente", "tipograf", "letra", "serif", "fraunces"],
    respuesta: "Buen ojo: el título del hub es Fraunces, la PRIMERA serif de todo el sistema — con ejes de torcedura y todo. La consola habla Spline Sans Mono. Diez familias tipográficas nos tomó atrevernos a una serif.",
  },
  {
    keywords: ["secreto", "hallazgo", "logro", "easter", "oculto"],
    respuesta: (h) =>
      h.length >= 4
        ? "Los encontraste todos. Oficialmente no me quedan misterios; extraoficialmente, siempre queda uno."
        : `Hay cuatro hallazgos opcionales repartidos por el multiverso — llevas ${h.length}. Pista general: toca lo que parezca decorativo.`,
  },

  // --- Cortesías --------------------------------------------------------------
  { keywords: ["hola", "buenas", "hey", "saludos"], respuesta: "Hola. Soy la AI de ruta del multiverso: pídeme un destino («llévame al festival»), pregúntame cómo está hecho esto, o di «contacto» si vienes de reclutar." },
  { keywords: ["gracias", "genial", "increible", "wow"], respuesta: "Registrado con una satisfacción que mi spec dice que no siento." },
  { keywords: ["ayuda", "help", "pista", "que hago"], respuesta: "Fácil: flechas ← → para moverte por el deck, «Viajar» en cualquier portal, y dentro de un mundo la consola te trae de vuelta. Lo demás es curiosidad." },
];

export function responder(texto: string, hallazgos: HallazgoId[]): RespuestaAI {
  const entrada = normaliza(texto);

  let mejor: { regla: ReglaAI; score: number } | null = null;
  for (const regla of REGLAS) {
    const score = regla.keywords.filter((k) => entrada.includes(k)).length;
    if (score > 0 && (!mejor || score > mejor.score)) mejor = { regla, score };
  }

  if (mejor) {
    const { regla } = mejor;
    return {
      texto: typeof regla.respuesta === "function" ? regla.respuesta(hallazgos) : regla.respuesta,
      ...(regla.viajar ? { viajar: regla.viajar } : {}),
      ...(regla.slide ? { slide: regla.slide } : {}),
    };
  }

  return {
    texto:
      "Eso no está en mi carta de navegación. Prueba con un destino («llévame a la gaceta»), «cómo está hecho», o «contacto».",
  };
}
