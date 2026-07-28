import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiRail.scss";

export interface DenkiRailProps {
  items: string[];
  /** Segundos por vuelta. */
  speed?: number;
  direction?: "left" | "right";
  /** Banda negra (default) o bermellón. */
  tone?: "panel" | "red";
  className?: string;
}

/**
 * Riel DENKI: marquesina de catálogo — banda impresa con ítems separados
 * por ▶, corriendo en loop. Pausa al hover, quieta con reduced-motion.
 */
export default function DenkiRail({
  items,
  speed = 24,
  direction = "left",
  tone = "panel",
  className,
}: DenkiRailProps) {
  const run = (hidden: boolean) => (
    <span className="denki-rail__run" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className="denki-rail__item" key={i}>
          {item}
          <span className="denki-rail__sep" aria-hidden="true">
            ▶
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cx(
        "denki-rail",
        `denki-rail--${tone}`,
        direction === "right" && "denki-rail--reverse",
        className,
      )}
      style={{ "--dr-speed": `${speed}s` } as CSSProperties}
    >
      <div className="denki-rail__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
