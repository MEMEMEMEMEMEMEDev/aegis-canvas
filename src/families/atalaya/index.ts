// =============================================================================
// Familia ATALAYA — set "consola de operación": la piel neutra del producto.
//   import { AtalayaEstado } from "@ahroi/foundation/atalaya";
//
// Es la primera familia de este repo que NO busca una estética. Las otras
// visten un portafolio y compiten por ser recordadas; ésta viste un tablero
// que alguien mira a las tres de la mañana para saber si algo se cayó. El
// mérito acá es que no se note.
//
// DOS LEYES, y las dos tienen un porqué medido detrás:
//
//   1. El acento NUNCA significa estado, y ningún estado usa el acento.
//      Un tablero donde el color de "clic acá" convive con el de "esto está
//      bien" enseña a leer el color como decoración.
//
//   2. El cuarto estado no tiene color. «No pude mirar» se dibuja con TRAMA
//      sobre el neutro apagado, porque casi ninguna herramienta tiene esa
//      salida y por eso termina disfrazada de verde — y nadie investiga un
//      verde.
//
// Los componentes viven dentro de un contenedor .atalaya-scope (emite el
// mini-contrato --atalaya-*); .atalaya-scope--oscuro retiñe los mismos
// tokens. Todos son controlables por props, sin estado propio: es el
// requisito para que un agente opere la UI igual que una persona.
// =============================================================================

export { default as AtalayaEstado } from "./AtalayaEstado/AtalayaEstado";
export type { AtalayaEstadoProps, AtalayaEstadoTipo } from "./AtalayaEstado/AtalayaEstado";

export { default as AtalayaPanel } from "./AtalayaPanel/AtalayaPanel";
export type { AtalayaPanelProps } from "./AtalayaPanel/AtalayaPanel";

export { default as AtalayaFila } from "./AtalayaFila/AtalayaFila";
export type { AtalayaFilaProps } from "./AtalayaFila/AtalayaFila";

export { default as AtalayaBoton } from "./AtalayaBoton/AtalayaBoton";
export type { AtalayaBotonProps } from "./AtalayaBoton/AtalayaBoton";

export { default as AtalayaPestanas } from "./AtalayaPestanas/AtalayaPestanas";
export type { AtalayaPestanasProps, AtalayaPestana } from "./AtalayaPestanas/AtalayaPestanas";

export { default as AtalayaMetrica } from "./AtalayaMetrica/AtalayaMetrica";
export type { AtalayaMetricaProps } from "./AtalayaMetrica/AtalayaMetrica";

export { default as AtalayaChispa } from "./AtalayaChispa/AtalayaChispa";
export type { AtalayaChispaProps } from "./AtalayaChispa/AtalayaChispa";

export { default as AtalayaBarra } from "./AtalayaBarra/AtalayaBarra";
export type { AtalayaBarraProps } from "./AtalayaBarra/AtalayaBarra";

export { default as AtalayaCampo } from "./AtalayaCampo/AtalayaCampo";
export type { AtalayaCampoProps } from "./AtalayaCampo/AtalayaCampo";

export { default as AtalayaVacio } from "./AtalayaVacio/AtalayaVacio";
export type { AtalayaVacioProps } from "./AtalayaVacio/AtalayaVacio";
