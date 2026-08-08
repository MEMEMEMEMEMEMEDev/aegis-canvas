import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqSleeve.scss";

export interface DisqSleeveProps {
  /** Lo que va dentro de la funda: normalmente un DisqDisk. */
  children: ReactNode;
  /** Reflejo apagado, para cuando hay muchas fundas juntas. */
  matte?: boolean;
  className?: string;
}

/**
 * Funda DISQUETE: el sobre de plástico transparente de la referencia 3.
 *
 * Son dos cosas a la vez: un borde de plástico un poco más grande que el
 * disco, y un par de reflejos diagonales por encima. El reflejo va con
 * `mix-blend-mode` para que se apoye en el color del disco que envuelve —
 * pintarlo con un blanco fijo lo convertiría en una banda pegada encima.
 */
export default function DisqSleeve({ children, matte = false, className }: DisqSleeveProps) {
  return (
    <span className={cx("disq-sleeve", matte && "disq-sleeve--matte", className)}>
      <span className="disq-sleeve__inner">{children}</span>
      <span className="disq-sleeve__sheen" aria-hidden="true" />
    </span>
  );
}
