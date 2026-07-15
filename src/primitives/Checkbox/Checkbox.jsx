import { useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import { Check, Minus } from "../../utils/icons";
import { useFieldProps } from "../Field/Field";
import "./Checkbox.scss";

/**
 * Checkbox over a real <input type="checkbox"> (visually hidden) — native
 * semantics, forms and keyboard for free; the box is drawn on top.
 *
 * @param {object} props
 * @param {boolean} [props.checked]
 * @param {boolean} [props.indeterminate=false] "some selected" visual state
 * @param {React.ReactNode} [props.label]
 * @param {React.ReactNode} [props.description] secondary line under the label
 * @param {boolean} [props.invalid]
 */
export default function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  label,
  description,
  invalid,
  disabled,
  required,
  id,
  onChange,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });
  const inputRef = useRef(null);

  // `indeterminate` only exists as a DOM property
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={cx(
        "ds-checkbox",
        field.disabled && "is-disabled",
        field.invalid && "is-invalid",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="ds-checkbox__input"
        id={field.id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={field.disabled}
        required={field.required || undefined}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        onChange={onChange}
        {...rest}
      />
      <span className="ds-checkbox__box" aria-hidden="true">
        <span className="ds-checkbox__mark ds-checkbox__mark--check">
          <Check />
        </span>
        <span className="ds-checkbox__mark ds-checkbox__mark--dash">
          <Minus />
        </span>
      </span>
      {(label || description) && (
        <span className="ds-checkbox__text">
          {label && <span className="ds-checkbox__label">{label}</span>}
          {description && (
            <span className="ds-checkbox__description">{description}</span>
          )}
        </span>
      )}
    </label>
  );
}
