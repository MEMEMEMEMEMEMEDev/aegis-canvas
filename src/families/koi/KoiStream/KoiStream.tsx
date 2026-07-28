import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiStream.scss";

export interface KoiStreamProps {
  /** Linternas que suben (default) o pétalos de sakura que caen. */
  variant?: "lanterns" | "petals";
  /** Cuántas motas. Default: 8. */
  count?: number;
  className?: string;
}

/**
 * Corriente KOI: campo decorativo de linternas chōchin subiendo (o pétalos
 * cayendo) dentro del contenedor posicionado más cercano. Posiciones y
 * tiempos deterministas por índice — nada de Math.random, misma escena
 * en cada render. Solo CSS, aria-hidden, y quieto con reduced-motion.
 */
export default function KoiStream({
  variant = "lanterns",
  count = 8,
  className,
}: KoiStreamProps) {
  return (
    <div className={cx("koi-stream", `koi-stream--${variant}`, className)} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="koi-stream__mote"
          style={
            {
              left: `${(i * 37 + 11) % 97}%`,
              "--ks-size": `${12 + (i % 3) * 7}px`,
              "--ks-dur": `${11 + (i % 5) * 2.3}s`,
              "--ks-delay": `${-(i * 2.7)}s`,
              "--ks-drift": `${((i % 4) - 1.5) * 2.2}rem`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
