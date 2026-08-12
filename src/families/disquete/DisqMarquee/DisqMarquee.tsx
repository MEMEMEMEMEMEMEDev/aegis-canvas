import { Fragment } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqMarquee.scss";

export interface DisqMarqueeProps {
  /** Las palabras de la cinta. */
  items: readonly string[];
  /** Separador entre palabras. */
  separator?: string;
  /** Sentido contrario: para apilar dos cintas que se cruzan. */
  reverse?: boolean;
  /** Fondo de la banda. */
  tone?: "void" | "ink" | "indigo";
  /** Segundos por vuelta. Menos es más rápido. */
  duration?: number;
  className?: string;
}

/**
 * Marquesina DISQUETE: la banda de micro-texto que recorre el pliego, como
 * el rótulo luminoso de una recreativa. Filete arriba y abajo, mono en
 * mayúsculas, y las palabras separadas por rombos.
 *
 * Es DECORATIVA por contrato (aria-hidden): las palabras que lleva tienen
 * que existir como texto real en otra parte de la página. La pista se
 * duplica para el bucle — otra razón por la que un lector de pantalla no
 * debe entrar aquí: todo lo diría dos veces.
 *
 * La animación es un translate del 50% de la pista (las dos copias miden lo
 * mismo), solo compositor. Con prefers-reduced-motion la cinta se queda
 * quieta y muestra lo que cabe, con un desvanecido en los cantos.
 */
export default function DisqMarquee({
  items,
  separator = "◆",
  reverse = false,
  tone = "void",
  duration = 26,
  className,
}: DisqMarqueeProps) {
  const grupo = (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="disq-marquee__item">{item}</span>
          <span className="disq-marquee__sep">{separator}</span>
        </Fragment>
      ))}
    </>
  );

  return (
    <div
      className={cx("disq-marquee", `disq-marquee--${tone}`, reverse && "disq-marquee--reverse", className)}
      style={{ "--disq-marquee-dur": `${duration}s` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="disq-marquee__track">
        <span className="disq-marquee__group">{grupo}</span>
        <span className="disq-marquee__group">{grupo}</span>
      </div>
    </div>
  );
}
