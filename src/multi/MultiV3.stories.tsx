import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiV3 from "./v3/MultiV3";
import "../families/domo/domo.scss";
import "./multi-v3.scss";

// =============================================================================
// MULTI V3 — la tercera órbita: simple al llegar, profunda al bajar.
//
// Hub claro estilo DomoV2 (deck de 4 slides, flechas para navegar), cinco
// mundos como «otras webs» de página larga con parallax, warp exprés con
// el pipeline real, AI de ruta que pilotea por ti («llévame a la radio»),
// y 4 hallazgos opcionales que nunca bloquean nada. Fuentes nuevas:
// Fraunces + Spline Sans Mono (la primera serif del sistema).
// =============================================================================

const meta: Meta = {
  title: "Multiverso/Multi V3",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Completo: StoryObj = {
  render: () => <MultiV3 />,
};
