// =============================================================================
// Familia CALCO — "álbum de calcomanías"
// (referencias-portafolio/9-familia-idea/01..03-idea.png, copiadas a
// refs/11-calco-*.png): neobrutalismo de cartel — tinta gorda, colores
// planos saturados, sombra dura, stickers pegados en ángulo, globos de
// cómic y ventanas de sistema operativo viejo. Y encima, la mecánica de la
// pantalla de inicio de una consola: losetas, una ventana, un dock, una
// hoja que sube. Sin scroll de página.
//   import { CalcoLienzo } from "@ahroi/foundation/calco";
//
// IMPORTANTE: los componentes viven dentro de un contenedor .calco-scope
// (isla CLARA que emite el mini-contrato --calco-*).
//
// LAS TRES CAPAS DE LA FAMILIA
//   El MUEBLE: lienzo, cabecera, ventana, loseta, dock, hoja, carrete. Es
//   la consola: lo que se maneja.
//   El ÁLBUM: pegatina, chapa, globo, botón, marco, titular. Es lo que se
//   pega encima: la voz.
//   Los INSTRUMENTOS: contador, barra, semáforo. Es lo que dice cifras y
//   estados de verdad — nunca decoración con números.
// =============================================================================

// --- El mueble ---------------------------------------------------------------

export { default as CalcoLienzo } from "./CalcoLienzo/CalcoLienzo";
export type { CalcoLienzoProps, CalcoTono } from "./CalcoLienzo/CalcoLienzo";

export { default as CalcoCabecera } from "./CalcoCabecera/CalcoCabecera";
export type { CalcoCabeceraProps } from "./CalcoCabecera/CalcoCabecera";

export { default as CalcoVentana } from "./CalcoVentana/CalcoVentana";
export type { CalcoVentanaProps } from "./CalcoVentana/CalcoVentana";

export { default as CalcoLoseta } from "./CalcoLoseta/CalcoLoseta";
export type { CalcoLosetaProps } from "./CalcoLoseta/CalcoLoseta";

export { default as CalcoDock } from "./CalcoDock/CalcoDock";
export type { CalcoDockProps, CalcoDockItem } from "./CalcoDock/CalcoDock";

export { default as CalcoHoja } from "./CalcoHoja/CalcoHoja";
export type { CalcoHojaProps } from "./CalcoHoja/CalcoHoja";

export { default as CalcoCarrete } from "./CalcoCarrete/CalcoCarrete";
export type { CalcoCarreteProps } from "./CalcoCarrete/CalcoCarrete";

// --- El álbum ----------------------------------------------------------------

export { default as CalcoPegatina } from "./CalcoPegatina/CalcoPegatina";
export type { CalcoPegatinaProps, CalcoPegatinaForma } from "./CalcoPegatina/CalcoPegatina";

export { default as CalcoChapa } from "./CalcoChapa/CalcoChapa";
export type { CalcoChapaProps } from "./CalcoChapa/CalcoChapa";

export { default as CalcoGlobo } from "./CalcoGlobo/CalcoGlobo";
export type { CalcoGloboProps, CalcoGloboCola } from "./CalcoGlobo/CalcoGlobo";

export { default as CalcoBoton } from "./CalcoBoton/CalcoBoton";
export type { CalcoBotonProps } from "./CalcoBoton/CalcoBoton";

export { default as CalcoMarco } from "./CalcoMarco/CalcoMarco";
export type { CalcoMarcoProps } from "./CalcoMarco/CalcoMarco";

export { default as CalcoTitular } from "./CalcoTitular/CalcoTitular";
export type { CalcoTitularProps } from "./CalcoTitular/CalcoTitular";

// --- Los instrumentos --------------------------------------------------------

export { default as CalcoContador } from "./CalcoContador/CalcoContador";
export type { CalcoContadorProps } from "./CalcoContador/CalcoContador";

export { default as CalcoBarra } from "./CalcoBarra/CalcoBarra";
export type { CalcoBarraProps } from "./CalcoBarra/CalcoBarra";

export { default as CalcoSemaforo } from "./CalcoSemaforo/CalcoSemaforo";
export type { CalcoSemaforoProps, CalcoSemaforoEstado } from "./CalcoSemaforo/CalcoSemaforo";
