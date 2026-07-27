import { forwardRef } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiButton.scss";

export interface KoiButtonProps extends ButtonProps {
  /** Relleno cuando variant="solid": vidrio (default), sol o linterna. */
  tone?: "glass" | "sun" | "gold";
}

/**
 * Botón KOI: píldora de vidrio esmerilado con hairline; los tonos sun/gold
 * encienden el relleno (hinomaru / linterna). Comportamiento del núcleo
 * headless Button.
 */
const KoiButton = forwardRef<HTMLButtonElement, KoiButtonProps>(
  function KoiButton({ className, tone = "glass", ...rest }, ref) {
    return (
      <Button
        ref={ref}
        className={cx("koi-button", `koi-button--${tone}`, className)}
        {...rest}
      />
    );
  },
);

export default KoiButton;
