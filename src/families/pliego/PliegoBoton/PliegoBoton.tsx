import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoBoton.scss";

export interface PliegoBotonProps extends ButtonProps {
  /** Relleno del solid: tinta negra (default) o el rosa de la familia. */
  tone?: "tinta" | "rosa";
  /** Añade el cursor ▶ del menú a la izquierda del rótulo. */
  cursor?: boolean;
}

/**
 * Botón PLIEGO: rectángulo de guillotina, un pelo de filete, micro en
 * mayúsculas muy espaciada. Al pulsar no se hunde ni se sombrea: se INVIERTE,
 * como una tecla de menú de videojuego confirmando la elección.
 */
const PliegoBoton = forwardRef<HTMLButtonElement, PliegoBotonProps>(
  function PliegoBoton({ className, tone = "tinta", cursor = false, children, ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("pliego-boton", `pliego-boton--${tone}`, cursor && "pliego-boton--cursor", className)}
        {...rest}
      >
        {cursor && (
          <span className="pliego-boton__cursor" aria-hidden="true">
            ▶
          </span>
        )}
        {children}
      </Button>
    );
  },
);

export default PliegoBoton;
