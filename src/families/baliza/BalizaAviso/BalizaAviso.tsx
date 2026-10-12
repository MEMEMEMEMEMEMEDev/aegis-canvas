import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaAviso.scss";

export interface BalizaAvisoProps {
  /**
   * `info` (azul), `bien` (verde: "ubicación enviada"), `cuidado` (ámbar:
   * sin conexión, demo) y `grave` (rojo: sólo cuando de eso depende que
   * alguien reciba ayuda, p. ej. "las alertas NO están llegando").
   */
  tono?: "info" | "bien" | "cuidado" | "grave";
  titulo?: ReactNode;
  children?: ReactNode;
  icono?: ReactNode;
  /** Botón o enlace a la derecha. */
  accion?: ReactNode;
  /** Se anuncia al aparecer (role=status, o alert si es grave). */
  vivo?: boolean;
  className?: string;
}

export default function BalizaAviso({ tono = "info", titulo, children, icono, accion, vivo = false, className }: BalizaAvisoProps) {
  const rol = vivo ? (tono === "grave" ? "alert" : "status") : undefined;
  return (
    <div className={cx("baliza-aviso", `baliza-aviso--${tono}`, className)} role={rol}>
      {icono && <span className="baliza-aviso__icono" aria-hidden="true">{icono}</span>}
      <div className="baliza-aviso__texto">
        {titulo && <strong className="baliza-aviso__titulo">{titulo}</strong>}
        {children && <span>{children}</span>}
      </div>
      {accion && <div className="baliza-aviso__accion">{accion}</div>}
    </div>
  );
}
