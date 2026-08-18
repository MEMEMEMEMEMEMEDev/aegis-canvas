import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoCorchete.scss";

export interface PliegoCorcheteProps {
  children: ReactNode;
  /** Las escuadras se cierran sobre la pieza. */
  activo?: boolean;
  tone?: "tinta" | "rosa";
  as?: ElementType;
  className?: string;
}

/**
 * Las cuatro escuadras que encuadran la pieza seleccionada — el gesto de
 * menú de videojuego, traído a la lámina de imprenta.
 *
 * Son cuatro nodos y no pseudo-elementos porque cada esquina entra por su
 * lado: la de arriba a la izquierda baja y va a la derecha, la de abajo a la
 * derecha hace lo contrario. Con `::before`/`::after` solo se pueden animar
 * dos, y el gesto pierde justo la mitad que lo hace parecer un cerrojo.
 *
 * El envoltorio no es interactivo: quien decide si está `activo` es el
 * componente de fuera (el menú, la ficha). Así el mismo encuadre sirve para
 * hover, para foco y para selección sin inventarse tres marcos distintos.
 */
export default function PliegoCorchete({
  children,
  activo = false,
  tone = "tinta",
  as: Tag = "div",
  className,
}: PliegoCorcheteProps) {
  return (
    <Tag
      className={cx(
        "pliego-corchete",
        `pliego-corchete--${tone}`,
        activo && "is-activo",
        className,
      )}
    >
      <span className="pliego-corchete__esq pliego-corchete__esq--ai" aria-hidden="true" />
      <span className="pliego-corchete__esq pliego-corchete__esq--ad" aria-hidden="true" />
      <span className="pliego-corchete__esq pliego-corchete__esq--bi" aria-hidden="true" />
      <span className="pliego-corchete__esq pliego-corchete__esq--bd" aria-hidden="true" />
      {children}
    </Tag>
  );
}
