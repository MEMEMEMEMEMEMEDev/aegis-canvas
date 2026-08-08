import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import DisqEmblem from "../DisqEmblem/DisqEmblem";
import type { DisqEmblemShape } from "../DisqEmblem/DisqEmblem";
import "../disquete.scss";
import "./DisqTitle.scss";

export interface DisqTitleProps {
  children: ReactNode;
  /**
   * Las tres celdas del filete de arriba. En la referencia dicen "WRITE ·
   * YOUR · TEXT" porque son un mockup; acá se llenan con datos reales.
   */
  cells?: [string, string, string];
  /**
   * Emblema al final del titular, pedido por NOMBRE de forma y no como nodo.
   *
   * Dos razones: desde una plantilla .astro no se pueden pasar nodos por prop
   * (el JSX de Astro no es un nodo de React), y así el componente decide el
   * tamaño en proporción a SU tipografía — un emblema medido en em desde
   * fuera se vuelve gigante dentro de un titular hero.
   */
  emblem?: DisqEmblemShape;
  /** hero para la portada, card para el titular de una etiqueta. */
  size?: "hero" | "card";
  as?: ElementType;
  className?: string;
}

/**
 * Titular DISQUETE: filete de tres celdas y debajo el nombre en Geist negro
 * con tracking negativo.
 *
 * El filete no es adorno: en una etiqueta impresa esa fila es donde van los
 * datos de catálogo (formato, cara, número), y darle tres celdas obliga a
 * decidir cuáles son los tres datos que importan.
 */
export default function DisqTitle({
  children,
  cells,
  emblem,
  size = "card",
  as: Tag = "h3",
  className,
}: DisqTitleProps) {
  return (
    <div className={cx("disq-title", `disq-title--${size}`, className)}>
      {cells && (
        <p className="disq-title__rule">
          {cells.map((celda, i) => (
            <span className="disq-title__cell" key={i}>
              {celda}
            </span>
          ))}
        </p>
      )}
      <Tag className="disq-title__text">
        <span className="disq-title__words">{children}</span>
        {emblem && (
          <span className="disq-title__emblem">
            <DisqEmblem shape={emblem} size={size === "hero" ? 0.44 : 1.5} />
          </span>
        )}
      </Tag>
    </div>
  );
}
