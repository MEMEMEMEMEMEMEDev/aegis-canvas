// =============================================================================
// @ahroi/foundation  —  NÚCLEO (public JS entry).
// Primitivos universales + utils + runtime de shaders. App-agnostic.
// (El SCSS foundation se importa aparte: "@ahroi/foundation" / index.scss.)
// Las FAMILIAS de componentes viven en subrutas: "@ahroi/foundation/hud", etc.
// =============================================================================

// --- Primitivos universales (se re-pintan por tema) ---
export { default as Button } from "./primitives/Button/Button";
export { default as Card } from "./primitives/Card/Card";
export { default as Stack } from "./primitives/Stack/Stack";
export { default as Modal } from "./primitives/Modal/Modal";
export { default as Toggle } from "./primitives/Toggle/Toggle";
export { default as Stat } from "./primitives/Stat/Stat";
export { default as ProgressRing } from "./primitives/ProgressRing/ProgressRing";
export { default as ShaderSurface } from "./primitives/ShaderSurface/ShaderSurface";

// --- Runtime de shaders 2D ---
export { useShader } from "./shaders/useShader";
export * as effects from "./shaders/effects";

// --- Utilidades ---
export { cx } from "./utils/cx";
export { default as Portal } from "./overlay/Portal";
export { getOverlayRoot } from "./overlay/overlayRoot";
