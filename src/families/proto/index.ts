// =============================================================================
// Familia PROTO — incubando HUELLA, la piel de la Veterinaria San Bruno.
//   import { ProtoBoton } from "@ahroi/foundation/proto";
//
// Sin referencias del cliente todavía (la clínica no ha traído logo ni
// colores): nace de una idea, la sala de espera que uno quiere. Clara,
// cálida, tranquila (crema, verde parque, un guiño de durazno) y sobria. Fraunces
// para la voz de la clínica, Onest para operar.
//
// LA LEY DE LA FAMILIA: el rojo significa urgencia y nada más. Lo que se toca
// es verde parque, las personas y las mascotas ciruela, lo que está bien verde hoja, lo
// que espera una respuesta miel, y la lavanda sólo decora (las huellitas).
//
// Flujo probado (así nacieron TEBEO y BALIZA):
//   1. Referencias visuales en refs/ (raíz del repo) → se analizan en sesión.
//   2. La familia emite su voz (proto.scss): fuentes self-hosted + el
//      mini-contrato scoped .proto-scope.
//   3. Componentes: un set pequeño primero, luego las pantallas en demo/.
//   4. Cuando la identidad cuaja con la clínica: se bautiza HUELLA y se
//      renombra todo (PROTO es siempre provisional).
// Todos los componentes son controlables por props, sin estado propio.
// =============================================================================

export { default as ProtoBoton } from "./ProtoBoton/ProtoBoton";
export type { ProtoBotonProps } from "./ProtoBoton/ProtoBoton";

export { default as ProtoInsignia } from "./ProtoInsignia/ProtoInsignia";
export type { ProtoInsigniaProps, ProtoInsigniaEstado } from "./ProtoInsignia/ProtoInsignia";

export { default as ProtoPanel } from "./ProtoPanel/ProtoPanel";
export type { ProtoPanelProps } from "./ProtoPanel/ProtoPanel";

export { default as ProtoAvatar, iniciales } from "./ProtoAvatar/ProtoAvatar";
export type { ProtoAvatarProps } from "./ProtoAvatar/ProtoAvatar";

export { default as ProtoMetrica } from "./ProtoMetrica/ProtoMetrica";
export type { ProtoMetricaProps } from "./ProtoMetrica/ProtoMetrica";

export { default as ProtoAviso } from "./ProtoAviso/ProtoAviso";
export type { ProtoAvisoProps } from "./ProtoAviso/ProtoAviso";

export { default as ProtoCampo } from "./ProtoCampo/ProtoCampo";
export type { ProtoCampoProps } from "./ProtoCampo/ProtoCampo";

export { default as ProtoOpciones } from "./ProtoOpcion/ProtoOpcion";
export type { ProtoOpcionesProps, ProtoOpcionItem } from "./ProtoOpcion/ProtoOpcion";

export { default as ProtoPasos } from "./ProtoPasos/ProtoPasos";
export type { ProtoPasosProps } from "./ProtoPasos/ProtoPasos";

export { default as ProtoHorario } from "./ProtoHorario/ProtoHorario";
export type { ProtoHorarioProps, ProtoHorarioBloque } from "./ProtoHorario/ProtoHorario";

export { default as ProtoCita } from "./ProtoCita/ProtoCita";
export type { ProtoCitaProps, ProtoCitaEstado } from "./ProtoCita/ProtoCita";

export { default as ProtoMensaje } from "./ProtoMensaje/ProtoMensaje";
export type { ProtoMensajeProps } from "./ProtoMensaje/ProtoMensaje";

export { default as ProtoBarra } from "./ProtoBarra/ProtoBarra";
export type { ProtoBarraProps } from "./ProtoBarra/ProtoBarra";

export { default as ProtoCasilla } from "./ProtoCasilla/ProtoCasilla";
export type { ProtoCasillaProps } from "./ProtoCasilla/ProtoCasilla";

export { default as ProtoHuellitas } from "./ProtoHuellitas/ProtoHuellitas";
export type { ProtoHuellitasProps } from "./ProtoHuellitas/ProtoHuellitas";

export { default as ProtoAgenda } from "./ProtoAgenda/ProtoAgenda";
export type { ProtoAgendaProps, ProtoAgendaColumna, ProtoAgendaBloque, ProtoAgendaTono } from "./ProtoAgenda/ProtoAgenda";

export { default as ProtoNota } from "./ProtoNota/ProtoNota";
export type { ProtoNotaProps } from "./ProtoNota/ProtoNota";

export { default as ProtoSegmento } from "./ProtoSegmento/ProtoSegmento";
export type { ProtoSegmentoProps } from "./ProtoSegmento/ProtoSegmento";

export { default as ProtoLineaTiempo } from "./ProtoLineaTiempo/ProtoLineaTiempo";
export type { ProtoHito, ProtoHitoTipo } from "./ProtoLineaTiempo/ProtoLineaTiempo";

export * from "./iconos";
