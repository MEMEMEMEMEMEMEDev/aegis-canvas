import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiV2 from "./v2/MultiV2";
import "../families/domo/domo.scss";
import "./multi-v2.scss";

// =============================================================================
// MULTI V2 — el multiverso, ahora como juego.
//
// Arco completo: nave apagada → encender sistemas → identificar las tres
// señales (sintonizar / preguntar / leer) → ejecutar los códigos de salto
// (teclado o pad táctil) → visitar los mundos → encontrar la Cubierta.
// El progreso persiste en localStorage; «Nueva partida» en la consola.
// El atajo «Canal directo ▸» (arriba a la derecha) lleva SIEMPRE al
// blog/expediente/contacto — el juego nunca bloquea al recruiter.
// =============================================================================

const meta: Meta = {
  title: "Multiverso/Multi V2",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Completo: StoryObj = {
  render: () => <MultiV2 />,
};
