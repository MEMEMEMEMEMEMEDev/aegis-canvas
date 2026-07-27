import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoMarquee.scss";

export interface TebeoMarqueeProps {
  /** Frases que desfilan (se intercalan con ✦). */
  items: string[];
  /** Sentido del desfile. */
  direction?: "left" | "right";
  /** Segundos por vuelta completa. Default: 22. */
  speed?: number;
  /** ink (banda negra, default), sun o paper. */
  tone?: "ink" | "sun" | "paper";
  className?: string;
}

/**
 * Marquee infinito TEBEO: banda de display en mayúsculas que desfila en loop.
 * El contenido se duplica (aria-hidden) para el loop perfecto; se pausa al
 * hover y desaparece el movimiento con prefers-reduced-motion.
 */
export default function TebeoMarquee({
  items,
  direction = "left",
  speed = 22,
  tone = "ink",
  className,
}: TebeoMarqueeProps) {
  const run = (hidden: boolean) => (
    <span className="tebeo-marquee__run" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="tebeo-marquee__item">
          {item}
          <em>✦</em>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cx(
        "tebeo-marquee",
        `tebeo-marquee--${tone}`,
        direction === "right" && "tebeo-marquee--reverse",
        className,
      )}
      style={{ "--pm-speed": `${speed}s` } as CSSProperties}
    >
      <div className="tebeo-marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
