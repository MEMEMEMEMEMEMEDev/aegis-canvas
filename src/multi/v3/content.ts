// =============================================================================
// MULTI V3 — contenido puro (cero JSX, cero estado).
//
// V3 = la entrada simple de DomoV2 (hub claro + deck + ventanas de navegador
// falsas) + el pilotaje de V1/V2 (pipeline, consola, AI con reglas) + mundos
// de página larga con parallax. Cinco mundos, juego LIGERO: los hallazgos
// son opcionales y nada bloquea.
// =============================================================================

export type MundoId = "koi" | "tebeo" | "cinta" | "fusion" | "gaceta";

export interface PortalInfo {
  nombre: string;
  url: string;
  familia: string;
  desc: string;
  /** Corte del DomoCut en la tarjeta del portal. */
  cut: "chamfer" | "blade" | "notch";
}

export const MUNDOS: Record<MundoId, PortalInfo> = {
  koi: {
    nombre: "Koi Matsuri",
    url: "https://koi-matsuri.jp",
    familia: "Koi",
    desc: "Festival nocturno: vidrio esmerilado, linternas que suben y un torii que se queda atrás cuando bajas.",
    cut: "blade",
  },
  tebeo: {
    nombre: "Tebeo Press",
    url: "https://tebeo.press",
    familia: "Tebeo",
    desc: "Imprenta neo-retro: papel crema, tinta gorda, stickers girando y titulares que entran empujando.",
    cut: "notch",
  },
  cinta: {
    nombre: "Radio Cinta",
    url: "https://radio-cinta.fm",
    familia: "Cinta",
    desc: "El walkman del multiverso: cassettes, ecualizador vivo y una AI DJ a la que puedes encargarle pistas.",
    cut: "chamfer",
  },
  fusion: {
    nombre: "Sector 電気-OS",
    url: "https://denki-os.jp",
    familia: "Domo × Denki",
    desc: "NieR expresivo: instrumentos DOMO con sangre DENKI. Mismo contrato de tokens, otra piel.",
    cut: "blade",
  },
  gaceta: {
    nombre: "La Gaceta Estelar",
    url: "https://gaceta.estelar",
    familia: "Tebeo × Telar",
    desc: "Periódico interestelar de página larga: columnas de papel, teletipo andino y una errata histórica.",
    cut: "notch",
  },
};

export const MUNDO_IDS: MundoId[] = ["koi", "tebeo", "cinta", "fusion", "gaceta"];

// --- Viajar = deployar (versión exprés: el warp de V3 dura ~1.3s) ----------

export const PIPELINE: Array<[string, string]> = [
  ["Tipos", "tsc"],
  ["Estilos", "sass"],
  ["Vistas", "storybook"],
  ["Telemetría", "a11y"],
  ["Salto", "deploy"],
];

// --- Hallazgos opcionales (juego ligero: nada bloquea) ----------------------

export type HallazgoId = "wonk" | "sello-koi" | "dj-a-bordo" | "errata";

export const HALLAZGOS: Array<[HallazgoId, string]> = [
  ["wonk", "El punto serif"],
  ["sello-koi", "Sello del festival"],
  ["dj-a-bordo", "DJ a bordo"],
  ["errata", "La errata eterna"],
];

// --- Contacto (la parte recruiter-friendly vive en el propio deck) ----------

export const CONTACTO = {
  email: "marccelohuenchupan@gmail.com",
  github: "https://github.com/", // TODO(usuario): completar usuario real
  linkedin: "https://www.linkedin.com/", // TODO(usuario): completar perfil real
};

export const EXPEDIENTE = {
  nombre: "Marcelo Huenchupan",
  rol: "Front-end / design systems",
  bio: "Cinco mundos, cinco pieles, una sola aplicación: @ahroi/foundation. Tokens → primitivos headless → familias que solo visten. Este multiverso es el portafolio y también la demo.",
};
