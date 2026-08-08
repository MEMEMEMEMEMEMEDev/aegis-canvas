import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import DisqBadge from "../DisqBadge/DisqBadge";
import DisqBarcode from "../DisqBarcode/DisqBarcode";
import DisqRows from "../DisqRows/DisqRows";
import DisqStripes from "../DisqStripes/DisqStripes";
import DisqTitle from "../DisqTitle/DisqTitle";
import "../disquete.scss";
import "./DisqLabel.scss";

export interface DisqLabelProps {
  /** El nombre grande. */
  title: string;
  /** Las tres celdas del filete de catálogo. */
  cells?: [string, string, string];
  /** Una línea de resumen bajo el titular. */
  summary?: string;
  /** Entradas de la lista corrida (tecnologías, pistas, capítulos…). */
  items?: string[];
  /** Sello de certificación al pie. */
  badge?: { mark: string; lines: [string, string] };
  /** Dígitos del código de barras. Sin esto, no se imprime. */
  code?: string;
  /** Texto rotado en el canto derecho. */
  side?: string;
  /** Bandas de color al pie. */
  stripes?: boolean;
  /** Contenido extra antes del pie. */
  children?: ReactNode;
  className?: string;
}

/**
 * Etiqueta DISQUETE: la composición completa de una etiqueta impresa, que es
 * lo que va dentro de un DisqDisk.
 *
 * Existe como componente y no como receta a copiar porque el ORDEN es la
 * mitad del diseño: filete de catálogo, titular, resumen, lista, y al pie el
 * bloque de sello + código de barras. Cada etiqueta de la referencia respeta
 * esa jerarquía, y es lo que hace que ocho discos distintos se lean como la
 * misma colección.
 */
export default function DisqLabel({
  title,
  cells,
  summary,
  items,
  badge,
  code,
  side,
  stripes = false,
  children,
  className,
}: DisqLabelProps) {
  return (
    <span className={cx("disq-label", side && "disq-label--conlomo", className)}>
      <span className="disq-label__main">
        <DisqTitle cells={cells} emblem="globe">
          {title}
        </DisqTitle>

        {summary && <span className="disq-label__summary">{summary}</span>}

        {items && items.length > 0 && <DisqRows items={items} layout="inline" />}

        {children}

        {(badge || code) && (
          <span className="disq-label__foot">
            {badge && <DisqBadge mark={badge.mark} lines={badge.lines} />}
            {code && <DisqBarcode code={code} height={26} />}
          </span>
        )}

        {stripes && <DisqStripes height={2.4} step />}
      </span>

      {/* El canto rotado: en la etiqueta impresa es el lomo, lo que se lee
          cuando el disco está de pie en la caja. */}
      {side && <span className="disq-label__side">{side}</span>}
    </span>
  );
}
