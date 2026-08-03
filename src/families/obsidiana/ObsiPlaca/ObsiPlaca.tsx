import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiPlaca.scss";

export interface ObsiPlacaProps {
  /** Rótulo mono en cian sobre el título. */
  eyebrow?: string;
  /** Título display. */
  title: ReactNode;
  /** Texto o nodos bajo el título. */
  children?: ReactNode;
  /** Placa sobre panel tallado (bisel) en vez de flotante. Default: false. */
  raised?: boolean;
  className?: string;
}

/**
 * Placa OBSIDIANA: el rótulo de identificación de la galería — eyebrow mono,
 * título display y una hairline sesgada como base. Es el encabezado estándar
 * de secciones y fichas.
 */
export default function ObsiPlaca({
  eyebrow,
  title,
  children,
  raised = false,
  className,
}: ObsiPlacaProps) {
  return (
    <header className={cx("obsi-placa", raised && "obsi-placa--raised", className)}>
      {eyebrow && <p className="obsi-placa__eyebrow">{eyebrow}</p>}
      <h2 className="obsi-placa__title">{title}</h2>
      {children && <div className="obsi-placa__body">{children}</div>}
    </header>
  );
}
