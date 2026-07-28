import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoPanel.scss";

export interface DomoPanelProps {
  /** Rótulo del instrumento (mayúsculas pequeñas). */
  title?: string;
  /** Estado secundario junto al título ("Activo", "Editar"…). */
  status?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Panel DOMO: el módulo bordeado del tablero (RADIATORS / PANELS de la
 * referencia). Cabecera con rótulo + estado, cuerpo denso, pie opcional.
 */
export default function DomoPanel({
  title,
  status,
  footer,
  className,
  children,
}: DomoPanelProps) {
  return (
    <section className={cx("domo-panel", className)}>
      {(title || status) && (
        <header className="domo-panel__head">
          {title && <h3 className="domo-panel__title">{title}</h3>}
          {status && <span className="domo-panel__status">{status}</span>}
        </header>
      )}
      <div className="domo-panel__body">{children}</div>
      {footer && <footer className="domo-panel__foot">{footer}</footer>}
    </section>
  );
}
