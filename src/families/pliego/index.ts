// =============================================================================
// Familia PLIEGO — "hoja de imprenta japonesa"
// (refs/10-referencia.png): el pliego de un diseñador antes de doblarse —
// campo gris, hojas blancas, filetes de un pelo, UN rojo-rosa que aparece
// como bloque plano, kanji enormes, cadenas de asteriscos, texto al canto y
// titulares en minúsculas gigantes. Encima, la mecánica de un menú de
// videojuego: cursor, escuadras, arranque y confirmación.
//   import { PliegoTitulo } from "@ahroi/foundation/pliego";
//
// IMPORTANTE: los componentes viven dentro de .pliego-scope (isla clarísima
// que emite el mini-contrato --pliego-*).
// =============================================================================

// --- La lámina ---------------------------------------------------------------
// Lo que se imprime: tipografía, manchas, filetes y marcas.

export { default as PliegoTitulo } from "./PliegoTitulo/PliegoTitulo";
export type { PliegoTituloProps } from "./PliegoTitulo/PliegoTitulo";

export { default as PliegoNumero } from "./PliegoNumero/PliegoNumero";
export type { PliegoNumeroProps } from "./PliegoNumero/PliegoNumero";

export { default as PliegoEtiqueta } from "./PliegoEtiqueta/PliegoEtiqueta";
export type { PliegoEtiquetaProps } from "./PliegoEtiqueta/PliegoEtiqueta";

export { default as PliegoSello } from "./PliegoSello/PliegoSello";
export type { PliegoSelloProps } from "./PliegoSello/PliegoSello";

export { default as PliegoFilete } from "./PliegoFilete/PliegoFilete";
export type { PliegoFileteProps } from "./PliegoFilete/PliegoFilete";

export { default as PliegoCanto } from "./PliegoCanto/PliegoCanto";
export type { PliegoCantoProps } from "./PliegoCanto/PliegoCanto";

export { default as PliegoBloque } from "./PliegoBloque/PliegoBloque";
export type { PliegoBloqueProps } from "./PliegoBloque/PliegoBloque";

export { default as PliegoFicha } from "./PliegoFicha/PliegoFicha";
export type { PliegoFichaProps } from "./PliegoFicha/PliegoFicha";

export { default as PliegoBarra } from "./PliegoBarra/PliegoBarra";
export type { PliegoBarraProps } from "./PliegoBarra/PliegoBarra";

export { default as PliegoRuido } from "./PliegoRuido/PliegoRuido";
export type { PliegoRuidoProps } from "./PliegoRuido/PliegoRuido";

export { default as PliegoPantalla } from "./PliegoPantalla/PliegoPantalla";
export type { PliegoPantallaProps, PliegoPantallaLayout } from "./PliegoPantalla/PliegoPantalla";

// --- El menú -----------------------------------------------------------------
//
// La otra mitad de la familia. Una lámina de imprenta no se toca; un menú de
// juego es SOLO tocarlo. Estas cinco piezas son las que hacen que PLIEGO no
// sea un póster bonito: el encuadre que se cierra sobre lo elegido, la lista
// que se recorre con flechas, la tecla que se invierte al pulsarla, el
// arranque que presenta lo que viene y la placa que pregunta antes de saltar.

export { default as PliegoCorchete } from "./PliegoCorchete/PliegoCorchete";
export type { PliegoCorcheteProps } from "./PliegoCorchete/PliegoCorchete";

export { default as PliegoMenu } from "./PliegoMenu/PliegoMenu";
export type { PliegoMenuProps, PliegoMenuItem } from "./PliegoMenu/PliegoMenu";

export { default as PliegoBoton } from "./PliegoBoton/PliegoBoton";
export type { PliegoBotonProps } from "./PliegoBoton/PliegoBoton";

export { default as PliegoCarga } from "./PliegoCarga/PliegoCarga";
export type { PliegoCargaProps } from "./PliegoCarga/PliegoCarga";

export { default as PliegoAviso } from "./PliegoAviso/PliegoAviso";
export type { PliegoAvisoProps } from "./PliegoAviso/PliegoAviso";

// --- La sala en vivo (conf, 2026-09-25) -------------------------------------
//
// Cuatro piezas que nacieron para conf.aaroidev.com —subtítulos y traducción
// en vivo para conferencias— y que valen fuera de ella: una región de texto
// que se lee en voz alta sin ruido, un campo, una tabla de operación y la
// marca de estado con su cuarto estado sin color.

export { default as PliegoSubtitulos } from "./PliegoSubtitulos/PliegoSubtitulos";
export type { PliegoSubtitulosProps, PliegoSubtituloLinea } from "./PliegoSubtitulos/PliegoSubtitulos";

export { default as PliegoCampo } from "./PliegoCampo/PliegoCampo";
export type { PliegoCampoProps } from "./PliegoCampo/PliegoCampo";

export { default as PliegoEstado } from "./PliegoEstado/PliegoEstado";
export type { PliegoEstadoProps, PliegoEstadoTipo } from "./PliegoEstado/PliegoEstado";

export { default as PliegoTabla } from "./PliegoTabla/PliegoTabla";
export type { PliegoTablaProps, PliegoTablaColumna, PliegoTablaFila } from "./PliegoTabla/PliegoTabla";
