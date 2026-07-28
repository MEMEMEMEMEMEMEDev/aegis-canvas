import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaDisplay.scss";

export interface CintaDisplayProps {
  /** Pista sonando. */
  title: string;
  /** Progreso 0–100. */
  progress?: number;
  /** Tiempos "m:ss". */
  elapsed?: string;
  total?: string;
  /** El indicador ▶ parpadea. */
  playing?: boolean;
  className?: string;
}

/**
 * Pantalla CINTA: el display NOW PLAYING — vidrio oscuro, texto crema,
 * barra de avance y tiempos. El ▶ parpadea mientras suena.
 */
export default function CintaDisplay({
  title,
  progress = 0,
  elapsed,
  total,
  playing = false,
  className,
}: CintaDisplayProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div
      className={cx("cinta-display", playing && "is-playing", className)}
      role="status"
      aria-label={`Sonando: ${title}`}
    >
      <div className="cinta-display__row">
        <span className="cinta-display__live" aria-hidden="true">
          ▶ Now playing
        </span>
        <span className="cinta-display__title">{title}</span>
      </div>
      <div className="cinta-display__bar" aria-hidden="true">
        <span
          className="cinta-display__fill"
          style={{ "--cd-progress": `${clamped}%` } as CSSProperties}
        />
      </div>
      {(elapsed || total) && (
        <div className="cinta-display__times" aria-hidden="true">
          <span>{elapsed ?? "0:00"}</span>
          <span>{total ?? "-:--"}</span>
        </div>
      )}
    </div>
  );
}
