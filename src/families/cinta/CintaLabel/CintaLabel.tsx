import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaLabel.scss";

export interface CintaLabelProps {
  /** Carácter/cifra gigante del encabezado ("2", "A"). */
  big?: string;
  /** Rótulo bajo la cifra ("SPECS"). */
  heading?: string;
  /** Filas clave→valor de la ficha. */
  rows: Array<[string, string]>;
  /** Extra al pie (antes de los carretes perforados). */
  footer?: ReactNode;
  className?: string;
}

/**
 * Etiqueta CINTA: el recibo de especificaciones del póster — cartón
 * blanco, cifra enorme, filas de specs y las dos perforaciones de
 * carrete abajo.
 */
export default function CintaLabel({
  big,
  heading = "Specs",
  rows,
  footer,
  className,
}: CintaLabelProps) {
  return (
    <aside className={cx("cinta-label", className)}>
      {big && <span className="cinta-label__big">{big}</span>}
      <span className="cinta-label__heading">→ {heading}</span>
      <dl className="cinta-label__rows">
        {rows.map(([k, v]) => (
          <div className="cinta-label__row" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {footer && <div className="cinta-label__footer">{footer}</div>}
      <span className="cinta-label__holes" aria-hidden="true">
        <span />
        <span />
      </span>
    </aside>
  );
}
