import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoButton.scss";

export interface TebeoButtonProps extends ButtonProps {
  /** Relleno cuando variant="solid": tinta (default) o amarillo sol. */
  tone?: "ink" | "sun";
}

/**
 * Botón TEBEO: píldora con borde grueso de tinta, Space Grotesk bold.
 * `tone` elige el relleno del solid (tinta o sol); el resto de variantes
 * (outline/ghost/danger) vienen del núcleo headless Button.
 */
const TebeoButton = forwardRef<HTMLButtonElement, TebeoButtonProps>(
  function TebeoButton({ className, tone = "ink", ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("tebeo-button", `tebeo-button--${tone}`, className)}
        {...rest}
      />
    );
  },
);

export default TebeoButton;
