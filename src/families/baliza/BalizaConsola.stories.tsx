import type { Meta, StoryObj } from "@storybook/react-vite";
import Consola, { ConsolaAlerta, ConsolaAvisoLlegada, ConsolaCaso, ConsolaEspera, ConsolaSinConexion } from "./demo/Consola";

// PANTALLAS NUEVAS. La consola de monitoreo de la base: app de escritorio
// (Tauri) que carga esta web y le suma alarma, bandeja y arranque con el PC.
const meta: Meta = {
  title: "Families/Baliza/Pantallas/3 Consola de la base",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Flujo: StoryObj = {
  name: "▶ Flujo (simular SOS → tomar → liberar → cerrar)",
  render: () => <Consola />,
};

export const Espera: StoryObj = { name: "En espera", render: () => <ConsolaEspera /> };
export const Alerta: StoryObj = { name: "SOS entrante + aviso de llegada", render: () => <ConsolaAlerta /> };
export const Caso: StoryObj = { name: "Caso en curso", render: () => <ConsolaCaso /> };
export const AvisoLlegada: StoryObj = { name: "Sin confirmar llegada (trabajador solo)", render: () => <ConsolaAvisoLlegada /> };
export const SinConexion: StoryObj = { name: "Sin conexión", render: () => <ConsolaSinConexion /> };
