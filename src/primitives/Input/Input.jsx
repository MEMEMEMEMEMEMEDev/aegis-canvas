import { forwardRef } from "react";
import { cx } from "../../utils/cx";
import { useFieldProps } from "../Field/Field";

/**
 * Núcleo headless de input de texto: input nativo + wiring automático de
 * accesibilidad cuando vive dentro de <Field>. Sin opinión visual.
 *
 * @param {object} props
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.invalid]  fuerza estado inválido sin Field
 */
const Input = forwardRef(function Input(
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
