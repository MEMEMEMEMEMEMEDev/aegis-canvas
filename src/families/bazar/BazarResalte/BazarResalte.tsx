import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarResalte.scss";

export interface BazarResalteProps {
  children: ReactNode;
  className?: string;
}

/**
 * La palabra clave rosa dentro de un panel oscuro, como en las reseñas de
 * la referencia. Es un <strong> de verdad: el énfasis también es semántico.
 */
export default function BazarResalte({ children, className }: BazarResalteProps) {
  return <strong className={cx("bazar-resalte", className)}>{children}</strong>;
}
