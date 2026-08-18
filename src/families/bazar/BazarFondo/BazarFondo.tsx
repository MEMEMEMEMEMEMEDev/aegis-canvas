import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarFondo.scss";

export interface BazarFondoProps {
  /** El ideograma gigante del telón. Se recorta contra el borde. */
  kana?: string;
  /** La palabra de cartel que cruza el fondo, repetida como una cenefa. */
  palabra?: string;
  /**
   * Qué mueve las capas.
   *
   * `scroll` (por defecto) las engancha al scroll del documento: parallax de
   * verdad, sin un byte de JavaScript, para páginas que se recorren bajando.
   *
   * `reloj` las mueve solas, en ciclos muy largos. Es lo que necesita una
   * pantalla que NO SCROLLEA —una consola de un solo viewport—, donde la
   * timeline de scroll no avanza jamás y el telón se queda congelado en su
   * primer fotograma sin que nada avise de que estaba muerto.
   */
  motor?: "scroll" | "reloj";
  /** rosa (default) · morado */
  tone?: "rosa" | "morado";
  className?: string;
}

/**
 * EL TELÓN: las capas de fondo de una pantalla BAZAR — trama de imprenta,
 * bandas diagonales, motas en suspensión, el kana reventado, la cenefa de
 * cartel y el barrido de luz que cruza cada tanto.
 *
 * El movimiento es LENTO a propósito: ciclos de entre 18 y 90 segundos con
 * amplitudes del 2 al 4 %. La regla de la familia es que si te quedas
 * mirando lo notas, y si estás leyendo no. Un fondo que llama la atención
 * deja de ser fondo; uno que parpadea deja de ser usable.
 *
 * Decorativo de arriba abajo — nada de lo que dibuja hay que leerlo.
 */
export default function BazarFondo({
  kana,
  palabra,
  motor = "scroll",
  tone = "rosa",
  className,
}: BazarFondoProps) {
  return (
    <div
      className={cx("bazar-fondo", `bazar-fondo--${tone}`, `bazar-fondo--${motor}`, className)}
      aria-hidden="true"
    >
      <span className="bazar-fondo__trama" />
      <span className="bazar-fondo__bandas" />
      {/* Dos capas de motas que derivan en sentidos opuestos: una sola se lee
          como una textura que resbala; dos, como aire con cosas dentro. */}
      <span className="bazar-fondo__motas" />
      <span className="bazar-fondo__motas bazar-fondo__motas--alta" />
      {kana && <span className="bazar-fondo__kana">{kana}</span>}
      {palabra && (
        <span className="bazar-fondo__cenefa">
          {/* Tres veces la misma palabra: la cenefa tiene que sobrar por
              los dos cantos para que al derivar no aparezca su final. */}
          {palabra} · {palabra} · {palabra}
        </span>
      )}
      {/* El barrido va el ÚLTIMO: es luz, y la luz pasa por encima de todo lo
          que hay pintado debajo. */}
      <span className="bazar-fondo__barrido" />
    </div>
  );
}
