import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaTabla.scss";

export interface BalizaColumna<T> {
  id: string;
  titulo: string;
  celda: (fila: T) => ReactNode;
  /** Columna numérica o de hora: alineada a la derecha. */
  derecha?: boolean;
}

export interface BalizaTablaProps<T> {
  /** Lo que lee un lector de pantalla antes de la tabla. */
  titulo: string;
  columnas: BalizaColumna<T>[];
  filas: T[];
  clave: (fila: T) => string;
  /** Qué decir cuando no hay filas. */
  vacio?: ReactNode;
  className?: string;
}

/** El historial de activaciones. En pantallas angostas se desplaza dentro de su caja. */
export default function BalizaTabla<T>({ titulo, columnas, filas, clave, vacio = "Sin registros", className }: BalizaTablaProps<T>) {
  return (
    <div className={cx("baliza-tabla", className)} role="region" aria-label={titulo} tabIndex={0}>
      <table>
        <caption className="baliza-oculto">{titulo}</caption>
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c.id} scope="col" className={cx(c.derecha && "is-derecha")}>{c.titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr><td colSpan={columnas.length} className="baliza-tabla__vacio">{vacio}</td></tr>
          ) : (
            filas.map((f) => (
              <tr key={clave(f)}>
                {columnas.map((c) => (
                  <td key={c.id} className={cx(c.derecha && "is-derecha")}>{c.celda(f)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
