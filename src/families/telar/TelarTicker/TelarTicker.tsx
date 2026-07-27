import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarTicker.scss";

export interface TelarTickerProps {
  /** Mensajes que desfilan (se separan con ◆). */
  items: string[];
  /** Segundos por vuelta. Default: 24. */
  speed?: number;
  className?: string;
}

/**
 * Ticker TELAR: cinta mono densa estilo terminal de noticias, en loop
 * perfecto (contenido duplicado aria-hidden). Pausa al hover; estático con
 * prefers-reduced-motion.
 */
export default function TelarTicker({ items, speed = 24, className }: TelarTickerProps) {
  const run = (hidden: boolean) => (
    <span className="telar-ticker__run" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="telar-ticker__item">
          {item}
          <em>◆</em>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cx("telar-ticker", className)}
      style={{ "--tt-speed": `${speed}s` } as CSSProperties}
    >
      <div className="telar-ticker__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
