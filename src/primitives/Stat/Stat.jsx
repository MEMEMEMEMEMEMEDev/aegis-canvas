import { cx } from "../../utils/cx";
import "./Stat.scss";

/**
 * Labelled readout — a mono uppercase micro-label over a large light value,
 * the repeated data cell from the smart-home panel (WATER · 67°C, etc.).
 *
 * @param {object} props
 * @param {React.ReactNode} props.label   small caps label
 * @param {React.ReactNode} props.value   the figure
 * @param {React.ReactNode} [props.unit]  trailing unit, de-emphasised
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 */
export default function Stat({
  label,
  value,
  unit,
  size = "md",
  className = "",
  ...rest
}) {
  return (
    <div className={cx("ds-stat", `ds-stat--${size}`, className)} {...rest}>
      <span className="ds-stat__label">{label}</span>
      <span className="ds-stat__value">
        {value}
        {unit != null && <span className="ds-stat__unit">{unit}</span>}
      </span>
    </div>
  );
}
