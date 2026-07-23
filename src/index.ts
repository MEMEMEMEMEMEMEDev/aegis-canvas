// =============================================================================
// @ahroi/foundation — barrel del NÚCLEO (public JS entry).
// v2: núcleos headless (comportamiento + ARIA, sin opinión visual).
// Las familias/marcas visten las clases ds-* después.
// =============================================================================

// --- Behaviors (hooks headless: el motor de todo widget) ---
export { useControllableState } from "./behaviors/useControllableState";
export type { UseControllableStateOptions } from "./behaviors/useControllableState";
export { useDisclosure } from "./behaviors/useDisclosure";
export type { UseDisclosureOptions, DisclosureApi } from "./behaviors/useDisclosure";
export { useDismiss } from "./behaviors/useDismiss";
export type { UseDismissOptions, DismissReason } from "./behaviors/useDismiss";
export { useListNavigation } from "./behaviors/useListNavigation";
export type {
  UseListNavigationOptions,
  ListNavigationApi,
} from "./behaviors/useListNavigation";

// --- Primitivos (núcleos headless) ---
export { default as Button } from "./primitives/Button/Button";
export type { ButtonProps, ButtonVariant } from "./primitives/Button/Button";
export { default as Field, useFieldContext, useFieldProps } from "./primitives/Field/Field";
export type {
  FieldProps,
  FieldContextValue,
  FieldControlProps,
} from "./primitives/Field/Field";
export { default as Input } from "./primitives/Input/Input";
export type { InputProps } from "./primitives/Input/Input";
export type { ControlSize } from "./primitives/types";

// --- Overlay (portal compartido entre MFEs) ---
export { default as Portal } from "./overlay/Portal";
export { getOverlayRoot } from "./overlay/overlayRoot";

// --- Utilidades ---
export { cx } from "./utils/cx";
export type { ClassValue } from "./utils/cx";
