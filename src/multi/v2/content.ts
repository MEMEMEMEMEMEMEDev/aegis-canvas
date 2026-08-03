// =============================================================================
// MULTI V2 — contenido puro del juego (cero JSX, cero estado).
//
// Todo lo que el multiverso "sabe" vive aquí: los mundos y sus códigos de
// salto, los sistemas de la nave, el registro de hallazgos, el pipeline
// real del repo y el mapeo tecla→token de los combos. Cambiar el juego
// debería ser (casi siempre) cambiar este archivo.
// =============================================================================

export type MundoId = "cinta" | "fusion" | "gaceta";
export type SistemaId = "reactor" | "escudos" | "carta";

export type LogroId =
  | "primer-contacto"
  | "nave-encendida"
  | "senal-cinta"
  | "senal-fusion"
  | "senal-gaceta"
  | "salto-cinta"
  | "salto-fusion"
  | "salto-gaceta"
  | "canal-directo"
  | "manos-en-el-casco"
  | "frecuencia-fantasma"
  | "dj-a-bordo";

// --- Mundos: cada señal empieza sin identificar --------------------------

export interface DestinoInfo {
  nombre: string;
  sub: string;
  desc: string;
  combo: string[];
  /** Lo que muestra la carta estelar ANTES de descubrir la señal. */
  senal: string;
  /** La pista impresa en la tarjeta bloqueada (cómo se descubre). */
  comoSeDescubre: string;
}

export const MUNDOS: Record<MundoId, DestinoInfo> = {
  cinta: {
    nombre: "Radio Cinta",
    sub: "FM 88.8 — música",
    desc: "Walkman del multiverso. Aquí se enchufa la AI generadora de música: pides una pista y aparece una cinta nueva.",
    combo: ["▶", "A", "▶"],
    senal: "Señal 01 — transmisión analógica",
    comoSeDescubre: "Emite en banda FM. Sintonízala en el radiotelescopio de abajo.",
  },
  fusion: {
    nombre: "Sector 電気-OS",
    sub: "Domo × Denki",
    desc: "NieR pero expresivo: instrumentos DOMO vestidos con la paleta DENKI. Mismo contrato de tokens, otra piel.",
    combo: ["←", "↓", "→", "◆"],
    senal: "Señal 02 — cifrado semántico",
    comoSeDescubre: "Esta señal solo responde a lenguaje. Pregúntale a la AI de vuelo por ella.",
  },
  gaceta: {
    nombre: "La Gaceta Estelar",
    sub: "Tebeo × Telar",
    desc: "Periódico interestelar: titulares que gritan, columnas de papel y un teletipo andino insertado entre avisos.",
    combo: ["✦", "↑", "✦"],
    senal: "Señal 03 — tinta y papel",
    comoSeDescubre: "Su rumbo viaja escondido en una errata. Hay un recorte interceptado en la sala de máquinas.",
  },
};

export const MUNDO_IDS: MundoId[] = ["cinta", "fusion", "gaceta"];

// --- Sistemas de la nave (onboarding: se encienden EN ORDEN) --------------

export interface SistemaInfo {
  nombre: string;
  /** Lo que dice la AI cuando este sistema es el siguiente por encender. */
  voz: string;
}

export const SISTEMAS: Array<[SistemaId, SistemaInfo]> = [
  [
    "reactor",
    {
      nombre: "Reactor de tipos",
      voz: "Sistemas fríos. Hay energía auxiliar para una cosa: enciende el reactor.",
    },
  ],
  [
    "escudos",
    {
      nombre: "Escudos de estilo",
      voz: "Reactor en línea — ya te veo. Ahora levanta los escudos, el espacio raya la pintura.",
    },
  ],
  [
    "carta",
    {
      nombre: "Carta estelar",
      voz: "Escudos arriba. Último paso: despliega la carta estelar y te muestro qué hay ahí afuera.",
    },
  ],
];

export const VOZ_NAVE_LISTA =
  "Todos los sistemas nominales. Bienvenido a bordo del AEGIS: soy la AI de vuelo. Detecto tres señales sin identificar en la carta — descúbrelas y te llevo. Si te pierdes, pregúntame lo que sea.";

// --- Registro de descubrimientos ------------------------------------------

export interface LogroInfo {
  titulo: string;
  /** Los secretos se listan como "???" hasta ganarlos. */
  secreto?: boolean;
}

export const LOGROS: Array<[LogroId, LogroInfo]> = [
  ["nave-encendida", { titulo: "Nave encendida" }],
  ["primer-contacto", { titulo: "Primer contacto con la AI" }],
  ["senal-cinta", { titulo: "Señal 01 identificada" }],
  ["senal-fusion", { titulo: "Señal 02 identificada" }],
  ["senal-gaceta", { titulo: "Señal 03 identificada" }],
  ["salto-cinta", { titulo: "Salto a Radio Cinta" }],
  ["salto-fusion", { titulo: "Salto al Sector 電気-OS" }],
  ["salto-gaceta", { titulo: "Salto a la Gaceta Estelar" }],
  ["canal-directo", { titulo: "Cubierta de registros hallada" }],
  ["manos-en-el-casco", { titulo: "Manos en el casco", secreto: true }],
  ["frecuencia-fantasma", { titulo: "Frecuencia fantasma", secreto: true }],
  ["dj-a-bordo", { titulo: "DJ a bordo", secreto: true }],
];

