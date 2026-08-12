// =============================================================================
// Familia DISQUETE — set "diskette de 3,5 pulgadas"
// (referencias-portafolio/1-familia-idea/1..4-ref.png): diseño gráfico
// contemporáneo —titulares negros con tracking negativo, filas de micro-texto
// espaciadas, sellos y códigos de barras— impreso sobre un objeto obsoleto.
// Cada proyecto es un DISQUETE con su etiqueta.
//   import { DisqDisk } from "@ahroi/foundation/disquete";
//
// IMPORTANTE: los componentes viven dentro de un contenedor .disquete-scope
// (isla OSCURA que emite el mini-contrato --disq-*).
// =============================================================================

export { default as DisqDisk } from "./DisqDisk/DisqDisk";
export type { DisqDiskProps, DisqColor } from "./DisqDisk/DisqDisk";

export { default as DisqLabel } from "./DisqLabel/DisqLabel";
export type { DisqLabelProps } from "./DisqLabel/DisqLabel";

export { default as DisqTitle } from "./DisqTitle/DisqTitle";
export type { DisqTitleProps } from "./DisqTitle/DisqTitle";

export { default as DisqRows } from "./DisqRows/DisqRows";
export type { DisqRowsProps } from "./DisqRows/DisqRows";

export { default as DisqStripes } from "./DisqStripes/DisqStripes";
export type { DisqStripesProps } from "./DisqStripes/DisqStripes";

export { default as DisqBarcode } from "./DisqBarcode/DisqBarcode";
export type { DisqBarcodeProps } from "./DisqBarcode/DisqBarcode";

export { default as DisqBadge } from "./DisqBadge/DisqBadge";
export type { DisqBadgeProps } from "./DisqBadge/DisqBadge";

export { default as DisqEmblem } from "./DisqEmblem/DisqEmblem";
export type { DisqEmblemProps, DisqEmblemShape } from "./DisqEmblem/DisqEmblem";

export { default as DisqSleeve } from "./DisqSleeve/DisqSleeve";
export type { DisqSleeveProps } from "./DisqSleeve/DisqSleeve";

export { default as DisqShelf } from "./DisqShelf/DisqShelf";
export type { DisqShelfProps } from "./DisqShelf/DisqShelf";

export { default as DisqTag } from "./DisqTag/DisqTag";
export type { DisqTagProps } from "./DisqTag/DisqTag";

export { default as DisqButton } from "./DisqButton/DisqButton";
export type { DisqButtonProps } from "./DisqButton/DisqButton";

export { default as DisqNeon } from "./DisqNeon/DisqNeon";
export type { DisqNeonProps } from "./DisqNeon/DisqNeon";

export { default as DisqMarquee } from "./DisqMarquee/DisqMarquee";
export type { DisqMarqueeProps } from "./DisqMarquee/DisqMarquee";

export { default as DisqHud } from "./DisqHud/DisqHud";
export type { DisqHudProps } from "./DisqHud/DisqHud";
