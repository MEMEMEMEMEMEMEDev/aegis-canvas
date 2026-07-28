import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaMarks.scss";

export interface CintaMarksProps {
  /** Cantidad de chevrones. */
  count?: number;
  direction?: "right" | "left" | "up" | "down";
  tone?: "ink" | "coral" | "amber" | "sky";
  /** Luz corriendo por los chevrones (default). */
  running?: boolean;
  className?: string;
}

/**
 * Marcas CINTA: los chevrones ❯❯❯ de serigrafía — decoración direccional
 * con una luz que corre. Puro adorno (aria-hidden).
 */
export default function CintaMarks({
  count = 3,
  direction = "right",
  tone = "coral",
  running = true,
  className,
}: CintaMarksProps) {
  return (
    <span
      className={cx(
        "cinta-marks",
        `cinta-marks--${direction}`,
        `cinta-marks--${tone}`,
        running && "is-running",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.22}s` }}>
          ❯
        </span>
      ))}
    </span>
  );
}
