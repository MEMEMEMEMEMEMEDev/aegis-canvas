import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoOnda.scss";

export interface PliegoOndaProps {
  /** Nivel de la voz en dBFS (−90 silencio … 0 saturado). */
  nivel: number;
  /** Cuántas barras. */
  barras?: number;
  /** Nombre accesible. Sin él la onda es decoración. */
  label?: string;
  tone?: "tinta" | "rosa";
  className?: string;
}

// −60 dBFS es "nada", −10 es voz fuerte: se lleva a 0..1 con una curva
// suave para que una voz normal (−25) ya llene media onda.
export function nivelANorma(db: number): number {
  const x = Math.min(1, Math.max(0, (db + 60) / 50));
  return Math.round(Math.sqrt(x) * 100) / 100;
}

/**
 * La onda de una sala: barras que respiran con la voz. El movimiento es CSS
 * puro (cada barra oscila con su propio retardo); el nivel sólo escala la
 * amplitud por una variable, así que un nivel nuevo no reinicia la
 * animación ni fuerza un render por barra.
 */
export default function PliegoOnda({ nivel, barras = 14, label, tone = "tinta", className }: PliegoOndaProps) {
  const n = nivelANorma(nivel);
  return (
    <span
      className={cx("pliego-onda", `pliego-onda--${tone}`, n < 0.08 && "pliego-onda--calla", className)}
      style={{ "--pliego-onda-n": n } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: barras }, (_, i) => (
        <span key={i} className="pliego-onda__barra"
          style={{ "--pliego-i": i, "--pliego-onda-d": (i * 37) % 280 } as CSSProperties} />
      ))}
    </span>
  );
}
