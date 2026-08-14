import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarFondo.scss";

export interface BazarFondoProps {
  /** El ideograma gigante del telón. Se recorta contra el borde. */
  kana?: string;
  /** La palabra de cartel que cruza el fondo, repetida como una cenefa. */
  palabra?: string;
  /** rosa (default) · morado */
  tone?: "rosa" | "morado";
  className?: string;
}

/**
 * EL TELÓN: las capas de fondo de una pantalla BAZAR — trama de imprenta,
 * bandas diagonales, el kana reventado y el grano del cartón.
 *
 * Cada capa se mueve a su propia velocidad con `animation-timeline: scroll()`,
 * así que el parallax NO cuesta un solo byte de JavaScript ni un listener de
 * scroll. En un navegador sin timelines de scroll las capas se quedan
 * quietas en su sitio y la pantalla sigue entera: el relieve es el
 * enriquecimiento, no el fondo.
 *
 * Decorativo de arriba abajo — nada de lo que dibuja hay que leerlo.
 */
export default function BazarFondo({ kana, palabra, tone = "rosa", className }: BazarFondoProps) {
  return (
    <div className={cx("bazar-fondo", `bazar-fondo--${tone}`, className)} aria-hidden="true">
      <span className="bazar-fondo__trama" />
      <span className="bazar-fondo__bandas" />
      {kana && <span className="bazar-fondo__kana">{kana}</span>}
      {palabra && (
        <span className="bazar-fondo__cenefa">
          {/* Tres veces la misma palabra: la cenefa tiene que sobrar por
              los dos cantos para que al derivar no aparezca su final. */}
          {palabra} · {palabra} · {palabra}
        </span>
      )}
    </div>
  );
}
