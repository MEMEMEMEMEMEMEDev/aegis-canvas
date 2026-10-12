import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaDato.scss";

export interface BalizaDatoProps {
  /** "Vehículo y base", "Condiciones críticas". */
  rotulo: string;
  children: ReactNode;
  /** `caja` lleva borde (la ficha móvil); `suelto` es sólo rótulo y valor. */
  forma?: "caja" | "suelto";
  className?: string;
}

export default function BalizaDato({ rotulo, children, forma = "caja", className }: BalizaDatoProps) {
  return (
    <div className={cx("baliza-dato", `baliza-dato--${forma}`, className)}>
      <span className="baliza-dato__rotulo">{rotulo}</span>
      <div className="baliza-dato__valor">{children}</div>
    </div>
  );
}
