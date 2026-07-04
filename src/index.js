// =============================================================================
// Component barrel  —  the public JS entry of @ahroi/foundation.
// (The SCSS foundation is imported separately via "@ahroi/foundation" / index.scss.)
// =============================================================================

export { default as Button } from "./components/Button/Button";
export { default as Card } from "./components/Card/Card";
export { default as Stack } from "./components/Stack/Stack";
export { default as Modal } from "./components/Modal/Modal";
export { default as HudPanel } from "./components/HudPanel/HudPanel";
export { default as MetaTag } from "./components/MetaTag/MetaTag";
export { default as Numeral } from "./components/Numeral/Numeral";
export { default as Toggle } from "./components/Toggle/Toggle";
export { default as Stat } from "./components/Stat/Stat";
export { default as ProgressRing } from "./components/ProgressRing/ProgressRing";
export { default as ShaderSurface } from "./components/ShaderSurface/ShaderSurface";

export { useShader } from "./shaders/useShader";
export * as effects from "./shaders/effects";

export { cx } from "./utils/cx";
export { default as Portal } from "./overlay/Portal";
export { getOverlayRoot } from "./overlay/overlayRoot";
