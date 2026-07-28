import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoType.scss";

export interface DomoTypeProps {
  /** Texto a teclear; si cambia, se reteclea desde cero (la AI "responde"). */
  text: string;
  /** ms por carácter. */
  speed?: number;
  /** ms antes de empezar. */
  delay?: number;
  onDone?: () => void;
  as?: ElementType;
  className?: string;
}

/**
 * Texto tecleado DOMO: la voz de la AI del portafolio — escribe carácter a
 * carácter con cursor de bloque. Los lectores de pantalla reciben el texto
 * completo de una (aria-label), y con reduced-motion aparece al instante.
 */
export default function DomoType({
  text,
  speed = 26,
  delay = 0,
  onDone,
  as: Tag = "p",
  className,
}: DomoTypeProps) {
  const [shown, setShown] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setShown(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      onDoneRef.current?.();
      return undefined;
    }
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  const done = shown >= text.length;

  return (
    <Tag className={cx("domo-type", className)} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, shown)}
        {!done && <span className="domo-type__cursor">▍</span>}
      </span>
    </Tag>
  );
}
