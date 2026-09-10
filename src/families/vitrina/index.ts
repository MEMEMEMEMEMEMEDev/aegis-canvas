// =============================================================================
// Familia VITRINA — "marketplace de barrio grande"
// (referencias-portafolio/10-familia-idea/01.png y 02.png): el escaparate
// de una tienda que vende de todo — blanco de vitrina, gris cálido donde se
// apoyan las cosas, esquinas de etiqueta de precio y UN coral que se gasta
// solo en lo que pide que lo toques. Nada de fotos: cada producto es una
// lámina de color plano con su pictograma. Esa es la mitad que NAVEGA.
//
// La otra mitad TRANSACCIONA y cambia de voz sin cambiar de contrato: al
// pagar el fondo pasa a gris de boleta, el titular es UNA palabra gigante
// en mayúsculas condensadas, los inputs son una línea y el botón un bloque
// negro a todo ancho.
//   import { VitrinaTarjeta } from "@ahroi/foundation/vitrina";
//
// La tienda completa (todas las pantallas, con estado y persistencia) vive
// en ./tienda y se exporta como <Tienda/>: montable como isla React.
//
// IMPORTANTE: los componentes viven dentro de .vitrina-scope (isla clara
// que emite el mini-contrato --vitrina-*). REGLA DE CONTRASTE: tinta sobre
// todo lo claro; blanco solo sobre bloque/coral-hondo/ok/error; el coral de
// relleno lleva tinta; el coral como texto es --vitrina-coral-tinta.
// =============================================================================

// --- Cimientos ---------------------------------------------------------------

export { default as VitrinaBoton } from "./VitrinaBoton/VitrinaBoton";
export type { VitrinaBotonProps } from "./VitrinaBoton/VitrinaBoton";

export { default as VitrinaTitular } from "./VitrinaTitular/VitrinaTitular";
export type { VitrinaTitularProps } from "./VitrinaTitular/VitrinaTitular";

export { default as VitrinaPicto } from "./VitrinaPicto/VitrinaPicto";
export type { VitrinaPictoProps, VitrinaPictoName, PictoUiName, PictoCategoriaName } from "./VitrinaPicto/VitrinaPicto";

// --- Catálogo (la mitad que NAVEGA) -----------------------------------------

export { default as VitrinaLamina } from "./VitrinaLamina/VitrinaLamina";
export type { VitrinaLaminaProps } from "./VitrinaLamina/VitrinaLamina";

export { default as VitrinaPrecio } from "./VitrinaPrecio/VitrinaPrecio";
export type { VitrinaPrecioProps } from "./VitrinaPrecio/VitrinaPrecio";

export { default as VitrinaSello } from "./VitrinaSello/VitrinaSello";
export type { VitrinaSelloProps, VitrinaSelloTono } from "./VitrinaSello/VitrinaSello";

export { default as VitrinaEstrellas } from "./VitrinaEstrellas/VitrinaEstrellas";
export type { VitrinaEstrellasProps } from "./VitrinaEstrellas/VitrinaEstrellas";

export { default as VitrinaTarjeta } from "./VitrinaTarjeta/VitrinaTarjeta";
export type { VitrinaTarjetaProps, VitrinaTarjetaProducto } from "./VitrinaTarjeta/VitrinaTarjeta";

export { default as VitrinaChip, VitrinaChipFila } from "./VitrinaChip/VitrinaChip";
export type { VitrinaChipProps } from "./VitrinaChip/VitrinaChip";

export { default as VitrinaLoseta } from "./VitrinaLoseta/VitrinaLoseta";
export type { VitrinaLosetaProps } from "./VitrinaLoseta/VitrinaLoseta";

export { default as VitrinaCartel, VitrinaCartelFranja } from "./VitrinaCartel/VitrinaCartel";
export type { VitrinaCartelProps, VitrinaCartelAccion, VitrinaCartelFranjaItem } from "./VitrinaCartel/VitrinaCartel";

export { default as VitrinaCarrusel } from "./VitrinaCarrusel/VitrinaCarrusel";
export type { VitrinaCarruselProps } from "./VitrinaCarrusel/VitrinaCarrusel";

export { default as VitrinaCuenta } from "./VitrinaCuenta/VitrinaCuenta";
export type { VitrinaCuentaProps } from "./VitrinaCuenta/VitrinaCuenta";

// --- Mueble (el chasis de la tienda) -----------------------------------------

export { default as VitrinaMarco } from "./VitrinaMarco/VitrinaMarco";
export type { VitrinaMarcoProps } from "./VitrinaMarco/VitrinaMarco";

