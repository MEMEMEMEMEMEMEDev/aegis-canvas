import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaMetrica.scss";

export interface BalizaMetricaProps {
  /** "3/4", "0", "4:12". Un guion cuando todavía no hay dato, nunca un 0 falso. */
  valor: ReactNode;
  rotulo: string;
  /** El número se pinta en rojo: hay alertas sin atender. */
  alerta?: boolean;
  className?: string;
}

export default function BalizaMetrica({ valor, rotulo, alerta = false, className }: BalizaMetricaProps) {
  return (
    <div className={cx("baliza-metrica", alerta && "baliza-metrica--alerta", className)}>
      <span className="baliza-metrica__valor">{valor}</span>
      <span className="baliza-metrica__rotulo">{rotulo}</span>
    </div>
  );
}
