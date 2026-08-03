import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaEq.scss";

export interface CintaEqProps {
  /** Cantidad de barras. Default: 12. */
  bars?: number;
  /** Animación encendida (suena) o congelada en reposo. */
  playing?: boolean;
  /** Color de las barras. Default: amber. */
  tone?: "amber" | "coral" | "sky";
  /** Si viene, el ecualizador es informativo (role img); si no, decorativo. */
  label?: string;
  className?: string;
}

/**
 * Ecualizador CINTA: la fila de VU-bars del hardware de audio — cada barra
 * baila a su propio tempo (determinista: fase y duración salen del índice,
 * sin aleatoriedad). En pausa quedan a media asta; con reduced-motion,
 * siempre quietas.
 */
export default function CintaEq({
  bars = 12,
  playing = true,
  tone = "amber",
  label,
  className,
}: CintaEqProps) {
  return (
    <span
      className={cx("cinta-eq", `cinta-eq--${tone}`, playing && "is-playing", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="cinta-eq__bar"
          style={
            {
              // Tempo y fase deterministas por barra (nada de Math.random).
              "--ce-dur": `${0.55 + ((i * 7) % 5) * 0.11}s`,
              "--ce-delay": `${-((i * 13) % 8) * 0.09}s`,
              "--ce-rest": `${22 + ((i * 5) % 4) * 12}%`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
