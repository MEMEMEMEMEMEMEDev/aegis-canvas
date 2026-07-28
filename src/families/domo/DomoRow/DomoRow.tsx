import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoRow.scss";

export interface DomoRowsProps {
  /** grid-template-columns compartido por todas las filas (alinea columnas). */
  template?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Grupo de filas DOMO: la tabla WEEKDAYS/DAY OFF/SUNDAY de la referencia.
 * Define la plantilla de columnas que cada DomoRow hereda, y separa
 * filas con divisores hairline.
 */
export function DomoRows({ template = "1fr auto", className, children }: DomoRowsProps) {
  return (
    <div
      className={cx("domo-rows", className)}
      style={{ "--domo-row-template": template } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface DomoRowProps {
  /** Celdas de datos, una por columna de la plantilla. */
  cells: ReactNode[];
  /** Control al final de la fila (toggle, botón…), fuera de la plantilla. */
  control?: ReactNode;
  /** Fila activa: pasa a negrita (como DAY OFF en la referencia). */
  active?: boolean;
  className?: string;
}

/**
 * Fila de datos DOMO: celdas alineadas a la plantilla del grupo + control
 * opcional al final.
 */
export function DomoRow({ cells, control, active = false, className }: DomoRowProps) {
  return (
    <div className={cx("domo-row", active && "is-active", className)}>
      <div className="domo-row__cells">
        {cells.map((cell, i) => (
          <span className="domo-row__cell" key={i}>
            {cell}
          </span>
        ))}
      </div>
      {control && <span className="domo-row__control">{control}</span>}
    </div>
  );
}
