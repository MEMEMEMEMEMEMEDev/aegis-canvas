import { useEffect, useState } from "react";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarType.scss";

export interface TelarTypeProps {
  /** Frases que se escriben y borran en loop. */
  words: string[];
  /** ms por carácter al escribir. Default: 70. */
  typeSpeed?: number;
  /** ms de pausa con la palabra completa. Default: 1600. */
  hold?: number;
  className?: string;
}

/**
 * Texto-máquina TELAR: escribe y borra `words` con cursor de bloque, como
 * terminal. Si el usuario pide menos movimiento, muestra las palabras
 * completas rotando sin efecto de tipeo.
 */
export default function TelarType({
  words,
  typeSpeed = 70,
  hold = 1600,
  className,
}: TelarTypeProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const word = words[wordIndex % words.length] ?? "";

  useEffect(() => {
    if (reduced) {
      const id = window.setInterval(
        () => setWordIndex((i) => (i + 1) % words.length),
        hold + 800,
      );
      return () => window.clearInterval(id);
    }
    const delay = deleting ? typeSpeed / 2 : chars === word.length ? hold : typeSpeed;
    const id = window.setTimeout(() => {
      if (!deleting) {
        if (chars < word.length) setChars(chars + 1);
        else setDeleting(true);
      } else if (chars > 0) {
        setChars(chars - 1);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [chars, deleting, word, words.length, typeSpeed, hold, reduced]);

  return (
    <span className={cx("telar-type", className)}>
      {reduced ? word : word.slice(0, chars)}
      <span className="telar-type__cursor" aria-hidden="true" />
    </span>
  );
}
