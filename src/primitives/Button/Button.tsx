import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../types";

export type ButtonVariant = "solid" | "outline" | "ghost" | "danger";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Deshabilita y marca aria-busy. */
  loading?: boolean;
  /** Botón cuadrado solo-icono (poner aria-label). */
  iconOnly?: boolean;
}

/**
 * Núcleo headless de botón: semántica, estados y API estable.
 * SIN opinión visual — las clases BEM (ds-button, ds-button--*) son los
 * ganchos que cada familia/marca viste después.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "solid",
    size = "md",
    loading = false,
    iconOnly = false,
    disabled = false,
    type = "button",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        "ds-button",
        `ds-button--${variant}`,
        `ds-button--${size}`,
        iconOnly && "ds-button--icon-only",
        loading && "is-loading",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
