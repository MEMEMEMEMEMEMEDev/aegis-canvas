import { useEffect, useState } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoRotator.scss";

export interface TebeoRotatorProps {
  /** Palabras que se van turnando. */
  words: string[];
  /** Milisegundos entre cambios. Default: 2200. */
  interval?: number;
  /** hueco (contorno de tinta, default) o sun (subrayado marcador). */
  tone?: "hollow" | "sun";
  className?: string;
}

/**
 * Palabra rotatoria TEBEO: cicla `words` con una entrada seca desde abajo.
 * Pensada para vivir DENTRO de un TebeoHeadline. Con prefers-reduced-motion
 * las palabras cambian sin animación.
 */
export default function TebeoRotator({
  words,
  interval = 2200,
  tone = "hollow",
  className,
}: TebeoRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cx("tebeo-rotator", `tebeo-rotator--${tone}`, className)}>
      <span key={index} className="tebeo-rotator__word">
        {words[index]}
      </span>
    </span>
  );
}
