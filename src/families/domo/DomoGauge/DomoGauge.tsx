import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoGauge.scss";

export interface DomoGaugeProps {
  /** Progreso 0–100. */
  value: number;
  /** Diámetro en px. */
  size?: number;
  /** Nombre del dato para lectores de pantalla ("carga", "completado"…). */
  label?: string;
  /** Texto central (default: porcentaje redondeado). */
  display?: string;
  className?: string;
}

const R = 20;
const CIRC = 2 * Math.PI * R;

/**
 * Gauge DOMO: el anillo 68% de la referencia. Aro hairline + arco de tinta
 * que se anima al cambiar `value` (transición de stroke-dashoffset).
 */
export default function DomoGauge({
  value,
  size = 72,
  label = "progreso",
  display,
  className,
}: DomoGaugeProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const text = display ?? `${Math.round(clamped)}%`;

  return (
    <svg
      className={cx("domo-gauge", className)}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={`${label}: ${text}`}
    >
      <circle className="domo-gauge__track" cx="24" cy="24" r={R} />
      <circle
        className="domo-gauge__arc"
        cx="24"
        cy="24"
        r={R}
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - clamped / 100)}
      />
      <text className="domo-gauge__text" x="24" y="24">
        {text}
      </text>
    </svg>
  );
}
