import { cx } from "../../utils/cx";
import { ChevronDown } from "../../utils/icons";
import { useFieldProps } from "../Field/Field";
import "./Select.scss";

/**
 * Styled NATIVE select — maximum accessibility and mobile behavior for free.
 * For rich options (icons, descriptions, search) use <Dropdown> instead.
 *
 * @param {object} props
 * @param {Array<{value:string, label:string, disabled?:boolean}>} [props.options]
 *   shorthand; you can also pass <option>/<optgroup> as children
 * @param {string}  [props.placeholder] renders a disabled first option
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.invalid]
 */
export default function Select({
  options,
  placeholder,
  size = "md",
  invalid,
  disabled,
  required,
  id,
  value,
  defaultValue,
  children,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });

  // With a placeholder and no value chosen, default to "" so it shows.
  const defaults =
    placeholder && value === undefined && defaultValue === undefined
      ? { defaultValue: "" }
      : { defaultValue };

  return (
    <div
      className={cx(
        "ds-select",
        `ds-select--${size}`,
        field.invalid && "is-invalid",
        field.disabled && "is-disabled",
        className,
      )}
    >
      <select
        className="ds-select__control"
        id={field.id}
        value={value}
        disabled={field.disabled}
        required={field.required || undefined}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        {...defaults}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      <span className="ds-select__chevron" aria-hidden="true">
        <ChevronDown />
      </span>
    </div>
  );
}
