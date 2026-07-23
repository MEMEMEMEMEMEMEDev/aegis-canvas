import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../../utils/cx";
import "./MesoStat.scss";

export interface MesoStatProps extends ComponentPropsWithoutRef<"div"> {
  value: string | number;
  label: string;
  /** Unidad pequeña junto al valor (ej. "%", "ms", "Ma"). */
  suffix?: string;
}

/**
 * Cifra destacada MESOSOICOS: valor mono grande sobre etiqueta meta,
 * separados por un estrato.
 */
export default function MesoStat({
  value,
  label,
  suffix,
  className,
  ...rest
}: MesoStatProps) {
  return (
    <div className={cx("meso-stat", className)} {...rest}>
      <span className="meso-stat__value">
        {value}
        {suffix && <small className="meso-stat__suffix">{suffix}</small>}
      </span>
      <span className="meso-stat__label">{label}</span>
    </div>
  );
}
