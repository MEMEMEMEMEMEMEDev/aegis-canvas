// =============================================================================
// Familia DOMO — "panel de control doméstico" (refs/7-referencia.png):
// salvia + tinta, todo monoespaciado (Chivo Mono), bordes 1.5px, densidad
// de instrumento. Formularios de UNA vista: controles y sheets, no scroll.
// Cada control es controlable desde fuera → operable por un agente AI.
// =============================================================================

export { default as DomoButton } from "./DomoButton/DomoButton";
export type { DomoButtonProps } from "./DomoButton/DomoButton";

export { default as DomoPanel } from "./DomoPanel/DomoPanel";
export type { DomoPanelProps } from "./DomoPanel/DomoPanel";

export { default as DomoField } from "./DomoField/DomoField";
export type { DomoFieldProps } from "./DomoField/DomoField";

export { default as DomoInput } from "./DomoInput/DomoInput";
export type { DomoInputProps } from "./DomoInput/DomoInput";

export { default as DomoStepper } from "./DomoStepper/DomoStepper";
export type { DomoStepperProps } from "./DomoStepper/DomoStepper";

export { default as DomoToggle } from "./DomoToggle/DomoToggle";
export type { DomoToggleProps } from "./DomoToggle/DomoToggle";

export { default as DomoSegmented } from "./DomoSegmented/DomoSegmented";
export type {
  DomoSegmentedProps,
  DomoSegmentedOption,
} from "./DomoSegmented/DomoSegmented";

export { default as DomoGauge } from "./DomoGauge/DomoGauge";
export type { DomoGaugeProps } from "./DomoGauge/DomoGauge";

export { default as DomoReadout } from "./DomoReadout/DomoReadout";
export type { DomoReadoutProps } from "./DomoReadout/DomoReadout";

export { DomoRow, DomoRows } from "./DomoRow/DomoRow";
export type { DomoRowProps, DomoRowsProps } from "./DomoRow/DomoRow";

export { default as DomoSheet } from "./DomoSheet/DomoSheet";
export type { DomoSheetProps } from "./DomoSheet/DomoSheet";

export { default as DomoStatus } from "./DomoStatus/DomoStatus";
export type { DomoStatusProps } from "./DomoStatus/DomoStatus";

export { default as DomoType } from "./DomoType/DomoType";
export type { DomoTypeProps } from "./DomoType/DomoType";

export { default as DomoPrompt } from "./DomoPrompt/DomoPrompt";
export type { DomoPromptProps } from "./DomoPrompt/DomoPrompt";

export { default as DomoDeck, DomoSlide } from "./DomoDeck/DomoDeck";
export type { DomoDeckProps, DomoSlideProps } from "./DomoDeck/DomoDeck";

// --- v2 (influencia NieR: cortes e interferencia) ---
export { default as DomoCut } from "./DomoCut/DomoCut";
export type { DomoCutProps } from "./DomoCut/DomoCut";

export { default as DomoGlitch } from "./DomoGlitch/DomoGlitch";
export type { DomoGlitchProps } from "./DomoGlitch/DomoGlitch";
