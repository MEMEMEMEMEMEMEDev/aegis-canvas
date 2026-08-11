// =============================================================================
// Familia BEIGE — set "computador de escritorio de 1998": escritorio verde
// azulado, ventanas con biseles de tres luces, barra de tareas con reloj,
// diálogos con protocolo, un asistente con forma de clip y un monitor de
// tubo (BeigeCrt) que pinta las líneas de barrido sobre TODA la pantalla.
//   import { BeigeEscritorio } from "@ahroi/foundation/beige";
//
// IMPORTANTE: los componentes viven dentro de un contenedor .beige-scope
// (emite el mini-contrato --beige-*). Regla de la familia: cero radios,
// cero sombras difusas — la única curva permitida es la del tubo.
// =============================================================================

export { default as BeigeEscritorio } from "./BeigeEscritorio/BeigeEscritorio";
export type { BeigeEscritorioProps } from "./BeigeEscritorio/BeigeEscritorio";

export { default as BeigeCrt } from "./BeigeCrt/BeigeCrt";
export type { BeigeCrtProps } from "./BeigeCrt/BeigeCrt";

export { default as BeigeVentana } from "./BeigeVentana/BeigeVentana";
export type { BeigeVentanaProps } from "./BeigeVentana/BeigeVentana";

export { default as BeigeBoton } from "./BeigeBoton/BeigeBoton";
export type { BeigeBotonProps } from "./BeigeBoton/BeigeBoton";

export { default as BeigeCampo } from "./BeigeCampo/BeigeCampo";
export type { BeigeCampoProps } from "./BeigeCampo/BeigeCampo";

export { default as BeigeIcono } from "./BeigeIcono/BeigeIcono";
export type { BeigeIconoProps } from "./BeigeIcono/BeigeIcono";

export { default as BeigeBarraTareas } from "./BeigeBarraTareas/BeigeBarraTareas";
export type { BeigeBarraTareasProps, BeigeTarea } from "./BeigeBarraTareas/BeigeBarraTareas";

export { default as BeigeDialogo } from "./BeigeDialogo/BeigeDialogo";
export type { BeigeDialogoProps } from "./BeigeDialogo/BeigeDialogo";

export { default as BeigeProgreso } from "./BeigeProgreso/BeigeProgreso";
export type { BeigeProgresoProps } from "./BeigeProgreso/BeigeProgreso";

export { default as BeigeNota } from "./BeigeNota/BeigeNota";
export type { BeigeNotaProps } from "./BeigeNota/BeigeNota";

export { default as BeigeClip } from "./BeigeClip/BeigeClip";
export type { BeigeClipProps } from "./BeigeClip/BeigeClip";

export { default as BeigePicto } from "./BeigePicto/BeigePicto";
export type { BeigePictoProps, BeigePictoName } from "./BeigePicto/BeigePicto";