export { default as VitrinaCabecera } from "./VitrinaCabecera/VitrinaCabecera";
export type { VitrinaCabeceraProps, VitrinaCabeceraDestino } from "./VitrinaCabecera/VitrinaCabecera";

export { default as VitrinaPestanas } from "./VitrinaPestanas/VitrinaPestanas";
export type { VitrinaPestanasProps, VitrinaPestanaItem } from "./VitrinaPestanas/VitrinaPestanas";

export { default as VitrinaCajon } from "./VitrinaCajon/VitrinaCajon";
export type { VitrinaCajonProps } from "./VitrinaCajon/VitrinaCajon";

export { default as VitrinaPie } from "./VitrinaPie/VitrinaPie";
export type { VitrinaPieProps, VitrinaPieColumna } from "./VitrinaPie/VitrinaPie";

export { default as VitrinaVacio } from "./VitrinaVacio/VitrinaVacio";
export type { VitrinaVacioProps } from "./VitrinaVacio/VitrinaVacio";

// --- Formulario (la mitad que TRANSACCIONA) ----------------------------------

export { default as VitrinaCampo } from "./VitrinaCampo/VitrinaCampo";
export type { VitrinaCampoProps } from "./VitrinaCampo/VitrinaCampo";

export { default as VitrinaEntrada, VitrinaArea, VitrinaSelect } from "./VitrinaEntrada/VitrinaEntrada";
export type { VitrinaEntradaProps, VitrinaEntradaAccion, VitrinaAreaProps, VitrinaSelectProps } from "./VitrinaEntrada/VitrinaEntrada";

export { default as VitrinaOpcion, VitrinaOpcionGrupo } from "./VitrinaOpcion/VitrinaOpcion";
export type { VitrinaOpcionProps, VitrinaOpcionGrupoProps } from "./VitrinaOpcion/VitrinaOpcion";

export { default as VitrinaSelector } from "./VitrinaSelector/VitrinaSelector";
export type { VitrinaSelectorProps, VitrinaSelectorOpcion } from "./VitrinaSelector/VitrinaSelector";

export { default as VitrinaCantidad } from "./VitrinaCantidad/VitrinaCantidad";
export type { VitrinaCantidadProps } from "./VitrinaCantidad/VitrinaCantidad";

// --- Transacción y datos -----------------------------------------------------

export { default as VitrinaPasos } from "./VitrinaPasos/VitrinaPasos";
export type { VitrinaPasosProps } from "./VitrinaPasos/VitrinaPasos";

export { default as VitrinaLinea } from "./VitrinaLinea/VitrinaLinea";
export type { VitrinaLineaProps, VitrinaLineaDatos } from "./VitrinaLinea/VitrinaLinea";

export { default as VitrinaTotales } from "./VitrinaTotales/VitrinaTotales";
export type { VitrinaTotalesProps } from "./VitrinaTotales/VitrinaTotales";

export { default as VitrinaCronologia } from "./VitrinaCronologia/VitrinaCronologia";
export type { VitrinaCronologiaProps, VitrinaHito } from "./VitrinaCronologia/VitrinaCronologia";

// --- Feedback y carga --------------------------------------------------------

export { default as VitrinaHueso, VitrinaHuesoGrupo, VitrinaHuesoTarjeta, VitrinaHuesoLinea } from "./VitrinaHueso/VitrinaHueso";
export type { VitrinaHuesoProps } from "./VitrinaHueso/VitrinaHueso";

export { default as VitrinaCarga } from "./VitrinaCarga/VitrinaCarga";
export type { VitrinaCargaProps } from "./VitrinaCarga/VitrinaCarga";

export { default as VitrinaAviso, VitrinaAvisoPila } from "./VitrinaAviso/VitrinaAviso";
export type { VitrinaAvisoProps } from "./VitrinaAviso/VitrinaAviso";

export { default as VitrinaDialogo } from "./VitrinaDialogo/VitrinaDialogo";
export type { VitrinaDialogoProps } from "./VitrinaDialogo/VitrinaDialogo";

// --- Hooks de la familia -----------------------------------------------------

export { useVueloAlCarrito } from "./useVueloAlCarrito";
export { useReposo } from "./useReposo";

// --- La tienda completa --------------------------------------------------------

export { default as Tienda, borrarTienda } from "./tienda/Tienda";
export type { TiendaProps } from "./tienda/Tienda";
export type { Ruta as TiendaRuta } from "./tienda/ruta";
