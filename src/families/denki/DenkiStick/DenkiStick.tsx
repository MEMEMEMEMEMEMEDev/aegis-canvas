import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiStick.scss";

export interface DenkiStickBoton {
  /** Id estable: es lo que llega en `activo`. */
  id: string;
  /** El número serigrafiado en el botón. Uno o dos caracteres. */
  marca: string;
  /** Qué hace ese botón. Va bajo la máquina, en la ficha. */
  label: string;
}

export interface DenkiStickProps {
  /**
   * Los botones grandes de la fila principal. Tres es lo que pide el
   * dibujo; con más, la fila se aprieta y deja de leerse como un mando.
   */
  botones: readonly DenkiStickBoton[];
  /** Id del botón encendido. */
  activo?: string | null;
  /**
   * Modo atracción: los botones se encienden en secuencia, como una
   * recreativa esperando a que alguien llegue. Se apaga solo con
   * `prefers-reduced-motion`.
   */
  attract?: boolean;
  /** El rótulo serigrafiado en la placa del chasis. */
  placa?: string;
  /**
   * Sobre qué superficie se apoya: el papel arena (default) o un panel
   * negro.
   *
   * No es cosmético. El chasis se dibuja siempre en crema, pero la ficha de
   * patillaje que va debajo se rotula en tinta — y sobre un panel negro esa
   * tinta desaparece. Es la misma lección que dejó BAZAR: una familia que
   * vive sobre dos superficies necesita decir sobre cuál está.
   */
  sobre?: "papel" | "panel";
  /** Marca del canto derecho, en katakana o kanji. Decorativa. */
  kana?: string;
  /**
   * Nombre accesible. La máquina es un DIBUJO: con nombre es una imagen
   * con descripción y sin él es decoración. Como ilustra de qué va la
   * pantalla, casi siempre debería llevarlo.
   */
  label?: string;
  className?: string;
}

/**
 * LA MÁQUINA: el panel de control arcade del póster de la referencia,
 * dibujado con cajas — chasis biselado en perspectiva, fila de botones
 * grandes, racimo auxiliar, rejilla de ventilación y placa serigrafiada.
 *
 * No es una foto ni un render importado: son divs con las proporciones del
 * aparato, así que pesa cero, escala sin pixelarse y no depende del
 * material de nadie. Si se puede dibujar, se dibuja.
 *
 * Los botones NO son botones: son la ilustración de los botones. Lo que se
 * pulsa de verdad son los controles de la página, que van aparte y saben
 * decir lo que hacen.
 */
export default function DenkiStick({
  botones,
  activo = null,
  attract = false,
  placa,
  sobre = "papel",
  kana,
  label,
  className,
}: DenkiStickProps) {
  return (
    <div
      className={cx("denki-stick", `denki-stick--en-${sobre}`, attract && "is-attract", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <div className="denki-stick__mueble">
        <div className="denki-stick__cara">
          {/* La costura del chasis: la línea donde se separan las dos
              mitades de la carcasa, y el detalle que más lo hace parecer
              un objeto fabricado en vez de un rectángulo. */}
          <span className="denki-stick__costura" />

          <span className="denki-stick__rejilla" />

          <span className="denki-stick__botones">
            {botones.map((boton, i) => (
              <span
                key={boton.id}
                className={cx(
                  "denki-stick__boton",
                  activo === boton.id && "is-activo",
                )}
                // El desfase del encendido en secuencia. Va como custom
                // property y no como clase por índice: así la familia no
                // tiene que saber cuántos botones habrá.
                style={{ "--boton-i": i } as CSSProperties}
              >
                <span className="denki-stick__marca">{boton.marca}</span>
              </span>
            ))}
          </span>

          <span className="denki-stick__aux">
            <i />
            <i />
            <i />
            <i />
          </span>

          {placa && <span className="denki-stick__placa">{placa}</span>}
          {kana && (
            <span className="denki-stick__kana" lang="ja">
              {kana}
            </span>
          )}
        </div>

        {/* El canto: el grosor del aparato visto desde arriba. Sin esto el
            chasis es una pegatina, no una caja. */}
        <div className="denki-stick__canto" />
      </div>

      {/* La ficha de patillaje: qué hace cada botón, numerado como en el
          manual. Es la parte que SÍ se lee. */}
      <ul className="denki-stick__ficha">
        {botones.map((boton) => (
          <li key={boton.id} className={cx(activo === boton.id && "is-activo")}>
            <b>{boton.marca}</b>
            <span>{boton.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
