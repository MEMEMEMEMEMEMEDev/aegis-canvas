import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqCarga.scss";

export interface DisqCargaProps {
  /** Rótulo de la izquierda ("CARGANDO DEMO"). */
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
 * CARGA DISQUETE: la pantalla de arranque de un cartucho, en el registro
 * bruto — caja de papel con trazo negro, sombra dura y el porcentaje en un
 * bloque de acento macizo.
 *
 * TODO sale de una sola variable. `--disq-carga-p` es una custom property
 * registrada (@property) que va de 0 a 100, y de ella cuelgan las dos
 * lecturas: el número la imprime con un `counter` y la barra se recorta a esa
 * misma anchura. Antes eran dos animaciones independientes —los bloques
 * repartidos linealmente por retardo, el número con una curva de easing— y
 * por eso no coincidían: la barra iba por un sitio y la cifra por otro.
 *
 * Sin JavaScript. En navegadores que no registran propiedades el número se
 * queda en 100 y la barra aparece llena, que es el estado final y el honesto.
 * Con prefers-reduced-motion, lo mismo desde el primer fotograma.
 */
export default function DisqCarga({
  title = "Cargando",
  lines,
  duration = 2.6,
  segments = 24,
  className,
}: DisqCargaProps) {
  // Los bloques se dibujan dos veces: la pista apagada debajo y la encendida
  // encima, recortada por el porcentaje. Es lo que hace imposible que se
  // desincronicen — son la misma rejilla.
  const bloques = Array.from({ length: segments }, (_, i) => <i key={i} />);

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
        <span className="disq-carga__pista">{bloques}</span>
        <span className="disq-carga__lleno">{bloques}</span>
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
