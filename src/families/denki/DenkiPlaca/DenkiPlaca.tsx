import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiPlaca.scss";

export interface DenkiPlacaProps {
  /**
   * La micro-línea de arriba a la izquierda, tipo número de catálogo.
   *
   * Se llama `codigo` y no `ref` porque `ref` está reservado en React: una
   * prop con ese nombre la intercepta el propio React y no llega nunca.
   */
  codigo?: string;
  /** El pie impreso bajo la ilustración: qué es lo que se está viendo. */
  pie?: string;
  /** Nodo suelto de la esquina superior derecha — la ráfaga de precio. */
  esquina?: ReactNode;
  /** Lo que la placa exhibe. */
  children: ReactNode;
  className?: string;
}

/**
 * LA PLACA DE PRODUCTO: el gran rectángulo negro del póster donde se
 * fotografía la mercancía — semitono de imprenta, marcas de registro en las
 * cuatro esquinas, número de catálogo arriba y pie impreso abajo.
 *
 * Las marcas de registro no son adorno: son las cruces que en imprenta
 * alinean las planchas de cada tinta, y son la razón de que un póster
 * impreso se reconozca como impreso. Acá cumplen el mismo papel — dicen
 * "esto salió de una máquina", que es toda la tesis de la familia.
 */
export default function DenkiPlaca({
  codigo,
  pie,
  esquina,
  children,
  className,
}: DenkiPlacaProps) {
  return (
    <figure className={cx("denki-placa", className)}>
      <span className="denki-placa__marcas" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>

      {codigo && (
        <span className="denki-placa__ref" aria-hidden="true">
          {codigo}
        </span>
      )}

      {esquina && <span className="denki-placa__esquina">{esquina}</span>}

      <div className="denki-placa__escena">{children}</div>

      {pie && <figcaption className="denki-placa__pie">{pie}</figcaption>}
    </figure>
  );
}
