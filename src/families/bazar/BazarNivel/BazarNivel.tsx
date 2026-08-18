import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarNivel.scss";

export interface BazarNivelProps {
  /** La cifra grande. */
  valor: number | string;
  /** Qué es esa cifra. OBLIGATORIO: una cifra sin unidad no dice nada. */
  unidad: string;
  /** El rango, en placa sesgada sobre la cifra. */
  rango?: string;
  /** Kana del troquel, al canto. Decorativo. */
  kana?: string;
  tone?: "rosa" | "morado" | "holo";
  as?: ElementType;
  className?: string;
}

/**
 * EL NIVEL: la cifra a cuerpo de cartel con su rango en placa — la esquina
 * de una pantalla de personaje donde pone LV. 04.
 *
 * `unidad` no es opcional a propósito. La gracia del componente es que un
 * dato real se lea como una estadística de juego, y el momento en que el "4"
 * queda solo es el momento en que deja de ser un dato y pasa a ser atrezo.
 * La cifra la pone quien llama y sale de los datos; aquí no se inventa nada,
 * ni se completa con ceros hasta que "quede mejor".
 */
export default function BazarNivel({
  valor,
  unidad,
  rango,
  kana,
  tone = "rosa",
  as: Tag = "p",
  className,
}: BazarNivelProps) {
  return (
    <Tag className={cx("bazar-nivel", `bazar-nivel--${tone}`, className)}>
      {rango && <span className="bazar-nivel__rango">{rango}</span>}

      <span className="bazar-nivel__cifra">
        <b className="bazar-nivel__valor">{valor}</b>
        {kana && (
          <i className="bazar-nivel__kana" aria-hidden="true">
            {kana}
          </i>
        )}
      </span>

      <span className="bazar-nivel__unidad">{unidad}</span>
    </Tag>
  );
}
