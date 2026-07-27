import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarStat.scss";

export interface TelarStatProps {
  label: string;
  value: string;
  /** Hilado del valor. Default: cream. */
  tone?: "cream" | "fucsia" | "cobre" | "verde" | "sol";
  className?: string;
}

/** Celda de métrica TELAR: densa, mono, valor en display con hilado. */
export default function TelarStat({ label, value, tone = "cream", className }: TelarStatProps) {
  return (
    <div className={cx("telar-stat", className)}>
      <span className={cx("telar-stat__value", `telar-stat__value--${tone}`)}>{value}</span>
      <span className="telar-stat__label">{label}</span>
    </div>
  );
}
