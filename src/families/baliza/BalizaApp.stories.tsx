import type { Meta, StoryObj } from "@storybook/react-vite";
import AppTrabajador, {
  NavApp,
  PantallaAyudaEnCamino,
  PantallaEnrolar,
  PantallaInicio,
  PantallaMiFicha,
  PantallaNuevoViaje,
  PantallaTodoBien,
  PantallaViaje,
} from "./demo/AppTrabajador";
import Telefono from "./demo/Telefono";

// PANTALLAS NUEVAS (no están en el Figma del cliente). La app real es
// Kotlin + Compose; esto define el diseño, los textos y los estados.
const meta: Meta = {
  title: "Families/Baliza/Pantallas/2 App del trabajador",
  parameters: { layout: "fullscreen" },
};
export default meta;

const nada = () => undefined;

export const Flujo: StoryObj = {
  name: "▶ Flujo completo (navegable)",
  render: () => <AppTrabajador />,
};

export const Enrolar: StoryObj = {
  name: "Vincular teléfono",
  render: () => <Telefono><PantallaEnrolar /></Telefono>,
};

export const Inicio: StoryObj = {
  render: () => <Telefono pie={<NavApp activa="inicio" onCambio={nada} />}><PantallaInicio /></Telefono>,
};

export const InicioEnviando: StoryObj = {
  name: "Inicio · SOS enviando",
  render: () => <Telefono pie={<NavApp activa="inicio" onCambio={nada} />}><PantallaInicio sos="enviando" /></Telefono>,
};

export const AyudaEnCamino: StoryObj = {
  name: "SOS · ayuda en camino",
  render: () => <Telefono><PantallaAyudaEnCamino /></Telefono>,
};

export const NuevoViaje: StoryObj = {
  render: () => <Telefono pie={<NavApp activa="viaje" onCambio={nada} />}><PantallaNuevoViaje /></Telefono>,
};

export const ViajeEnCurso: StoryObj = {
  name: "Viaje · en curso",
  render: () => <Telefono pie={<NavApp activa="viaje" onCambio={nada} avisoViaje />}><PantallaViaje /></Telefono>,
};

export const ViajePorVencer: StoryObj = {
  name: "Viaje · por vencer",
  render: () => <Telefono pie={<NavApp activa="viaje" onCambio={nada} avisoViaje />}><PantallaViaje estado="porVencer" /></Telefono>,
};

export const ViajeVencido: StoryObj = {
  name: "Viaje · vencido (base avisada)",
  render: () => <Telefono pie={<NavApp activa="viaje" onCambio={nada} avisoViaje />}><PantallaViaje estado="vencido" /></Telefono>,
};

export const TodoBien: StoryObj = {
  name: "¿Todo bien? (pregunta periódica)",
  render: () => <Telefono><PantallaTodoBien /></Telefono>,
};

export const SinSenal: StoryObj = {
  name: "Inicio · sin señal",
  render: () => <Telefono pie={<NavApp activa="inicio" onCambio={nada} avisoViaje />}><PantallaInicio viaje="enCurso" sinSenal /></Telefono>,
};

export const MiFicha: StoryObj = {
  render: () => <Telefono pie={<NavApp activa="ficha" onCambio={nada} />}><PantallaMiFicha /></Telefono>,
};
