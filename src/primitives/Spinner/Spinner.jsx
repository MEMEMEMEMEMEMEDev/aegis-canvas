import { cx } from "../../utils/cx";
import "./Spinner.scss";

/**
 * Indeterminate loading indicator. Inherits `currentColor`, so it adapts to
 * wherever you drop it (inside a solid Button it spins in the contrast color).
 *
 * @param {object} props
 * @param {"xs"|"sm"|"md"|"lg"} [props.size="md"]
 * @param {string} [props.label="Cargando"] accessible name (visually hidden)
 */
export default function Spinner({
  size = "md",
  label = "Cargando",
  className = "",
  ...rest
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx("ds-spinner", `ds-spinner--${size}`, className)}
      {...rest}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle
          className="ds-spinner__track"
          cx="12"
          cy="12"
          r="9"
          strokeWidth="3"
        />
        <circle
          className="ds-spinner__head"
          cx="12"
          cy="12"
          r="9"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
}
