import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeNota.scss";

export interface BeigeNotaProps {
  children: ReactNode;
  /** Título en negrita de cromo, como los tooltips con encabezado. */
  titulo?: string;
  className?: string;
}

/** La nota amarilla: el tooltip del sistema, ahora como tarjeta de texto. */
export default function BeigeNota({ children, titulo, className }: BeigeNotaProps) {
  return (
    <div className={cx("beige-nota", className)}>
      {titulo && <span className="beige-nota__titulo">{titulo}</span>}
      <div className="beige-nota__texto">{children}</div>
    </div>
  );
}
