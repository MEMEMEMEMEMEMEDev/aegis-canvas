// =============================================================================
// Familia BALIZA — "respuesta en terreno", la piel de SOS Ruta.
//   import { BalizaAlerta } from "@ahroi/foundation/baliza";
//
// Una baliza es la luz que marca dónde alguien necesita ayuda. Nace del
// Figma del cliente (refs/12-sosruta, gitignoreado): credencial con QR,
// ficha de emergencia móvil, app del trabajador, consola y panel de la
// base, y la landing. Se incubó en proto/ y se bautizó al cuajar.
//
// LA LEY DE LA FAMILIA: el rojo significa "alguien necesita ayuda" y nada
// más. Lo que se toca es azul, lo protegido es ámbar, lo que está bien es
// verde. Si el rojo empieza a decorar, deja de avisar.
//
// Los componentes viven dentro de .baliza-scope (emite el mini-contrato
// --baliza-*); .baliza-scope--papel retiñe los mismos tokens para la
// credencial impresa. Todos son controlables por props, sin estado propio.
// =============================================================================

export { default as BalizaBoton } from "./BalizaBoton/BalizaBoton";
export type { BalizaBotonProps } from "./BalizaBoton/BalizaBoton";

export { default as BalizaInsignia } from "./BalizaInsignia/BalizaInsignia";
export type { BalizaInsigniaProps, BalizaInsigniaEstado } from "./BalizaInsignia/BalizaInsignia";

export { default as BalizaMetrica } from "./BalizaMetrica/BalizaMetrica";
export type { BalizaMetricaProps } from "./BalizaMetrica/BalizaMetrica";

export { default as BalizaPanel } from "./BalizaPanel/BalizaPanel";
export type { BalizaPanelProps } from "./BalizaPanel/BalizaPanel";

export { default as BalizaAvatar, iniciales } from "./BalizaAvatar/BalizaAvatar";
export type { BalizaAvatarProps } from "./BalizaAvatar/BalizaAvatar";

export { default as BalizaFila } from "./BalizaFila/BalizaFila";
export type { BalizaFilaProps } from "./BalizaFila/BalizaFila";

export { default as BalizaBarra } from "./BalizaBarra/BalizaBarra";
export type { BalizaBarraProps } from "./BalizaBarra/BalizaBarra";

export { default as BalizaPestanas, idsPestana } from "./BalizaPestanas/BalizaPestanas";
export type { BalizaPestanasProps, BalizaPestana } from "./BalizaPestanas/BalizaPestanas";

export { default as BalizaCampo } from "./BalizaCampo/BalizaCampo";
export type { BalizaCampoProps } from "./BalizaCampo/BalizaCampo";

export { default as BalizaAlerta } from "./BalizaAlerta/BalizaAlerta";
export type { BalizaAlertaProps } from "./BalizaAlerta/BalizaAlerta";

export { default as BalizaVital } from "./BalizaVital/BalizaVital";
export type { BalizaVitalProps } from "./BalizaVital/BalizaVital";

export { default as BalizaReservado } from "./BalizaReservado/BalizaReservado";
export type { BalizaReservadoProps } from "./BalizaReservado/BalizaReservado";

export { default as BalizaContacto } from "./BalizaContacto/BalizaContacto";
export type { BalizaContactoProps } from "./BalizaContacto/BalizaContacto";

export { default as BalizaDato } from "./BalizaDato/BalizaDato";
export type { BalizaDatoProps } from "./BalizaDato/BalizaDato";

export { default as BalizaTabla } from "./BalizaTabla/BalizaTabla";
export type { BalizaTablaProps, BalizaColumna } from "./BalizaTabla/BalizaTabla";

export { default as BalizaCredencial } from "./BalizaCredencial/BalizaCredencial";
export type { BalizaCredencialProps } from "./BalizaCredencial/BalizaCredencial";

export { default as BalizaBotonSOS } from "./BalizaBotonSOS/BalizaBotonSOS";
export type { BalizaBotonSOSProps } from "./BalizaBotonSOS/BalizaBotonSOS";

export { default as BalizaViaje } from "./BalizaViaje/BalizaViaje";
export type { BalizaViajeProps } from "./BalizaViaje/BalizaViaje";

export { default as BalizaLineaTiempo } from "./BalizaLineaTiempo/BalizaLineaTiempo";
export type { BalizaLineaTiempoProps, BalizaHito } from "./BalizaLineaTiempo/BalizaLineaTiempo";

export { default as BalizaAviso } from "./BalizaAviso/BalizaAviso";
export type { BalizaAvisoProps } from "./BalizaAviso/BalizaAviso";

export { default as BalizaInterruptor } from "./BalizaInterruptor/BalizaInterruptor";
export type { BalizaInterruptorProps } from "./BalizaInterruptor/BalizaInterruptor";

export { default as BalizaNavInferior } from "./BalizaNavInferior/BalizaNavInferior";
export type { BalizaNavInferiorProps, BalizaDestino } from "./BalizaNavInferior/BalizaNavInferior";

export { default as BalizaCodigo } from "./BalizaCodigo/BalizaCodigo";
export type { BalizaCodigoProps } from "./BalizaCodigo/BalizaCodigo";

export { default as BalizaDialogo } from "./BalizaDialogo/BalizaDialogo";
export type { BalizaDialogoProps } from "./BalizaDialogo/BalizaDialogo";

export * from "./iconos";
