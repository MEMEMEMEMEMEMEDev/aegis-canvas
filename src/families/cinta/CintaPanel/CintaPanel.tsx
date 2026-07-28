import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaPanel.scss";

export interface CintaPanelProps {
  /** Rótulo serigrafiado arriba. */
  label?: string;
  /** Extra a la derecha del rótulo. */
  labelEnd?: ReactNode;
  /** Tornillos en las esquinas (default: sí — es hardware). */
  screws?: boolean;
  /** Cara crema (default), arena o ámbar. */
  tone?: "cream" | "sand" | "amber";
  className?: string;
  children?: ReactNode;
}

/**
 * Panel CINTA: el chasis del dispositivo — cara pastel, borde de tinta,
 * tornillos en cruz en las esquinas. Todo lo que vive dentro es "hardware".
 */
export default function CintaPanel({
  label,
  labelEnd,
  screws = true,
  tone = "cream",
  className,
  children,
}: CintaPanelProps) {
  return (
    <section className={cx("cinta-panel", `cinta-panel--${tone}`, className)}>
      {screws && (
        <>
          <span className="cinta-panel__screw cinta-panel__screw--tl" aria-hidden="true" />
          <span className="cinta-panel__screw cinta-panel__screw--tr" aria-hidden="true" />
          <span className="cinta-panel__screw cinta-panel__screw--bl" aria-hidden="true" />
          <span className="cinta-panel__screw cinta-panel__screw--br" aria-hidden="true" />
        </>
      )}
      {(label || labelEnd) && (
        <header className="cinta-panel__bar">
          {label && <span className="cinta-panel__label">{label}</span>}
          {labelEnd && <span className="cinta-panel__end">{labelEnd}</span>}
        </header>
      )}
      <div className="cinta-panel__body">{children}</div>
    </section>
  );
}
