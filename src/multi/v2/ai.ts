// =============================================================================
// MULTI V2 — la AI de vuelo (motor de diálogo).
//
// Nada de if-chains: un array ordenado de reglas con keywords normalizadas
// (minúsculas, sin acentos). La regla con más keywords matcheadas gana; en
// empate gana la primera del array. Una regla puede, además de responder,
// disparar una acción del juego (descubrir un mundo) o un efecto de UI
// (abrir la Cubierta). Sin match → pista rotativa contextual a lo que falta.
// =============================================================================

import { MUNDOS, MUNDO_IDS, type MundoId } from "./content";
import { tiene, type Accion, type GameState } from "./state";

export interface RespuestaAI {
  texto: string;
  accion?: Accion;
  ui?: "abrir-cubierta";
}

interface ReglaAI {
  id: string;
  /** Ya normalizadas: minúsculas, sin acentos. Substring match. */
  keywords: string[];
  respuesta: string | ((s: GameState) => string);
  accion?: Accion | ((s: GameState) => Accion | undefined);
  ui?: RespuestaAI["ui"];
  activa?: (s: GameState) => boolean;
}

const normaliza = (t: string): string =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const faltanSenales = (s: GameState): MundoId[] =>
  MUNDO_IDS.filter((m) => !s.descubiertos.includes(m));

const REGLAS: ReglaAI[] = [
  // --- Desbloqueo de FUSIÓN: la señal que "solo responde a lenguaje" ------
  {
    id: "descubrir-fusion",
    keywords: ["fusion", "denki", "domo", "sector", "electric", "cifrad", "senal 2", "senal 02", "電気"],
    activa: (s) => !s.descubiertos.includes("fusion"),
    respuesta:
      "Cifrado semántico resuelto: la Señal 02 es el Sector 電気-OS — instrumentos DOMO con sangre DENKI. Te dejo el código de salto en la carta estelar. Bien preguntado.",
    accion: { type: "descubrir", mundo: "fusion" },
  },
  {
    id: "fusion-ya",
    keywords: ["fusion", "denki", "sector", "電気"],
    activa: (s) => s.descubiertos.includes("fusion"),
    respuesta: (s) =>
      s.desbloqueados.includes("fusion")
        ? "El Sector 電気-OS ya está en tu bitácora de saltos: viaja desde la consola cuando quieras."
        : "Ya identificaste el Sector 電気-OS. Ahora ejecuta su código de salto en la carta estelar — el hipermotor no acepta atajos.",
  },

  // --- Pistas dirigidas por mundo ------------------------------------------
  {
    id: "pista-cinta",
    keywords: ["cinta", "radio", "music", "cancion", "frecuencia", "fm", "88", "walkman", "senal 1", "senal 01"],
    activa: (s) => !s.descubiertos.includes("cinta"),
    respuesta:
      "Esa señal es analógica, vieja escuela: no se pregunta, se SINTONIZA. Usa el radiotelescopio del puente y barre la banda de los 88.",
  },
  {
    id: "pista-gaceta",
    keywords: ["gaceta", "periodico", "noticia", "prensa", "errata", "papel", "tinta", "senal 3", "senal 03"],
    activa: (s) => !s.descubiertos.includes("gaceta"),
    respuesta:
      "La Gaceta esconde su rumbo en una ERRATA. Interceptamos un recorte de prensa — está clavado en la sala de máquinas. Lee con lupa: solo una palabra miente.",
  },

  // --- Recruiter-friendly: canal directo a la Cubierta ----------------------
  {
    id: "cubierta",
    keywords: ["contacto", "cv", "curricul", "reclut", "trabajo", "correo", "email", "mail", "linkedin", "github", "blog", "quien eres", "quien es", "marcelo", "portafolio", "contratar"],
    respuesta:
      "Para eso no hace falta viajar: abriendo canal directo a la Cubierta de registros — bitácora, expediente y comunicaciones. Un humano normal vive ahí dentro.",
    accion: (s) => (tiene(s, "canal-directo") ? undefined : { type: "logro", id: "canal-directo" }),
    ui: "abrir-cubierta",
  },

  // --- Meta: cómo está hecho esto -------------------------------------------
  {
    id: "meta",
    keywords: ["como esta hecho", "como se hizo", "react", "token", "repo", "codigo fuente", "storybook", "design system", "css", "scss"],
    respuesta:
      "Todo sale de @ahroi/foundation: tokens → primitivos headless → familias que solo visten. Cada mundo es el mismo esqueleto con otro contrato de variables. La sala de máquinas de abajo documenta el pipeline real.",
  },
  {
    id: "nave",
    keywords: ["nave", "aegis", "barco", "puente"],
    respuesta:
      "El AEGIS es este repositorio con motores: viajar ejecuta su pipeline CI/CD de verdad — typecheck, estilos, vistas, deploy. Si el reactor de tipos falla, no hay salto. Así de honesta es la física aquí.",
  },
  {
    id: "mundos",
    keywords: ["mundo", "destino", "viajar", "donde", "adonde", "que hay", "mapa", "carta"],
    respuesta: (s) => {
      const faltan = faltanSenales(s);
      if (faltan.length === 0)
        return "Las tres señales están identificadas. Ejecuta sus códigos en la carta estelar — o viaja desde la consola a los mundos ya desbloqueados.";
      return `Hay ${faltan.length === 3 ? "tres señales" : `${faltan.length} señal${faltan.length > 1 ? "es" : ""}`} sin identificar en la carta. Cada una se descubre distinto: mira la pista impresa en su tarjeta.`;
    },
  },

  // --- Secretos: la AI insinúa, no revela ------------------------------------
  {
    id: "secretos",
    keywords: ["secreto", "logro", "easter", "oculto", "hallazgo", "descubrimiento"],
    respuesta:
      "El registro de la consola cuenta hasta doce hallazgos y algunos no están en ningún manual. Consejo de AI: las manos curiosas encuentran cosas. El casco, por ejemplo, es sensible.",
  },

  // --- Cortesías --------------------------------------------------------------
  {
    id: "saludo",
    keywords: ["hola", "buenas", "hey", "saludos", "que tal"],
    respuesta:
      "Hola, tripulante. Soy la AI de vuelo del AEGIS. Pregúntame por las señales, por la nave, o dime «contacto» si vienes de reclutar — también sé abrir puertas aburridas.",
  },
  {
    id: "gracias",
    keywords: ["gracias", "genial", "increible", "wow"],
    respuesta: "Anotado en el registro de vuelo con una carita feliz que oficialmente no tengo.",
  },
  {
    id: "ayuda",
    keywords: ["ayuda", "help", "pista", "que hago", "como sigo", "atascado", "no se"],
    respuesta: (s) => pistaRotativa(s),
    accion: { type: "avanzar-pista" },
  },
];

