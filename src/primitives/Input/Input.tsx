import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import { useFieldProps } from "../Field/Field";
import type { ControlSize } from "../types";

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  size?: ControlSize;
  /** Fuerza estado inválido sin Field. */
  invalid?: boolean;
}

/**
 * Núcleo headless de input de texto: input nativo + wiring automático de
 * accesibilidad cuando vive dentro de <Field>. Sin opinión visual.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, disabled, required, id, className, ...rest },
  ref,
) {
  const field = useFieldProps({ invalid, disabled, required, id });
  return (
    <input
      ref={ref}
      className={cx(
        "ds-input",
        `ds-input--${size}`,
        field["aria-invalid"] && "is-invalid",
        className,
      )}
      {...field}
      {...rest}
    />
  );
});

export default Input;
