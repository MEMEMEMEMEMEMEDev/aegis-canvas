import { forwardRef } from "react";
import type { ReactNode } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoBoton.scss";

export interface CalcoBotonProps extends ButtonProps {
  /** El relleno del solid. La tinta invierte los colores. */
  tono?: CalcoTono | "tinta";
  /** Un glifo o icono a la izquierda del rótulo. */
  icono?: ReactNode;
  /** Ancho completo: para el pie de una hoja o una loseta de acción. */
  ancho?: boolean;
}

/**
 * Botón CALCO: un bloque con contorno y sombra dura que se levanta al
 * señalarlo y se hunde al pulsarlo. No cambia de color al tocarlo — se
 * mueve, que es lo que hace una calcomanía con relieve.
 *
 * Hereda el núcleo headless (Button): variantes solid/outline/ghost, tamaños
 * y estado disabled vienen de ahí; aquí solo se viste.
 */
const CalcoBoton = forwardRef<HTMLButtonElement, CalcoBotonProps>(function CalcoBoton(
  { className, tono = "crema", icono, ancho = false, children, ...rest },
  ref,
) {
  return (
    <Button
      ref={ref}
      className={cx("calco-boton", `calco-boton--${tono}`, ancho && "calco-boton--ancho", className)}
      {...rest}
    >
      {icono && (
        <span className="calco-boton__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      <span className="calco-boton__texto">{children}</span>
    </Button>
  );
});

export default CalcoBoton;