// --- Pistas rotativas (fallback): priorizan lo que falta ---------------------

function poolDePistas(s: GameState): string[] {
  const faltan = faltanSenales(s);
  const pool: string[] = [];

  for (const m of faltan) {
    if (m === "cinta")
      pool.push("La Señal 01 no habla: canta. El radiotelescopio del puente barre la banda FM.");
    if (m === "fusion")
      pool.push("La Señal 02 es quisquillosa: solo responde a lenguaje. Pregúntame por ella con sus palabras.");
    if (m === "gaceta")
      pool.push("La Señal 03 dejó huella en papel: hay un recorte interceptado en la sala de máquinas, y una de sus palabras miente.");
  }

  const porSaltar = s.descubiertos.filter((m) => !s.desbloqueados.includes(m));
  if (porSaltar.length > 0) {
    const primero = porSaltar[0];
    if (primero)
      pool.push(
        `Tienes el código de ${MUNDOS[primero].nombre} identificado pero sin ejecutar. Ármalo en la carta estelar y pulsa la secuencia — el hipermotor adora el ritmo.`,
      );
  }

  if (!tiene(s, "canal-directo"))
    pool.push("Dato de a bordo: si buscas al humano detrás de esto, dime «contacto» y te abro la Cubierta de registros.");

  if (pool.length === 0)
    pool.push(
      "Ya viste todo lo cartografiado… lo cartografiado. El registro dice que aún quedan hallazgos sin marcar. Toca cosas.",
      "Órbita estable, café frío, cero emergencias. Buen momento para releer la bitácora en la Cubierta.",
    );

  return pool;
}

function pistaRotativa(s: GameState): string {
  const pool = poolDePistas(s);
  return pool[s.pistaIdx % pool.length] ?? pool[0] ?? "Sistemas nominales.";
}

// --- El punto de entrada ------------------------------------------------------

export function responder(texto: string, s: GameState): RespuestaAI {
  const entrada = normaliza(texto);

  let mejor: { regla: ReglaAI; score: number } | null = null;
  for (const regla of REGLAS) {
    if (regla.activa && !regla.activa(s)) continue;
    const score = regla.keywords.filter((k) => entrada.includes(k)).length;
    if (score > 0 && (!mejor || score > mejor.score)) mejor = { regla, score };
  }

  if (mejor) {
    const { regla } = mejor;
    const accion = typeof regla.accion === "function" ? regla.accion(s) : regla.accion;
    return {
      texto: typeof regla.respuesta === "function" ? regla.respuesta(s) : regla.respuesta,
      ...(accion ? { accion } : {}),
      ...(regla.ui ? { ui: regla.ui } : {}),
    };
  }

  // Sin match: no entendí, pero te dejo una pista útil (y roto la rueda).
  return {
    texto: `No decodifiqué eso — mi traductor cubre 6.000 idiomas y ninguno era este. Pista de cortesía: ${pistaRotativa(s)}`,
    accion: { type: "avanzar-pista" },
  };
}
