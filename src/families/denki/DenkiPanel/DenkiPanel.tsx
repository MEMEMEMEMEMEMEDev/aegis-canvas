import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiPanel.scss";

export interface DenkiPanelProps {
  /** Panel negro con trama de semitono (default) o papel. */
  tone?: "panel" | "paper";
  /** Barra-rótulo superior de ficha técnica ("PRO GRADE FIGHTSTICK"). */
  label?: string;
  /** Contenido extra a la derecha del rótulo. */
  labelEnd?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Panel DENKI: el bloque impreso del póster — negro con puntos de semitono
 * o papel enmarcado, con barra-rótulo de catálogo arriba.
 */
export default function DenkiPanel({
  tone = "panel",
  label,
  labelEnd,
  className,
  children,
}: DenkiPanelProps) {
  return (
    <section className={cx("denki-panel", `denki-panel--${tone}`, className)}>
      {(label || labelEnd) && (
        <header className="denki-panel__bar">
          {label && (
            <span className="denki-panel__label">
              <span aria-hidden="true">▚ </span>
              {label}
            </span>
          )}
          {labelEnd && <span className="denki-panel__end">{labelEnd}</span>}
        </header>
      )}
      <div className="denki-panel__body">{children}</div>
    </section>
  );
}
