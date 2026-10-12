import type { Meta, StoryObj } from "@storybook/react-vite";
import { PantallaLogin } from "./demo/AdminSecciones";
import PanelBase from "./demo/PanelBase";

// El panel de administración (web, React). Frames del Figma: PanelADMI-V1,
// SOSACTIVADO-V2 y Activaciones SOS. Nuevas: login, bases y flota,
// usuarios y roles, módulos y vincular teléfono.
const meta: Meta = {
  title: "Families/Baliza/Pantallas/4 Administración",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Login: StoryObj = { render: () => <PantallaLogin /> };
export const Trabajadores: StoryObj = { name: "Trabajadores y tarjetas (PanelADMI)", render: () => <PanelBase /> };
export const ConAlerta: StoryObj = { name: "Con SOS activado (SOSACTIVADO)", render: () => <PanelBase conAlerta /> };
export const Activaciones: StoryObj = { name: "Historial de activaciones", render: () => <PanelBase pestanaInicial="activaciones" /> };
export const Bases: StoryObj = { name: "Bases, flota y contactos", render: () => <PanelBase pestanaInicial="bases" /> };
export const Usuarios: StoryObj = { name: "Usuarios y roles", render: () => <PanelBase pestanaInicial="usuarios" /> };
export const Modulos: StoryObj = { name: "Módulos", render: () => <PanelBase pestanaInicial="modulos" /> };
