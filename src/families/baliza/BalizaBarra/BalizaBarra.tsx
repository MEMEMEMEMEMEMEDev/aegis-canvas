import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaBarra.scss";

export interface BalizaBarraProps {
  marca?: string;
  sub?: string;
  /** A la derecha: la persona conectada, el estado de la conexión. */
  fin?: ReactNode;
  className?: string;
}

/** La cabecera del panel y la consola: marca, bajada y lo que sea del turno. */
export default function BalizaBarra({
  marca = "SOS Ruta",
  sub = "Plataforma de respuesta a emergencias en terreno",
  fin,
  className,
}: BalizaBarraProps) {
  return (
    <header className={cx("baliza-barra", className)}>
      <div className="baliza-barra__marca">
        <span className="baliza-barra__nombre">{marca}</span>
        {sub && <span className="baliza-barra__sub">{sub}</span>}
      </div>
      {fin && <div className="baliza-barra__fin">{fin}</div>}
    </header>
  );
}
