import { cx } from "../../../utils/cx";
import { PICTOS_CATEGORIA } from "./pictos-categoria";
import type { PictoCategoriaName } from "./pictos-categoria";
import { PICTOS_UI } from "./pictos-ui";
import type { PictoUiName } from "./pictos-ui";
import "../vitrina.scss";
import "./VitrinaPicto.scss";

export type { PictoCategoriaName, PictoUiName };
export type VitrinaPictoName = PictoUiName | PictoCategoriaName;

export interface VitrinaPictoProps {
  name: VitrinaPictoName;
  /** Lado en píxeles. Default: 24 para los de interfaz, 48 para los de categoría. */
  size?: number;
  /** Con él es una imagen con nombre; sin él, decoración (aria-hidden). */
  label?: string;
  className?: string;
}

const esCategoria = (name: VitrinaPictoName): name is PictoCategoriaName => name in PICTOS_CATEGORIA;

/**
 * Pictograma VITRINA: un solo set de línea, propio, en dos rejillas. Los de
 * 24 son la interfaz (carrito, corazón, lupa…); los de 48 son los carteles
 * de sección que reemplazan a las fotos de producto. Todo `currentColor`,
 * así que heredan la tinta de donde estén — sobre una lámina de color, sobre
 * el bloque negro, dentro de un botón coral.
 */
export default function VitrinaPicto({ name, size, label, className }: VitrinaPictoProps) {
  const categoria = esCategoria(name);
  const lado = size ?? (categoria ? 48 : 24);
  const box = categoria ? 48 : 24;
  return (
    <svg
      className={cx("vitrina-picto", categoria && "vitrina-picto--categoria", className)}
      viewBox={`0 0 ${box} ${box}`}
      width={lado}
      height={lado}
      fill="none"
      stroke="currentColor"
      strokeWidth={categoria ? 2 : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {categoria ? PICTOS_CATEGORIA[name] : PICTOS_UI[name]}
    </svg>
  );
}
