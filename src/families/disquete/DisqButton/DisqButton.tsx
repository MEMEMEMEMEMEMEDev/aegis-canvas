import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqButton.scss";

export interface DisqButtonProps extends ButtonProps {
  /** Relleno del solid: tinta (default) o índigo. */
  tone?: "ink" | "indigo";
}

/**
 * Botón DISQUETE: caja de esquinas casi rectas, mono en mayúsculas y un
 * desplazamiento sólido al pulsar — la tecla de una unidad de disco, que no
 * rebota: entra.
 */
const DisqButton = forwardRef<HTMLButtonElement, DisqButtonProps>(function DisqButton(
  { className, tone = "ink", ...rest },
  ref,
) {
  return <Button ref={ref} className={cx("disq-button", `disq-button--${tone}`, className)} {...rest} />;
});

export default DisqButton;
