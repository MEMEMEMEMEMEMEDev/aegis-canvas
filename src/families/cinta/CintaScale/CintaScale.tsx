import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaScale.scss";

export interface CintaScaleProps {
  /** Marcas rotuladas bajo la regla ("88", "92", "TR 01"…). */
  marks: string[];
  /** Posición de la aguja, 0–100. */
  value: number;
  /** Nombre del dial para lectores de pantalla. */
  label: string;
  className?: string;
}

/**
 * Regla CINTA: el dial de sintonía — ticks de serigrafía, marcas mono y
 * una aguja coral que viaja suave hasta la posición. Ideal para "en qué
 * pista del portafolio estás".
 */
export default function CintaScale({ marks, value, label, className }: CintaScaleProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cx("cinta-scale", className)}
      role="img"
      aria-label={`${label}: ${Math.round(clamped)}%`}
    >
      <div className="cinta-scale__ticks" aria-hidden="true">
        <span
          className="cinta-scale__needle"
          style={{ "--cs-pos": `${clamped}%` } as CSSProperties}
        />
      </div>
      <div className="cinta-scale__marks" aria-hidden="true">
        {marks.map((mark, i) => (
          <span key={i}>{mark}</span>
        ))}
      </div>
    </div>
  );
}
