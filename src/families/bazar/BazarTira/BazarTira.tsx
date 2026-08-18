import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarTira.scss";

export interface BazarTiraProps {
  /** Las lecturas de la tira, en orden. */
  items: string[];
  /** Segundos que tarda la cinta en dar una vuelta entera. */
  duracion?: number;
  /** Hacia dónde corre. */
  sentido?: "izq" | "der";
  tone?: "linea" | "rosa" | "morado";
  className?: string;
}

/**
 * LA TIRA: la cinta de telemetría del borde de la consola — lecturas cortas
 * separadas por rombos, corriendo despacio de un lado a otro.
 *
 * Va `aria-hidden` ENTERA, y no es un descuido: una cinta que se mueve es
 * ilegible para quien la escucha (llega desordenada y sin contexto) y una
 * trampa para quien la lee (el texto se le escapa). Todo lo que diga la tira
 * tiene que estar escrito, quieto, en algún sitio de la pantalla. Si no lo
 * está, no era telemetría — era información, y va en otro componente.
 *
 * El contenido se duplica para que el bucle no tenga costura. Por eso la
 * lista llega dos veces al DOM y por eso las dos copias están ocultas: no
 * hay ningún lector al que le podamos decir esto dos veces.
 */
export default function BazarTira({
  items,
  duracion = 42,
  sentido = "izq",
  tone = "linea",
  className,
}: BazarTiraProps) {
  const cinta = (clave: string) => (
    <span className="bazar-tira__grupo" key={clave}>
      {items.map((item, i) => (
        <span className="bazar-tira__item" key={`${clave}-${i}`}>
          {item}
          <b className="bazar-tira__rombo">◆</b>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cx("bazar-tira", `bazar-tira--${tone}`, `bazar-tira--${sentido}`, className)}
      aria-hidden="true"
      style={{ "--tira-dur": `${duracion}s` } as CSSProperties}
    >
      <div className="bazar-tira__pista">
        {cinta("a")}
        {cinta("b")}
      </div>
    </div>
  );
}
