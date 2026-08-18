import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoBloque.scss";

export interface PliegoBloqueProps {
  children?: ReactNode;
  /** El relleno del bloque. `rosa` es el gasto del único color saturado. */
  tone?: "rosa" | "tinta" | "hoja";
  /** Nota diminuta abajo a la izquierda, como el `[nly]` de la referencia. */
  pie?: string;
  /** Marca de registro en la esquina superior izquierda. */
  registro?: boolean;
  /** Proporción de la caja: "1 / 1", "16 / 10"… Sin ella, la marca el hijo. */
  ratio?: string;
  className?: string;
}

/**
 * El bloque plano: el rectángulo de color macizo que ancla la composición.
 *
 * En la referencia es lo primero que ve el ojo y está VACÍO — su trabajo es
 * pesar. Aquí acepta hijos (una maqueta, una captura) porque en un
 * portafolio el hueco de color es donde va la prueba; sin hijos sigue
 * funcionando como mancha.
 */
export default function PliegoBloque({
  children,
  tone = "rosa",
  pie,
  registro = true,
  ratio,
  className,
}: PliegoBloqueProps) {
  return (
    <div
      className={cx(
        "pliego-bloque",
        `pliego-bloque--${tone}`,
        // Con hijos el bloque deja de ser una mancha y pasa a ser un MONTAJE:
        // la marca de registro y el pie necesitan su margen, o se imprimen
        // encima de lo que hay dentro. Vacío no hace falta y el bloque llega
        // a los bordes, que es como está en la referencia.
        Boolean(children) && "pliego-bloque--montaje",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {registro && <span className="pliego-bloque__registro" aria-hidden="true" />}
      {children && <div className="pliego-bloque__cuerpo">{children}</div>}
      {pie && (
        <span className="pliego-bloque__pie" aria-hidden="true">
          {pie}
        </span>
      )}
    </div>
  );
}
