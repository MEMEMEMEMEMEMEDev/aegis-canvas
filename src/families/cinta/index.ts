// =============================================================================
// Familia CINTA — "cassette-futurismo" (refs/9-referencia.png): hardware de
// audio analógico imaginario — chasis con tornillos, teclas pastel,
// cassettes con carretes que giran, pantallas NOW PLAYING, diales y
// recibos de specs. Cada proyecto es un CASSETTE que se reproduce.
//   import { CintaTape } from "@ahroi/foundation/cinta";
//
// IMPORTANTE: los componentes viven dentro de .cinta-scope (isla clara-cálida
// que emite el mini-contrato --cinta-*).
// =============================================================================

export { default as CintaButton } from "./CintaButton/CintaButton";
export type { CintaButtonProps } from "./CintaButton/CintaButton";

export { default as CintaPanel } from "./CintaPanel/CintaPanel";
export type { CintaPanelProps } from "./CintaPanel/CintaPanel";

export { default as CintaTape } from "./CintaTape/CintaTape";
export type { CintaTapeProps } from "./CintaTape/CintaTape";

export { default as CintaTransport } from "./CintaTransport/CintaTransport";
export type {
  CintaTransportProps,
  CintaTransportState,
} from "./CintaTransport/CintaTransport";

export { default as CintaDisplay } from "./CintaDisplay/CintaDisplay";
export type { CintaDisplayProps } from "./CintaDisplay/CintaDisplay";

export { default as CintaScale } from "./CintaScale/CintaScale";
export type { CintaScaleProps } from "./CintaScale/CintaScale";

export { default as CintaLabel } from "./CintaLabel/CintaLabel";
export type { CintaLabelProps } from "./CintaLabel/CintaLabel";

export { default as CintaTag } from "./CintaTag/CintaTag";
export type { CintaTagProps } from "./CintaTag/CintaTag";

export { default as CintaMarks } from "./CintaMarks/CintaMarks";
export type { CintaMarksProps } from "./CintaMarks/CintaMarks";

export { default as CintaEq } from "./CintaEq/CintaEq";
export type { CintaEqProps } from "./CintaEq/CintaEq";
