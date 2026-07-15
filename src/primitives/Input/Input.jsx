import { useState } from "react";
import { cx } from "../../utils/cx";
import { Cross, Eye, EyeOff } from "../../utils/icons";
import { useFieldProps } from "../Field/Field";
import "./Input.scss";

/**
 * Text input. Composes with <Field> (label/hint/error wiring is automatic)
 * or standalone via the `invalid` prop.
 *
 * @param {object} props
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.invalid]     force the error style (Field sets it via context)
 * @param {React.ReactNode} [props.prefix]  node before the text (icon, "$", …)
 * @param {React.ReactNode} [props.suffix]  node after the text ("kg", icon, …)
 * @param {boolean} [props.clearable=false] show an ✕ when there's content
 * @param {() => void} [props.onClear]      called on clear (defaults to onChange(""))
 * @param {boolean} [props.revealable=true] for type="password": eye toggle
 */
export default function Input({
  size = "md",
  type = "text",
  invalid,
  disabled,
  required,
  prefix,
  suffix,
  clearable = false,
  onClear,
  revealable = true,
  id,
  value,
  onChange,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === "password";
  const effectiveType = isPassword && revealed ? "text" : type;
  const showClear =
    clearable && !field.disabled && value !== undefined && value !== "";

  const handleClear = () => {
    if (onClear) onClear();
    else onChange?.({ target: { value: "" } });
  };

  return (
    <div
      className={cx(
        "ds-input",
        `ds-input--${size}`,
        field.invalid && "is-invalid",
        field.disabled && "is-disabled",
        className,
      )}
    >
      {prefix && <span className="ds-input__affix">{prefix}</span>}

      <input
        className="ds-input__control"
        id={field.id}
        type={effectiveType}
        value={value}
        onChange={onChange}
        disabled={field.disabled}
        required={field.required || undefined}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        {...rest}
      />

      {showClear && (
        <button
          type="button"
          className="ds-input__action"
          aria-label="Limpiar"
          tabIndex={-1}
          onClick={handleClear}
        >
          <Cross />
        </button>
      )}

      {isPassword && revealable && (
        <button
          type="button"
          className="ds-input__action"
          aria-label={revealed ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={revealed}
          onClick={() => setRevealed((r) => !r)}
          disabled={field.disabled}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </button>
      )}

      {suffix && <span className="ds-input__affix">{suffix}</span>}
    </div>
  );
}
