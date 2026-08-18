import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarMarco.scss";

export interface BazarMarcoProps {
  children: ReactNode;
  /** Rótulo impreso en el canto superior del chasis. */
  rotulo?: string;
  /** Lectura impresa en el canto inferior. */
  pie?: string;
  tone?: "rosa" | "morado" | "linea";
  as?: ElementType;
  className?: string;
}

/**
 * EL MARCO: el chasis de la consola — cuatro escuadras, dos rieles con sus
 * muescas y el rótulo serigrafiado en el canto.
 *
 * Encuadra una pantalla entera y le da borde a lo que si no flotaría sobre
 * el telón. Las escuadras y las muescas se dibujan con gradientes sobre dos
 * pseudo-elementos: cero nodos extra dentro del marco, que es lo que hay que
 * pedirle a algo que envuelve TODA una vista.
 *
 * No es interactivo ni cambia de estado: es mueble. Lo que se enciende al
 * elegir algo es la pieza de dentro, no el mueble que la sostiene.
 */
export default function BazarMarco({
  children,
  rotulo,
  pie,
  tone = "rosa",
  as: Tag = "div",
  className,
}: BazarMarcoProps) {
  return (
    <Tag className={cx("bazar-marco", `bazar-marco--${tone}`, className)}>
      <span className="bazar-marco__escuadras" aria-hidden="true" />

      {rotulo && (
        <span className="bazar-marco__rotulo" aria-hidden="true">
          {rotulo}
        </span>
      )}

      <div className="bazar-marco__cuerpo">{children}</div>

      {pie && (
        <span className="bazar-marco__pie" aria-hidden="true">
          {pie}
        </span>
      )}
    </Tag>
  );
}
