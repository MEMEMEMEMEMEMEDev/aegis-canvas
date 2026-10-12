import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaReservado.scss";

export interface BalizaReservadoProps {
  titulo?: string;
  children: ReactNode;
  /** El botón que pide la llave: "Soy personal de salud – verificar". */
  accion?: ReactNode;
  className?: string;
}

/**
 * Lo que está bajo llave. Ámbar y borde punteado: se ve que existe, se ve
 * que no es para cualquiera, y no se confunde con el rojo de la emergencia.
 */
export default function BalizaReservado({ titulo = "Datos médicos reservados", children, accion, className }: BalizaReservadoProps) {
  return (
    <div className={cx("baliza-reservado", className)}>
      <p className="baliza-reservado__titulo">
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
          <path fill="currentColor" d="M4.5 7V5a3.5 3.5 0 1 1 7 0v2H12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.5Zm1.5 0h4V5a2 2 0 1 0-4 0v2Z" />
        </svg>
        {titulo}
      </p>
      <div className="baliza-reservado__texto">{children}</div>
      {accion && <div className="baliza-reservado__accion">{accion}</div>}
    </div>
  );
}
