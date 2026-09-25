import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoEstado.scss";

/**
 *   bien    el instrumento midió y está bien       cuadro macizo en tinta
 *   mal     el instrumento midió y algo está mal   cuadro macizo en ROSA
 *   aviso   se sostiene, con algo colgando         cuadro hueco
 *   sinver  no se pudo mirar                       TRAMA, sin color
 *
 * La misma ley que ATALAYA, dicha con el único color de PLIEGO: el rosa es
 * el gasto de la familia y aquí se gasta en lo que hay que mirar. El
 * cuarto estado no es verde ni gris: es trama, para que nadie lo lea como
 * "todo bien" (un sensor que no responde no es un sensor que dice cero).
 */
export type PliegoEstadoTipo = "bien" | "mal" | "aviso" | "sinver";

export interface PliegoEstadoProps {
  estado: PliegoEstadoTipo;
  children?: ReactNode;
  /** Lo que lee un lector de pantalla. Por defecto, el estado en palabras. */
  etiqueta?: string;
  className?: string;
}

const DICHO: Record<PliegoEstadoTipo, string> = {
  bien: "bien",
  mal: "mal",
  aviso: "aviso",
  sinver: "no se pudo medir",
};

export default function PliegoEstado({ estado, children, etiqueta, className }: PliegoEstadoProps) {
  return (
    <span className={cx("pliego-estado", `pliego-estado--${estado}`, className)}>
      <span className="pliego-estado__marca" aria-hidden="true" />
      <span className="pliego-estado__sr">{etiqueta ?? DICHO[estado]}</span>
      {children != null && <span className="pliego-estado__texto">{children}</span>}
    </span>
  );
}
