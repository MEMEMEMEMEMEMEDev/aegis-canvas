import { cx } from "../../utils/cx";
import { Minus, Plus } from "../../utils/icons";
import { useFieldProps } from "../Field/Field";
import "./NumberInput.scss";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// snap to the step grid and kill float noise (0.1+0.2 style)
const snap = (n, step, min) => {
  const base = Number.isFinite(min) ? min : 0;
  const snapped = base + Math.round((n - base) / step) * step;
  return Number(snapped.toFixed(10));
};

/**
 * Numeric input with − / + steppers. Controlled: `value` is a number or ""
 * (empty). Typing is free-form; the value clamps to [min, max] on blur.
 * ↑/↓ arrows also step.
 *
 * @param {object} props
 * @param {number|""} [props.value]
 * @param {(next: number|"") => void} [props.onChange]
 * @param {number} [props.min=-Infinity]
 * @param {number} [props.max=Infinity]
 * @param {number} [props.step=1]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.invalid]
 */
export default function NumberInput({
  value = "",
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = "md",
  invalid,
  disabled,
  required,
  id,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });

  const current = typeof value === "number" ? value : NaN;

  const stepBy = (delta) => {
    const start = Number.isNaN(current)
      ? clamp(0, min, max)
      : current + delta * step;
    onChange?.(clamp(snap(start, step, Number.isFinite(min) ? min : 0), min, max));
  };

  const handleInput = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      onChange?.("");
      return;
    }
    const n = Number(raw.replace(",", "."));
    if (!Number.isNaN(n)) onChange?.(n);
  };

  const handleBlur = () => {
    if (typeof value === "number") onChange?.(clamp(value, min, max));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      stepBy(+1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      stepBy(-1);
    }
  };

  const atMin = typeof value === "number" && value <= min;
  const atMax = typeof value === "number" && value >= max;

  return (
    <div
      className={cx(
        "ds-number",
        `ds-number--${size}`,
        field.invalid && "is-invalid",
        field.disabled && "is-disabled",
        className,
      )}
    >
      <button
        type="button"
        className="ds-number__step"
        aria-label="Disminuir"
        tabIndex={-1}
        disabled={field.disabled || atMin}
        onClick={() => stepBy(-1)}
      >
        <Minus />
      </button>

      <input
        className="ds-number__control"
        id={field.id}
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={typeof value === "number" ? value : undefined}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        value={value}
        disabled={field.disabled}
        required={field.required || undefined}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        onChange={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...rest}
      />

      <button
        type="button"
        className="ds-number__step"
        aria-label="Aumentar"
        tabIndex={-1}
        disabled={field.disabled || atMax}
        onClick={() => stepBy(+1)}
      >
        <Plus />
      </button>
    </div>
  );
}
