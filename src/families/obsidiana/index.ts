// =============================================================================
// Familia OBSIDIANA — galería de esquirlas: la vitrina oscura del portafolio
// (carbón azulado, un solo acento cian, todo corta en diagonal). Nace para el
// ESQUELETO del hub: navegación visible, jerarquía convencional; la rareza es
// superficie, nunca estructura.
// Display/UI: Space Grotesk · Ficha técnica: Spline Sans Mono (self-hosted, OFL).
//   import { ObsiMuro, ObsiEsquirla } from "@ahroi/foundation/obsidiana";
//
// IMPORTANTE: los componentes viven dentro de .obsidiana-scope (isla
// oscura-fría que emite el mini-contrato --obsi-*).
// =============================================================================
export { default as ObsiNav } from "./ObsiNav/ObsiNav";
export type { ObsiNavProps, ObsiNavLink } from "./ObsiNav/ObsiNav";
export { default as ObsiBoton } from "./ObsiBoton/ObsiBoton";
export type { ObsiBotonProps } from "./ObsiBoton/ObsiBoton";
export { default as ObsiMuro, ObsiEsquirla } from "./ObsiMuro/ObsiMuro";
export type { ObsiMuroProps, ObsiEsquirlaProps } from "./ObsiMuro/ObsiMuro";
export { default as ObsiPlaca } from "./ObsiPlaca/ObsiPlaca";
export type { ObsiPlacaProps } from "./ObsiPlaca/ObsiPlaca";
export { default as ObsiAnillo } from "./ObsiAnillo/ObsiAnillo";
export type { ObsiAnilloProps } from "./ObsiAnillo/ObsiAnillo";
export { default as ObsiDato } from "./ObsiDato/ObsiDato";
export type { ObsiDatoProps } from "./ObsiDato/ObsiDato";
