import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiBoton.scss";

export type ObsiBotonProps = ButtonProps;

/**
 * Botón OBSIDIANA: paralelogramo sesgado con la etiqueta des-inclinada.
 * `variant` del núcleo: solid (cian, el CTA), outline y ghost.
 */
const ObsiBoton = forwardRef<HTMLButtonElement, ObsiBotonProps>(
  function ObsiBoton({ className, children, ...rest }, ref) {
    return (
      <Button ref={ref} className={cx("obsi-boton", className)} {...rest}>
        <span data-obsi-recto>{children}</span>
      </Button>
    );
  },
);

export default ObsiBoton;