// --- Viajar = deployar: el pipeline CI/CD real del repo -------------------

export const PIPELINE: Array<[string, string]> = [
  ["Reactor de tipos", "npm run typecheck"],
  ["Escudos de estilo", "sass --check src/families"],
  ["Hangar de vistas", "npm run build-storybook"],
  ["Telemetría", "a11y + revisión visual"],
  ["Salto de órbita", "deploy → mundo destino"],
];

// --- Combos: mapeo token → teclas físicas ----------------------------------
// Se resuelve SIEMPRE contra la secuencia activa (▶ y ◆ comparten Enter,
// pero nunca conviven en un mismo código de salto).

export const TECLAS: Record<string, string[]> = {
  "←": ["ArrowLeft"],
  "↓": ["ArrowDown"],
  "→": ["ArrowRight"],
  "↑": ["ArrowUp"],
  "▶": ["Enter", " "],
  "◆": ["Enter", " "],
  A: ["a", "A"],
  "✦": ["x", "X"],
};

/** Rótulo de la tecla física para imprimir en el pad ("↑ (flecha)", "✦ (X)"). */
export const TECLA_HINT: Record<string, string> = {
  "←": "←",
  "↓": "↓",
  "→": "→",
  "↑": "↑",
  "▶": "Enter",
  "◆": "Enter",
  A: "A",
  "✦": "X",
};

// --- Radiotelescopio (desbloqueo de CINTA) ---------------------------------

export const FM_MIN = 87.0;
export const FM_MAX = 108.0;
export const FM_PASO = 0.1;
export const FM_PASO_GRUESO = 1.0;
export const FM_INICIO = 98.0;
export const FM_OBJETIVO = 88.8;
export const FM_FANTASMA = 107.9; // easter egg: nadie emite ahí… ¿o sí?

// --- La errata (desbloqueo de GACETA) --------------------------------------
// Un recorte interceptado con tres palabras marcadas: dos señuelos y la
// errata real ("SEIS familias" — son siete, la Gaceta nunca cuenta bien).

export interface PalabraRecorte {
  texto: string;
  correcta?: boolean;
  /** Lo que comenta la AI si eliges este señuelo. */
  burla?: string;
}

export const RECORTE: { antes: string; palabras: PalabraRecorte[]; despues: string } = {
  antes:
    "SISTEMA AEGIS — Testigos aseguran que un extraño PORTAL une mundos que no se parecen en nada. La redacción confirma que",
  palabras: [
    {
      texto: "PORTAL",
      burla: "El portal existe, lo estás usando. Eso no es una errata, es periodismo.",
    },
    {
      texto: "SEIS",
      correcta: true,
    },
    {
      texto: "CÓDIGO",
      burla: "El código es real — de hecho es lo único verdadero de todo el recorte.",
    },
  ],
  despues:
    "familias sostienen el multiverso, y que su CÓDIGO de salto viaja impreso en cada edición.",
};

export const ERRATA_REVELACION =
  "Exacto: no son seis, son SIETE familias — la Gaceta nunca cuenta bien. Errata confirmada. Rumbo a la Gaceta Estelar desbloqueado.";

// --- Cubierta de registros (blog / expediente / comunicaciones) ------------

export interface EntradaBitacora {
  fecha: string;
  titulo: string;
  resumen: string;
}

export const BITACORA: EntradaBitacora[] = [
  {
    fecha: "2026.07",
    titulo: "El multiverso como juego",
    resumen:
      "Multi V2: la nave arranca apagada, los mundos son señales sin identificar y los códigos de salto se ejecutan de verdad. Descubrir > navegar.",
  },
  {
    fecha: "2026.07",
    titulo: "Viajar es deployar",
    resumen:
      "La pantalla de carga entre mundos es el pipeline CI/CD real del repo: typecheck, estilos, storybook, deploy. Documentación viva disfrazada de warp.",
  },
  {
    fecha: "2026.07",
    titulo: "Cómo nace una familia",
    resumen:
      "refs/ → incubadora proto/ → bautizo. Cada familia emite su propio contrato de variables CSS y por eso ningún mundo se parece a otro.",
  },
  {
    fecha: "2026.06",
    titulo: "Headless primero",
    resumen:
      "El comportamiento vive en behaviors/ y las familias solo visten. Requisito de diseño: que una AI pueda operar la UI igual que una persona.",
  },
];

export const CONTACTO = {
  email: "marccelohuenchupan@gmail.com",
  github: "https://github.com/", // TODO(usuario): completar usuario real
  linkedin: "https://www.linkedin.com/", // TODO(usuario): completar perfil real
};

export const EXPEDIENTE = {
  nombre: "Marcelo Huenchupan",
  rol: "Front-end / design systems",
  bio: "Construyo @ahroi/foundation: un design system donde cada familia visual es un mundo con voz propia — tokens, primitivos headless y pieles que se retematizan por CSS custom properties. Este multiverso es el portafolio, y también la demo.",
  stack: [
    ["React", "19"],
    ["TypeScript", "strict"],
    ["Sass", "SCSS"],
    ["Storybook", "10"],
  ] as Array<[string, string]>,
};
