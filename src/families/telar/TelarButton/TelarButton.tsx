import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarButton.scss";

export interface TelarButtonProps extends ButtonProps {
  /** Hilado del relleno cuando variant="solid". Default: cream. */
  tone?: "cream" | "fucsia" | "cobre" | "verde" | "sol";
}

/**
 * Botón TELAR: compacto, mono en mayúsculas, esquinas chakana. `tone` elige
 * el hilado. Denso a propósito: está hecho para vivir en paneles apretados.
 */
const TelarButton = forwardRef<HTMLButtonElement, TelarButtonProps>(
  function TelarButton({ className, tone = "cream", ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("telar-button", `telar-button--${tone}`, className)}
        {...rest}
      />
    );
  },
);

export default TelarButton;
