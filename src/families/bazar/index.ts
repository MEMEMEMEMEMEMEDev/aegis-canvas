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
