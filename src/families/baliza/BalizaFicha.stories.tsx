import type { Meta, StoryObj } from "@storybook/react-vite";
import FichaEmergencia, { FichaBloqueada, FichaInteractiva } from "./demo/FichaEmergencia";
import { TRABAJADORES } from "./demo/datos";

// Lo que ve quien escanea el QR. Web móvil (React), sin instalar nada.
// Frames del Figma: SOS y SOS2. Mejoras de UX acordadas con el cliente:
// 131 primero, estado de la ubicación, "no es emergencia" y el código de
// la base para liberar los datos médicos.
const meta: Meta = {
  title: "Families/Baliza/Pantallas/1 Ficha de emergencia",
  parameters: { layout: "fullscreen" },
};
export default meta;

const t = TRABAJADORES[0]!;

export const Flujo: StoryObj = {
  name: "▶ Flujo (verificar → código → datos)",
  render: () => <FichaInteractiva t={t} />,
};

export const Publica: StoryObj = {
  name: "Pública (SOS)",
  render: () => <FichaEmergencia t={t} />,
};

export const PidiendoCodigo: StoryObj = {
  name: "Personal de salud · pidiendo código",
  render: () => <FichaEmergencia t={t} paso="llave" />,
};

export const Liberada: StoryObj = {
  name: "Datos liberados (SOS2)",
  render: () => <FichaEmergencia t={t} paso="liberada" />,
};

export const SinUbicacion: StoryObj = {
  name: "Sin permiso de ubicación",
  render: () => <FichaEmergencia t={t} ubicacion="denegada" />,
};

export const NoEsEmergencia: StoryObj = {
  name: "Marcada «no es emergencia»",
  render: () => <FichaEmergencia t={t} descartada />,
};

export const Bloqueada: StoryObj = {
  name: "Tarjeta bloqueada",
  render: () => <FichaBloqueada />,
};
