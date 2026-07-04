import { cx } from "../../utils/cx";
import "./Toggle.scss";

/**
 * Pill switch with an inline ON/OFF state label — the control-panel toggle
 * from the smart-home inspiration. Controlled: pass `checked` + `onChange`.
 *
 * @param {object} props
 * @param {boolean}  [props.checked=false]
 * @param {(next: boolean) => void} [props.onChange]
 * @param {string}   [props.label]   accessible name (required for a11y)
 * @param {"sm"|"md"} [props.size="md"]
 */
export default function Toggle({
  checked = false,
  onChange,
  label,
  size = "md",
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cx(
        "ds-toggle",
        `ds-toggle--${size}`,
        checked && "ds-toggle--on",
        className,
      )}
      onClick={() => onChange?.(!checked)}
      {...rest}
    >
      <span className="ds-toggle__text" aria-hidden="true">
        {checked ? "ON" : "OFF"}
      </span>
      <span className="ds-toggle__knob" aria-hidden="true" />
    </button>
  );
}
