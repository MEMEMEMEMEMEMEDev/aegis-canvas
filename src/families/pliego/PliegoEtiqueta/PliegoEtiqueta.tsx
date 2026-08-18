import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoEtiqueta.scss";

export interface PliegoEtiquetaProps {
  children: ReactNode;
  /**
   * `linea` caja de un pelo · `rosa` maciza · `tinta` maciza negra ·
   * `corchete` sin caja, entre corchetes como en la referencia.
   */
  tone?: "linea" | "rosa" | "tinta" | "corchete";
  size?: "sm" | "md";
  as?: ElementType;
  className?: string;
}

/**
 * La cápsula de la referencia: `[ music ]  [ lyricist ]  [ vocalist ]`.
 *
 * En `rosa` el texto va en tinta negra y no en blanco, y eso no es una
 * preferencia: blanco sobre este rosa se queda en 3,6:1 y la tinta llega a
 * 5,1:1. La familia tiene un solo color saturado y esta es la regla que
 * impide gastarlo mal.
 */
export default function PliegoEtiqueta({
  children,
  tone = "linea",
  size = "sm",
  as: Tag = "span",
  className,
}: PliegoEtiquetaProps) {
  return (
    <Tag className={cx("pliego-etiqueta", `pliego-etiqueta--${tone}`, `pliego-etiqueta--${size}`, className)}>
      {children}
    </Tag>
  );
}
