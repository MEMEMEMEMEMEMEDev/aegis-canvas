import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoReadout.scss";

export interface DomoReadoutProps {
  /** Rótulo del dato (WATER, PRESSURE, CAPACITY…). */
  label: string;
  /** Lectura grande. */
  value: ReactNode;
  /** Sufijo pegado al valor (°C, bar, kWh…), en el mismo cuerpo. */
  unit?: string;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Readout DOMO: par rótulo + lectura grande de la referencia
 * (PRESSURE / 1.7bar). El dato como protagonista tipográfico.
 */
export default function DomoReadout({
  label,
  value,
  unit,
  size = "md",
  className,
}: DomoReadoutProps) {
  return (
    <div className={cx("domo-readout", `domo-readout--${size}`, className)}>
      <span className="domo-readout__label">{label}</span>
      <span className="domo-readout__value">
        {value}
        {unit && <span className="domo-readout__unit">{unit}</span>}
      </span>
    </div>
  );
}
