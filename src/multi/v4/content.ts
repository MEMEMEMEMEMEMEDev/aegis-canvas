// =============================================================================
// MULTI V4 — contenido puro (cero JSX, cero estado).
//
// El giro de V4: los "mundos" dejan de ser el contenido y pasan a ser
// EXHIBICIONES; el contenido son CASOS DE ESTUDIO REALES (problema → proceso
// → resultado), contados como los cuenta un portafolio UX. Todo lo que se
// afirma aquí es verificable en los repos.
// =============================================================================

export type CasoId = "foundation" | "portafolio" | "aegis";

export interface Caso {
  id: CasoId;
  /** Rótulo mono de la esquirla (categoría). */
  eyebrow: string;
  /** Título con gancho — la promesa, no el nombre técnico. */
  titulo: string;
  /** Nombre real del proyecto. */
  proyecto: string;
  problema: string;
  proceso: string[];
  resultado: string[];
  stack: string[];
  metricas: Array<{ valor: string; label: string }>;
  /** Arte de la esquirla: gradiente propio (sin material de terceros). */
  arte: string;
}

export const CASOS: Caso[] = [
  {
    id: "foundation",
    eyebrow: "design system",
    titulo: "Nueve pieles, un solo contrato",
    proyecto: "@ahroi/foundation (aegis-canvas)",
    problema:
      "Un portafolio de front tiene que demostrar sistemas, no pantallas sueltas. ¿Cómo pruebas que un mismo contrato de componentes aguanta estéticas radicalmente distintas sin re-resolver accesibilidad cada vez?",
    proceso: [
      "Tokens primitivos en SCSS → contrato semántico --ds-* compartido por todos los temas.",
      "Primitivos headless: estado, teclado, ARIA y foco se resuelven UNA vez, sin opinión visual.",
      "Cada familia es una isla scoped (--tebeo-*, --koi-*, --obsi-*…) que solo VISTE los núcleos.",
      "Las familias nacen de referencias visuales traducidas a reglas mecánicas: paleta, bordes, radios, tipografías firma.",
    ],
    resultado: [
      "Nueve familias visuales conviviendo en un mismo documento sin romperse entre sí.",
      "Retematizar = redefinir variables en un wrapper (así existe la fusión Domo×Denki).",
      "Fuentes 100% self-hosted con licencia viajando junto al archivo.",
    ],
    stack: ["TypeScript", "React", "SCSS", "Storybook"],
    metricas: [
      { valor: "9", label: "familias" },
      { valor: "1", label: "contrato --ds-*" },
      { valor: "0", label: "CDNs de fuentes" },
    ],
    arte: "radial-gradient(120% 90% at 20% 10%, #35b6ff 0%, #14406b 45%, #10141b 100%)",
  },
  {
    id: "portafolio",
    eyebrow: "astro + seo",
    titulo: "El sitio que Google sí ve",
    proyecto: "portafolio.aaroidev.com",
    problema:
      "La versión anterior era una SPA de webpack: servía un <div> vacío y montaba todo con JS. Un buscador que no ejecuta JavaScript no veía nada — y un portafolio invisible no existe.",
    proceso: [
      "Migración a Astro: el HTML llega renderizado desde el build, React solo donde hay estado.",
      "De 36 componentes del design system usados, 31 no mandan un byte de JS al navegador.",
      "Proyectos y artículos como Content Collections con schema Zod: si falta la meta description, el build FALLA.",
      "nginx con 404 reales — se acabó el soft-404 de SPA que penaliza Google.",
    ],
    resultado: [
      "Cada proyecto y artículo tiene URL propia indexable, con JSON-LD, sitemap y RSS.",
      "Solo dos scripts inline (~15 líneas) fuera de las islas de hidratación.",
      "El design system se consume del repo git pinneado a un tag, no vendoreado.",
    ],
    stack: ["Astro", "React islands", "Zod", "nginx"],
    metricas: [
      { valor: "31/36", label: "componentes sin JS" },
      { valor: "160", label: "chars de summary, máx." },
      { valor: "404", label: "de verdad" },
    ],
    arte: "radial-gradient(120% 90% at 80% 20%, #7ae2c3 0%, #1c5a52 50%, #10141b 100%)",
  },
  {
    id: "aegis",
    eyebrow: "gitops",
    titulo: "Push a main y a producción",
    proyecto: "aegis v2 (plataforma propia)",
    problema:
      "Desplegar sin manos y sin confiar en imágenes anónimas — en un clúster Kubernetes propio, con los estándares de un entorno serio: sin root, sin privilegios, sin kubectl artesanal.",
    proceso: [
      "Jenkins compila; kaniko empaqueta sin privilegios; Trivy BLOQUEA si hay CVE con fix disponible.",
      "cosign firma cada imagen por digest y Kyverno rechaza en admisión cualquier imagen sin firmar.",
      "Image Updater escribe el digest nuevo en el overlay y ArgoCD sincroniza — GitOps puro.",
      "Anti-loop: los commits de write-back se detectan por archivos tocados y no re-disparan el build.",
    ],
    resultado: [
      "El ciclo completo push → build → firma → verificación → deploy corre solo.",
      "Rollback = git revert del commit del overlay. Auditable por diseño.",
      "Pod Security Standards en restricted: todo corre sin root.",
    ],
    stack: ["Kubernetes", "Jenkins", "ArgoCD", "Kyverno", "cosign", "Trivy"],
    metricas: [
      { valor: "0", label: "kubectl a mano" },
      { valor: "100%", label: "imágenes firmadas" },
      { valor: "1", label: "git revert = rollback" },
    ],
    arte: "radial-gradient(120% 90% at 40% 80%, #e0316e 0%, #5a1c3c 50%, #10141b 100%)",
  },
];

