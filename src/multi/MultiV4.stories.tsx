import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiV4 from "./v4/MultiV4";
import "./multi-v4.scss";

// =============================================================================
// MULTI V4 — el multiverso curado: la creatividad cambia de sitio.
//
// V1–V3 ponían la rareza en la NAVEGACIÓN (nave, warp, códigos de salto).
// V4 la pone donde la ponen las referencias: en la SUPERFICIE. Esqueleto UX
// convencional —nav visible, hero que responde quién/qué/cómo, scroll
// natural, contacto a un clic— vestido por OBSIDIANA (galería de esquirlas)
// y con CASOS DE ESTUDIO REALES: problema → proceso → resultado.
// Los mundos de V1–V3 no mueren: se degradan a exhibiciones dentro de los
// casos. Concepto completo en src/multi/v4/CONCEPTO.md.
// =============================================================================

const meta: Meta = {
  title: "Multiverso/Multi V4",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Completo: StoryObj = {
  render: () => <MultiV4 />,
};
