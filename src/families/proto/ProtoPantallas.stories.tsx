import type { Meta, StoryObj } from "@storybook/react-vite";
import { AgendaEquipo, FichaCompartida, NotasEquipo } from "./demo/Equipo";
import { MiDia, Tablero } from "./demo/Panel";
import { Meson, Rondas } from "./demo/Roles";
import WebAgendar, { RESERVA_VACIA } from "./demo/WebAgendar";
import { ClienteMolesto, Recordatorio } from "./demo/Whatsapp";
import { BlogDirectora, BlogPublico } from "./demo/Blog";

// LAS CUATRO PANTALLAS PARA CONVERSAR CON LA CLÍNICA. Datos ficticios (la
// franja de arriba lo dice). Cada una es navegable: se puede agendar,
// responder el recordatorio, tomar la conversación, marcar una dosis.
const meta: Meta = {
  title: "Families/Proto HUELLA/Pantallas",
  parameters: { layout: "fullscreen" },
};
export default meta;

const LISTA = { ...RESERVA_VACIA, servicio: "vacuna", hora: "10:30", nombre: "Andrea Vidal", telefono: "+56 9 8765 4321", mascota: "Rocky", aceptaDatos: true, aceptaRecordatorios: true };

export const Web: StoryObj = {
  name: "1 · Web pública: agendar (navegable)",
  render: () => <WebAgendar />,
};

export const WebHora: StoryObj = {
  name: "1 · Web · eligiendo la hora",
  render: () => <WebAgendar pasoInicial={1} reservaInicial={{ ...RESERVA_VACIA, servicio: "consulta" }} />,
};

export const WebDatos: StoryObj = {
  name: "1 · Web · datos y consentimiento",
  render: () => <WebAgendar pasoInicial={2} reservaInicial={{ ...RESERVA_VACIA, servicio: "vacuna", hora: "10:30" }} />,
};

export const WebListo: StoryObj = {
  name: "1 · Web · hora reservada",
  render: () => <WebAgendar pasoInicial={3} reservaInicial={LISTA} />,
};

export const WhatsappRecordatorio: StoryObj = {
  name: "2 · WhatsApp: recordatorio (navegable)",
  render: () => <Recordatorio />,
};

export const WhatsappCancela: StoryObj = {
  name: "2 · WhatsApp · cancela y la hora se recupera",
  render: () => <Recordatorio inicial="cancelar" />,
};

export const WhatsappMolesto: StoryObj = {
  name: "2 · WhatsApp · cliente molesto (protocolo de trato)",
  render: () => <ClienteMolesto />,
};

export const Veterinaria: StoryObj = {
  name: "3 · Panel: el día de la veterinaria",
  render: () => <MiDia />,
};

export const Directora: StoryObj = {
  name: "4 · Panel: el tablero de la directora",
  render: () => <Tablero />,
};

export const AgendaDelEquipo: StoryObj = {
  name: "5 · Panel: la agenda de todo el equipo",
  render: () => <AgendaEquipo />,
};

export const Notas: StoryObj = {
  name: "6 · Panel: notas y entrega de turno",
  render: () => <NotasEquipo />,
};

export const Ficha: StoryObj = {
  name: "7 · Panel: la ficha compartida",
  render: () => <FichaCompartida />,
};

export const Recepcion: StoryObj = {
  name: "8 · Panel: recepción, el mesón y la caja",
  render: () => <Meson />,
};

export const Tecnico: StoryObj = {
  name: "9 · Panel: las rondas del técnico",
  render: () => <Rondas />,
};

export const BlogWeb: StoryObj = {
  name: "10 · Web: consejos y noticias (el blog)",
  render: () => <BlogPublico />,
};

export const BlogArticulo: StoryObj = {
  name: "10 · Web · un consejo abierto",
  render: () => <BlogPublico abierta="calor-en-nunoa" />,
};

export const BlogPanel: StoryObj = {
  name: "11 · Panel: la directora escribe un consejo",
  render: () => <BlogDirectora />,
};
