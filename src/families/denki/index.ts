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

// --- La lámina de producto ---------------------------------------------------
//
// La referencia es el póster de un APARATO, y hasta acá la familia tenía la
// tipografía, los paneles y las ráfagas — pero no el aparato. Estas cinco
// piezas son la lámina entera: la máquina dibujada, la placa donde se la
// fotografía, la chispa del impacto, la tira de combo y la banda de marca
// que cierra el pliego.

export { default as DenkiStick } from "./DenkiStick/DenkiStick";
export type { DenkiStickProps, DenkiStickBoton } from "./DenkiStick/DenkiStick";

export { default as DenkiPlaca } from "./DenkiPlaca/DenkiPlaca";
export type { DenkiPlacaProps } from "./DenkiPlaca/DenkiPlaca";

export { default as DenkiSpark } from "./DenkiSpark/DenkiSpark";
export type { DenkiSparkProps } from "./DenkiSpark/DenkiSpark";

export { default as DenkiFlecha } from "./DenkiFlecha/DenkiFlecha";
export type { DenkiFlechaProps, DenkiDir } from "./DenkiFlecha/DenkiFlecha";

export { default as DenkiPie } from "./DenkiPie/DenkiPie";
export type { DenkiPieProps } from "./DenkiPie/DenkiPie";
