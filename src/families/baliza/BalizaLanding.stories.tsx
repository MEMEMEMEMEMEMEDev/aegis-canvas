import type { Meta, StoryObj } from "@storybook/react-vite";
import Landing, { ComoFunciona, Hero, Producto, Seguridad } from "./demo/Landing";

// La landing (frame SOSruta del Figma, corregida y ampliada). En producción
// es Astro: secciones estáticas sin JS y dos islas (demo en vivo, producto).
const meta: Meta = {
  title: "Families/Baliza/Pantallas/5 Landing",
  parameters: { layout: "fullscreen" },
};
export default meta;

const Envoltura = ({ children }: { children: React.ReactNode }) => <div className="baliza-scope lp">{children}</div>;

export const Completa: StoryObj = { name: "▶ Landing completa", render: () => <Landing /> };
export const SoloHero: StoryObj = { name: "Hero", render: () => <Envoltura><Hero /></Envoltura> };
export const DemoEnVivo: StoryObj = { name: "Cómo funciona · demo en vivo", render: () => <Envoltura><ComoFunciona /></Envoltura> };
export const SoloProducto: StoryObj = { name: "Producto (pestañas)", render: () => <Envoltura><Producto /></Envoltura> };
export const SoloSeguridad: StoryObj = { name: "Seguridad y confianza", render: () => <Envoltura><Seguridad /></Envoltura> };
