// =============================================================================
// Familia BAZAR — set "portal de la web temprana"
// (referencias-portafolio/2-familia-idea/1..4-idea.png): una página de
// navegador ficticia que vende algo — chrome oscuro, pliego crema, banners
// sesgados, ventanas retro, reseñas con rating, stickers y fichas de
// producto. Todo pegado en ángulo, como calcomanías; nada recto del todo.
//   import { BazarChrome } from "@ahroi/foundation/bazar";
//
// IMPORTANTE: los componentes viven dentro de un contenedor .bazar-scope
// (isla OSCURA que emite el mini-contrato --bazar-*). El BazarChrome pone
// el pliego claro; el resto vive sobre él.
//
// LAS DOS MITADES DE LA FAMILIA
// La referencia no es solo una página: es la UI de un videojuego que
// CONTIENE una página. La primera tanda de piezas construyó el documento
// (chrome, banner, ventana, reseña, ficha); la segunda construye la
// PANTALLA — la carta de agente, el mazo que la elige, el dossier, el
// medidor del HUD, el inventario y el telón por capas. Comparten tokens y
// voz, pero se usan distinto: el documento se lee, la pantalla se maneja.
//
// La mitad "pantalla" NO va dentro de BazarChrome. Encerrarla en el
// navegador ficticio fue el error de la primera vuelta: mete un juego
// dentro de una web dentro de otra web, y lo que se siente al llegar es
// el navegador, no el juego. Sobre el chrome oscuro a secas, la pantalla
// es una pantalla.
// =============================================================================

export { default as BazarChrome } from "./BazarChrome/BazarChrome";
export type { BazarChromeProps } from "./BazarChrome/BazarChrome";

export { default as BazarTabs } from "./BazarTabs/BazarTabs";
export type { BazarTabsProps, BazarTabsItem } from "./BazarTabs/BazarTabs";

export { default as BazarBanner } from "./BazarBanner/BazarBanner";
export type { BazarBannerProps } from "./BazarBanner/BazarBanner";

export { default as BazarWindow } from "./BazarWindow/BazarWindow";
export type { BazarWindowProps } from "./BazarWindow/BazarWindow";

export { default as BazarPlate } from "./BazarPlate/BazarPlate";
export type { BazarPlateProps } from "./BazarPlate/BazarPlate";

export { default as BazarRating } from "./BazarRating/BazarRating";
export type { BazarRatingProps } from "./BazarRating/BazarRating";

export { default as BazarComment } from "./BazarComment/BazarComment";
export type { BazarCommentProps, BazarReplyItem } from "./BazarComment/BazarComment";

export { default as BazarAvatar } from "./BazarAvatar/BazarAvatar";
export type { BazarAvatarProps, BazarAvatarShape } from "./BazarAvatar/BazarAvatar";

export { default as BazarResalte } from "./BazarResalte/BazarResalte";
export type { BazarResalteProps } from "./BazarResalte/BazarResalte";

export { default as BazarSticker } from "./BazarSticker/BazarSticker";
export type { BazarStickerProps } from "./BazarSticker/BazarSticker";

export { default as BazarBarcode } from "./BazarBarcode/BazarBarcode";
export type { BazarBarcodeProps } from "./BazarBarcode/BazarBarcode";

export { default as BazarPill } from "./BazarPill/BazarPill";
export type { BazarPillProps, BazarPillIcon } from "./BazarPill/BazarPill";

export { default as BazarButton } from "./BazarButton/BazarButton";
export type { BazarButtonProps } from "./BazarButton/BazarButton";

export { default as BazarSpecCard } from "./BazarSpecCard/BazarSpecCard";
export type { BazarSpecCardProps, BazarSpecRow } from "./BazarSpecCard/BazarSpecCard";

// --- La pantalla -------------------------------------------------------------

export { default as BazarAgente } from "./BazarAgente/BazarAgente";
export type { BazarAgenteProps } from "./BazarAgente/BazarAgente";

export { default as BazarRoster } from "./BazarRoster/BazarRoster";
export type { BazarRosterProps, BazarRosterItem } from "./BazarRoster/BazarRoster";

export { default as BazarDossier } from "./BazarDossier/BazarDossier";
export type { BazarDossierProps } from "./BazarDossier/BazarDossier";

export { default as BazarMedidor } from "./BazarMedidor/BazarMedidor";
export type { BazarMedidorProps } from "./BazarMedidor/BazarMedidor";

export { default as BazarInventario } from "./BazarInventario/BazarInventario";
export type { BazarInventarioProps } from "./BazarInventario/BazarInventario";

export { default as BazarFondo } from "./BazarFondo/BazarFondo";
export type { BazarFondoProps } from "./BazarFondo/BazarFondo";

// --- El chasis ---------------------------------------------------------------
//
// La familia tenía las piezas de la pantalla pero no el MUEBLE que las
// sostiene, y por eso una vista de BAZAR que no scrollea se quedaba con
// medio viewport en blanco y un telón congelado. Estas cuatro son el mueble:
// el marco que encuadra la consola, la cinta de telemetría del canto, el
// radar que dice que esto está encendido y la cifra a cuerpo de cartel.

export { default as BazarMarco } from "./BazarMarco/BazarMarco";
export type { BazarMarcoProps } from "./BazarMarco/BazarMarco";

export { default as BazarTira } from "./BazarTira/BazarTira";
export type { BazarTiraProps } from "./BazarTira/BazarTira";

export { default as BazarRadar } from "./BazarRadar/BazarRadar";
export type { BazarRadarProps } from "./BazarRadar/BazarRadar";

export { default as BazarNivel } from "./BazarNivel/BazarNivel";
export type { BazarNivelProps } from "./BazarNivel/BazarNivel";
