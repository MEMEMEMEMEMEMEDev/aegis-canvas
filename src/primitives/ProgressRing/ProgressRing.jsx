import { cx } from "../../utils/cx";
import "./ProgressRing.scss";

/**
 * Circular percentage indicator — the "68%" heating badge from the panel.
 * Pure SVG, themed via the foundation contract.
 *
 * @param {object} props
 * @param {number} [props.value=0]   0–100
 * @param {number} [props.size=48]   px diameter
 * @param {number} [props.stroke=3]  px ring thickness
 * @param {React.ReactNode} [props.label]  defaults to "<value>%"
 */
export default function ProgressRing({
  value = 0,
  size = 48,
  stroke = 3,
  label,
  className = "",
  ...rest
}) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped / 100);
  const center = size / 2;

  return (
    <div
      className={cx("ds-ring", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={typeof label === "string" ? label : `${Math.round(clamped)}%`}
      {...rest}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className="ds-ring__track"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="ds-ring__bar"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <span className="ds-ring__label">{label ?? `${Math.round(clamped)}%`}</span>
    </div>
  );
}
