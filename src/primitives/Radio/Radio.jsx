import { createContext, useContext, useId } from "react";
import { cx } from "../../utils/cx";
import { useFieldProps } from "../Field/Field";
import "./Radio.scss";

const RadioGroupContext = createContext(null);

/**
 * Radio group — provides name/value/onChange to its <Radio> children.
 * Controlled: pass `value` + `onChange(nextValue)`.
 *
 * @param {object} props
 * @param {string} [props.value]
 * @param {(value: string) => void} [props.onChange]
 * @param {string} [props.label] accessible group name
 * @param {"vertical"|"horizontal"} [props.orientation="vertical"]
 */
export function RadioGroup({
  value,
  onChange,
  label,
  orientation = "vertical",
  disabled,
  invalid,
  required,
  className = "",
  children,
  ...rest
}) {
  const field = useFieldProps({ invalid, disabled, required });
  const name = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-required={field.required || undefined}
      aria-invalid={field.invalid || undefined}
      aria-describedby={field.describedBy}
      className={cx("ds-radio-group", `ds-radio-group--${orientation}`, className)}
      {...rest}
    >
      <RadioGroupContext.Provider
        value={{
          name,
          value,
          onChange,
          disabled: field.disabled,
          invalid: field.invalid,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

/**
 * Single radio — native <input type="radio"> underneath. Use inside
 * <RadioGroup>; also works standalone with explicit name/checked/onChange.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {React.ReactNode} [props.label]
 * @param {React.ReactNode} [props.description]
 */
export default function Radio({
  value,
  label,
  description,
  checked,
  disabled,
  invalid,
  name,
  onChange,
  className = "",
  ...rest
}) {
  const group = useContext(RadioGroupContext);

  const isChecked = group ? group.value === value : checked;
  const isDisabled = disabled ?? group?.disabled ?? false;
  const isInvalid = invalid ?? group?.invalid ?? false;

  const handleChange = (e) => {
    if (group) group.onChange?.(value);
    onChange?.(e);
  };

  return (
    <label
      className={cx(
        "ds-radio",
        isDisabled && "is-disabled",
        isInvalid && "is-invalid",
        className,
      )}
    >
      <input
        type="radio"
        className="ds-radio__input"
        name={name ?? group?.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        aria-invalid={isInvalid || undefined}
        onChange={handleChange}
        {...rest}
      />
      <span className="ds-radio__circle" aria-hidden="true" />
      {(label || description) && (
        <span className="ds-radio__text">
          {label && <span className="ds-radio__label">{label}</span>}
          {description && (
            <span className="ds-radio__description">{description}</span>
          )}
        </span>
      )}
    </label>
  );
}
