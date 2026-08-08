import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqEmblem.scss";

export type DisqEmblemShape = "globe" | "disc" | "hazard";

export interface DisqEmblemProps {
  /** globe: retícula del mundo. disc: el disco con su cubo. hazard: aviso. */
  shape?: DisqEmblemShape;
  /**
   * Diámetro en em, RELATIVO al texto de alrededor. Dentro de un titular
   * hero de 5rem, 2em son 10rem: en contextos de letra grande el valor va
   * por debajo de 1.
   */
  size?: number;
  className?: string;
}

/**
 * Emblema DISQUETE: la marquita de retícula que las etiquetas de la
 * referencia ponen junto al titular.
 *
 * Dibujado a mano en SVG —trazos, sin relleno— y no importado de ninguna
 * parte: la familia no depende de ningún icono de terceros. Decorativo:
 * siempre oculto a los lectores de pantalla.
 */
export default function DisqEmblem({ shape = "globe", size = 1.6, className }: DisqEmblemProps) {
  return (
    <span
      className={cx("disq-emblem", `disq-emblem--${shape}`, className)}
      style={{ width: `${size}em`, height: `${size}em` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32">
        {shape === "globe" && (
          <>
            <circle cx="16" cy="16" r="13" />
            {/* Los meridianos son elipses aplastadas: la retícula de un globo
                visto de frente, que es como se imprime en un sello. */}
            <ellipse cx="16" cy="16" rx="5.5" ry="13" />
            <ellipse cx="16" cy="16" rx="11" ry="13" />
            <line x1="3" y1="16" x2="29" y2="16" />
            <line x1="5.5" y1="9" x2="26.5" y2="9" />
            <line x1="5.5" y1="23" x2="26.5" y2="23" />
          </>
        )}
        {shape === "disc" && (
          <>
            <circle cx="16" cy="16" r="13" />
            <circle cx="16" cy="16" r="4.5" />
            <rect x="13" y="13" width="6" height="6" />
          </>
        )}
        {shape === "hazard" && (
          <>
            <path d="M16 4 L29 27 H3 Z" />
            <line x1="16" y1="12" x2="16" y2="20" />
            <circle cx="16" cy="23.5" r="0.9" />
          </>
        )}
      </svg>
    </span>
  );
}
