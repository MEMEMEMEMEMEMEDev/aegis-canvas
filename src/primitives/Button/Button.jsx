import { forwardRef } from "react";
import { cx } from "../../utils/cx";

/**
 * Núcleo headless de botón: semántica, estados y API estable.
 * SIN opinión visual — las clases BEM (ds-button, ds-button--*) son los
 * ganchos que cada familia/marca viste después.
 *
 * @param {object} props
 * @param {"solid"|"outline"|"ghost"|"danger"} [props.variant="solid"]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.loading=false]  deshabilita y marca aria-busy
 * @param {boolean} [props.iconOnly=false] botón cuadrado solo-icono (poner aria-label)
 */
const Button = forwardRef(function Button(
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
