import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiMeter.scss";

export interface DenkiMeterProps {
  /** Segmentos encendidos, 0..total. */
  value: number;
  /** Segmentos del medidor. */
  total?: number;
  /** Rótulo de ficha técnica junto al medidor ("SEÑAL", "POWER"). */
  label?: string;
  className?: string;
}

/**
 * Medidor DENKI: la barra de poder segmentada de un mueble arcade — bloques
 * sesgados que se encienden en bermellón. Un `role="meter"` de verdad: el
 * lector de pantalla recibe nivel y máximo, no una fila de divs.
 */
export default function DenkiMeter({ value, total = 3, label = "nivel", className }: DenkiMeterProps) {
  const lleno = Math.min(total, Math.max(0, value));

  return (
    <span
      className={cx("denki-meter", className)}
      role="meter"
      aria-label={label}
      aria-valuenow={lleno}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuetext={`${lleno} de ${total}`}
    >
      <span className="denki-meter__label">{label}</span>
      <span className="denki-meter__segs" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <i key={i} className={cx("denki-meter__seg", i < lleno && "is-on")} />
        ))}
      </span>
    </span>
  );
}
