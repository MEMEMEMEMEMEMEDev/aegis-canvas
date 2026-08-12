import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqCarga.scss";

export interface DisqCargaProps {
  /** Rótulo grande de la izquierda ("CARGANDO DEMO"). */
  title?: string;
  /**
   * Las líneas del arranque, en orden. Aparecen escalonadas y son texto
   * real: dicen qué lleva el demo por dentro, así que se leen.
   */
  lines?: readonly string[];
  /** Segundos que dura la secuencia completa. */
  duration?: number;
  /** Segmentos de la barra. Más segmentos, más "consola". */
  segments?: number;
  className?: string;
}

/**
 * CARGA DISQUETE: la pantalla de arranque de un cartucho — el contador
 * subiendo, la barra llenándose por bloques y el registro del sistema
 * escupiendo líneas.
 *
 * Todo es CSS. El porcentaje sube con una custom property registrada
 * (@property) leída por un counter: sin JavaScript y sin un solo repintado
 * de layout. En navegadores que no registran propiedades el número se queda
 * en 100 —el estado final, que es el honesto— y la barra aparece llena.
 *
 * Con prefers-reduced-motion no hay cuenta ni relleno progresivo: la
 * secuencia se muestra completa desde el primer fotograma.
 */
export default function DisqCarga({
  title = "Cargando",
  lines,
  duration = 2.6,
  segments = 28,
  className,
}: DisqCargaProps) {
  return (
    <div
      className={cx("disq-carga", className)}
      style={{ "--disq-carga-dur": `${duration}s` } as CSSProperties}
    >
      <div className="disq-carga__cabeza">
        <b className="disq-carga__title">{title}</b>
        <span className="disq-carga__pct" aria-hidden="true" />
      </div>

      <div className="disq-carga__barra" aria-hidden="true">
        {Array.from({ length: segments }, (_, i) => (
          <i key={i} style={{ "--disq-carga-i": i, "--disq-carga-n": segments } as CSSProperties} />
        ))}
      </div>

      {lines && lines.length > 0 && (
        <ul className="disq-carga__log">
          {lines.map((linea, i) => (
            <li key={i} style={{ "--disq-carga-i": i, "--disq-carga-n": lines.length } as CSSProperties}>
              <span aria-hidden="true">&gt;</span> {linea}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
