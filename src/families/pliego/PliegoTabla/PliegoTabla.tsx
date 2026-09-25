import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoTabla.scss";

export interface PliegoTablaColumna {
  clave: string;
  titulo: ReactNode;
  /** Las cifras a la derecha, con cifras de tabla: se comparan de un vistazo. */
  alinear?: "izq" | "der";
}

export interface PliegoTablaFila {
  /** Estable: la clave de React y la del dato. */
  id: string;
  celdas: Record<string, ReactNode>;
  /** Resalta la fila entera (una sala con problemas). */
  marcada?: boolean;
}

export interface PliegoTablaProps {
  /** Qué es la tabla. Obligatorio: una tabla sin título no se entiende en un lector. */
  titulo: string;
  columnas: PliegoTablaColumna[];
  filas: PliegoTablaFila[];
  /** Lo que se dice cuando no hay filas. */
  vacio?: ReactNode;
  className?: string;
}

/**
 * La tabla de la lámina: filetes de un pelo entre filas, cabecera en micro,
 * sin cajas. Hecha para el panel de producción, donde se lee de arriba abajo
 * buscando la fila rara — por eso `marcada` existe.
 *
 * En un teléfono se desplaza de lado dentro de su propia región, que es
 * enfocable y tiene nombre (una región con scroll a la que el teclado no
 * llega es contenido perdido).
 */
export default function PliegoTabla({ titulo, columnas, filas, vacio, className }: PliegoTablaProps) {
  return (
    <div className={cx("pliego-tabla", className)} role="region" aria-label={titulo} tabIndex={0}>
      <table className="pliego-tabla__tabla">
        <caption className="pliego-tabla__titulo">{titulo}</caption>
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c.clave} scope="col" className={cx(c.alinear === "der" && "pliego-tabla__der")}>
                {c.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr>
              <td colSpan={columnas.length} className="pliego-tabla__vacio">
                {vacio ?? "Nada todavía."}
              </td>
            </tr>
          ) : (
            filas.map((f) => (
              <tr key={f.id} className={cx(f.marcada && "pliego-tabla__fila--marcada")}>
                {columnas.map((c, i) =>
                  i === 0 ? (
                    <th key={c.clave} scope="row" className={cx(c.alinear === "der" && "pliego-tabla__der")}>
                      {f.celdas[c.clave]}
                    </th>
                  ) : (
                    <td key={c.clave} className={cx(c.alinear === "der" && "pliego-tabla__der")}>
                      {f.celdas[c.clave]}
                    </td>
                  ),
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
