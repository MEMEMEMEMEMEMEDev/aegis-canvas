import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoSubtitulos.scss";

export interface PliegoSubtituloLinea {
  /** Estable por línea: el id del evento que la trajo. */
  id: string;
  texto: string;
}

export interface PliegoSubtitulosProps {
  /** Las líneas ya dichas, de la más vieja a la más nueva. */
  lineas: PliegoSubtituloLinea[];
  /**
   * La frase que se está diciendo AHORA, todavía sin cerrar. Se dibuja
   * distinta y NO se anuncia: un lector de pantalla que lee cada versión
   * provisional de la misma frase es ruido, no accesibilidad.
   */
  provisional?: string;
  /** Nombre accesible del registro: "Subtítulos en español". */
  label: string;
  /** Idioma del texto (atributo `lang`): pronunciación y cortes de palabra. */
  idioma?: string;
  /** Cuántas líneas se ven. Las viejas se van por arriba. */
  maxLineas?: number;
  escala?: "normal" | "grande" | "enorme";
  /**
   * `hoja` sobre papel · `tinta` para una sala oscura o una pantalla
   * grande · `transparente` para un overlay de OBS/vMix: sin fondo, con
   * contorno para que se lea sobre cualquier video.
   */
  tono?: "hoja" | "tinta" | "transparente";
  /** Lo que se ve antes de la primera línea. */
  vacio?: ReactNode;
  className?: string;
}

/**
 * Subtítulos en vivo. La pieza por la que existe esta app: quien la lee
 * puede ser una persona sorda, y entonces esto no es un adorno de la
 * charla, ES la charla.
 *
 * Tres decisiones que no son de estilo:
 *   - `role="log"`: el lector de pantalla anuncia lo que se AGREGA, no la
 *     región entera cada vez (log implica aria-live polite).
 *   - la línea provisional vive FUERA del registro y con aria-hidden.
 *   - la línea más nueva es la de más contraste; las anteriores bajan un
 *     escalón, nunca por debajo de lo legible (tinta suave es 5,3:1).
 */
export default function PliegoSubtitulos({
  lineas,
  provisional,
  label,
  idioma,
  maxLineas = 3,
  escala = "grande",
  tono = "hoja",
  vacio,
  className,
}: PliegoSubtitulosProps) {
  // Una línea MÁS de las visibles: la que se va. No desaparece de golpe
  // (el bloque saltaba): queda una vuelta más, tenue, y recién en la
  // siguiente se retira.
  const enPantalla = lineas.slice(-(maxLineas + 1));
  const saliente = enPantalla.length > maxLineas ? enPantalla[0]?.id : undefined;
  const sinNada = enPantalla.length === 0 && !provisional;
  return (
    <div
      className={cx(
        "pliego-subtitulos",
        `pliego-subtitulos--${escala}`,
        `pliego-subtitulos--${tono}`,
        className,
      )}
      lang={idioma}
    >
      <div className="pliego-subtitulos__registro" role="log" aria-label={label}>
        {enPantalla.map((l, i) => (
          // La fila crece desde altura 0 (grid 0fr → 1fr): las de arriba se
          // desplazan con suavidad en vez de saltar, y el texto nunca se
          // recorta mientras entra (antes: barrido con clip-path).
          <div
            key={l.id}
            className={cx("pliego-subtitulos__fila", l.id === saliente && "pliego-subtitulos__fila--saliente")}
            aria-hidden={l.id === saliente || undefined}
          >
            <p
              className={cx(
                "pliego-subtitulos__linea",
                i === enPantalla.length - 1 && !provisional && "pliego-subtitulos__linea--ultima",
              )}
            >
              {l.texto}
            </p>
          </div>
        ))}
      </div>
      {provisional && (
        <p className="pliego-subtitulos__linea pliego-subtitulos__linea--provisional" aria-hidden="true">
          {provisional}
        </p>
      )}
      {sinNada && vacio != null && <p className="pliego-subtitulos__vacio">{vacio}</p>}
    </div>
  );
}
