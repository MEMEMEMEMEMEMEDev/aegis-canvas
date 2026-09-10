import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaFila.scss";

export interface AtalayaFilaProps {
  /** Lo primero que se lee: el nombre de la cosa. */
  titulo: ReactNode;
  /** La marca de estado, o cualquier cosa que vaya antes del título. */
  marca?: ReactNode;
  /** Segunda línea: el dominio, la ruta, el detalle técnico. */
  sub?: ReactNode;
  /** Columna de la derecha: cifras, la hora, un botón. */
  fin?: ReactNode;
  /** Una línea que explica un estado torcido. Se muestra a ancho completo. */
  porque?: ReactNode;
  /** Cuando la fila entera lleva a algún lado. */
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * La fila de una lista densa: organizaciones, servicios, medidas, fases.
 *
 * La regla que se repite en todas: el porqué de un estado torcido va DEBAJO
 * y a ancho completo, nunca apretado en la columna de la derecha. Un rojo
 * sin su explicación al lado obliga a irse a los logs, y ese viaje es donde
 * se pierde la tarde.
 */
export default function AtalayaFila({
  titulo,
  marca,
  sub,
  fin,
  porque,
  href,
  onClick,
  className,
}: AtalayaFilaProps) {
  const interactiva = Boolean(href || onClick);
  const Cuerpo = (
    <>
      <span className="atalaya-fila__cabeza">
        {marca}
        <span className="atalaya-fila__titulo">{titulo}</span>
      </span>
      {fin != null && <span className="atalaya-fila__fin">{fin}</span>}
      {sub != null && <span className="atalaya-fila__sub">{sub}</span>}
      {porque != null && <span className="atalaya-fila__porque">{porque}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cx("atalaya-fila", "atalaya-fila--toca", className)}
      >
        {Cuerpo}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx("atalaya-fila", "atalaya-fila--toca", className)}
      >
        {Cuerpo}
      </button>
    );
  }
  return (
    <div className={cx("atalaya-fila", className)} data-interactiva={interactiva}>
      {Cuerpo}
    </div>
  );
}
