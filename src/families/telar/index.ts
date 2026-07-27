// =============================================================================
// Familia TELAR — neo-andina digital: geometría de telar (esquinas chakana,
// franjas tejidas, hilados fucsia/cobre/verde/sol sobre lana oscura) montada
// en un lenguaje de OS denso: paneles-ventana, widgets vivos, ticker.
// Display: Bricolage Grotesque · Terminal: IBM Plex Mono (self-hosted, OFL).
//   import { TelarPanel } from "@ahroi/foundation/telar";
//
// IMPORTANTE: los componentes viven dentro de .telar-scope (isla oscura-cálida
// que emite el mini-contrato --telar-*).
// =============================================================================
export { default as TelarPanel } from "./TelarPanel/TelarPanel";
export type { TelarPanelProps } from "./TelarPanel/TelarPanel";
export { default as TelarButton } from "./TelarButton/TelarButton";
export type { TelarButtonProps } from "./TelarButton/TelarButton";
export { default as TelarTag } from "./TelarTag/TelarTag";
export type { TelarTagProps } from "./TelarTag/TelarTag";
export { default as TelarStripe } from "./TelarStripe/TelarStripe";
export type { TelarStripeProps } from "./TelarStripe/TelarStripe";
export { default as TelarStat } from "./TelarStat/TelarStat";
export type { TelarStatProps } from "./TelarStat/TelarStat";
export { default as TelarTicker } from "./TelarTicker/TelarTicker";
export type { TelarTickerProps } from "./TelarTicker/TelarTicker";
export { default as TelarClock } from "./TelarClock/TelarClock";
export type { TelarClockProps } from "./TelarClock/TelarClock";
export { default as TelarType } from "./TelarType/TelarType";
export type { TelarTypeProps } from "./TelarType/TelarType";
