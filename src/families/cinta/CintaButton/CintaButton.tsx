import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaButton.scss";

export interface CintaButtonProps extends ButtonProps {
  /** Cara del botón cuando variant="solid": crema, ámbar, coral o cielo. */
  tone?: "cream" | "amber" | "coral" | "sky";
}

/**
 * Botón CINTA: tecla física de walkman — cara pastel, borde de tinta y
 * canto inferior grueso que se hunde al pulsar (viaja el milímetro real
 * de una tecla de hardware).
 */
const CintaButton = forwardRef<HTMLButtonElement, CintaButtonProps>(
  function CintaButton({ className, tone = "cream", ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("cinta-button", `cinta-button--${tone}`, className)}
        {...rest}
      />
    );
  },
);

export default CintaButton;
