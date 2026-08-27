import type { ElementType, ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoGlobo.scss";

export type CalcoGloboCola = "abajo-izq" | "abajo-der" | "arriba-izq" | "arriba-der" | "izq" | "der";

export interface CalcoGloboProps {
  /** Hacia dónde apunta el rabo. */
  cola?: CalcoGloboCola;
  tono?: CalcoTono;
  /** Grados de giro. Un globo pegado tampoco va recto. */
  giro?: number;
  /** Un grito: texto grande en display, como "¡OMG!". */
  grito?: boolean;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

/**
 * El globo de cómic: la burbuja con rabo de las referencias. Sirve para una
 * nota al margen ("ninguno de estos pasos es negociable"), un aviso o un
 * grito de una palabra.
 *
 * El rabo es un cuadrado girado 45° con borde en dos lados, apoyado en el
 * borde del globo y tapando la línea con su propio fondo. Un solo pseudo-
 * elemento; sin SVG.
 */
export default function CalcoGlobo({
  cola = "abajo-izq",
  tono = "crema",
  giro = 0,
  grito = false,
  as: Tag = "div",
  className,
  children,
}: CalcoGloboProps) {
  return (
    <Tag
      className={cx("calco-globo", `calco-globo--${tono}`, `calco-globo--cola-${cola}`, grito && "calco-globo--grito", className)}
      style={{ "--calco-giro": `${giro}deg` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