// --- Las pieles (el multiverso, ahora como sala de exhibición) --------------

export interface Piel {
  nombre: string;
  concepto: string;
  /** Color firma para el chip (el mini-contrato de cada familia). */
  color: string;
  /** Tinta legible sobre el color firma. */
  tinta: string;
}

export const PIELES: Piel[] = [
  { nombre: "MESOSOICOS", concepto: "estratos geológicos", color: "#c9a227", tinta: "#17130a" },
  { nombre: "TEBEO", concepto: "sticker/cómic", color: "#f5d90a", tinta: "#191305" },
  { nombre: "KOI", concepto: "festival nocturno", color: "#e84a3a", tinta: "#fff6ee" },
  { nombre: "TELAR", concepto: "neo-andino digital", color: "#e0316e", tinta: "#fdeef4" },
  { nombre: "DOMO", concepto: "panel doméstico", color: "#dfe8dc", tinta: "#1c211a" },
  { nombre: "DENKI", concepto: "póster retro-industrial", color: "#d43d2a", tinta: "#f6ead8" },
  { nombre: "CINTA", concepto: "cassette-futurismo", color: "#f2a33c", tinta: "#1a1206" },
  { nombre: "OBSIDIANA", concepto: "galería de esquirlas", color: "#35b6ff", tinta: "#0a1017" },
];

// --- Identidad y contacto ----------------------------------------------------

export const PERFIL = {
  nombre: "Marcelo Huenchupan",
  rol: "Front-end · Design systems",
  claim: "Construyo sistemas que cambian de piel sin romperse.",
  bio: "Del token al deploy: un design system multi-estilo, un sitio que renderiza en build y una plataforma GitOps casera que firma lo que publica. Este portafolio corre sobre los tres.",
  email: "marccelohuenchupan@gmail.com",
  github: "https://github.com/", // TODO(usuario): completar usuario real
  linkedin: "https://www.linkedin.com/", // TODO(usuario): completar perfil real
  sitio: "https://portafolio.aaroidev.com",
};
