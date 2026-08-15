// =============================================================================
// Familia DENKI (電気) — "catálogo retro-industrial japonés"
// (refs/8-referencia.png): póster de producto arcade — papel arena, panel
// negro con trama de semitono, bermellón, katakana gigante, ráfagas de
// precio, combos y códigos de barras. Cada proyecto es un PRODUCTO.
//   import { DenkiTitle } from "@ahroi/foundation/denki";
//
// IMPORTANTE: los componentes viven dentro de .denki-scope (isla clara-cálida
// que emite el mini-contrato --denki-*).
// =============================================================================

export { default as DenkiButton } from "./DenkiButton/DenkiButton";
export type { DenkiButtonProps } from "./DenkiButton/DenkiButton";

export { default as DenkiTitle } from "./DenkiTitle/DenkiTitle";
export type { DenkiTitleProps } from "./DenkiTitle/DenkiTitle";

export { default as DenkiPanel } from "./DenkiPanel/DenkiPanel";
export type { DenkiPanelProps } from "./DenkiPanel/DenkiPanel";

export { default as DenkiBurst } from "./DenkiBurst/DenkiBurst";
export type { DenkiBurstProps } from "./DenkiBurst/DenkiBurst";

export { default as DenkiFrame } from "./DenkiFrame/DenkiFrame";
export type { DenkiFrameProps } from "./DenkiFrame/DenkiFrame";

export { default as DenkiCombo } from "./DenkiCombo/DenkiCombo";
export type { DenkiComboProps } from "./DenkiCombo/DenkiCombo";

export { default as DenkiTag } from "./DenkiTag/DenkiTag";
export type { DenkiTagProps } from "./DenkiTag/DenkiTag";

export { default as DenkiBarcode } from "./DenkiBarcode/DenkiBarcode";
export type { DenkiBarcodeProps } from "./DenkiBarcode/DenkiBarcode";

export { default as DenkiMeter } from "./DenkiMeter/DenkiMeter";
export type { DenkiMeterProps } from "./DenkiMeter/DenkiMeter";

export { default as DenkiRail } from "./DenkiRail/DenkiRail";
export type { DenkiRailProps } from "./DenkiRail/DenkiRail";
