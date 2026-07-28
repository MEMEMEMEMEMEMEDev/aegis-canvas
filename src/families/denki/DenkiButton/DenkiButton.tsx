import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiButton.scss";

export interface DenkiButtonProps extends ButtonProps {
  /** Relleno del solid: panel negro (default) o bermellón. */
  tone?: "panel" | "red";
}

/**
 * Botón DENKI: casi cuadrado, borde de imprenta, mono en mayúsculas.
 * Se presiona como botón de arcade (baja 2px, sin sombras).
 */
const DenkiButton = forwardRef<HTMLButtonElement, DenkiButtonProps>(
  function DenkiButton({ className, tone = "panel", ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("denki-button", `denki-button--${tone}`, className)}
        {...rest}
      />
    );
  },
);

export default DenkiButton;
