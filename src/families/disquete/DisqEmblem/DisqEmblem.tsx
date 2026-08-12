import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqEmblem.scss";

export type DisqEmblemShape = "globe" | "disc" | "hazard" | "estrella" | "diana";

export interface DisqEmblemProps {
  /**
   * globe: retícula del mundo. disc: el disco con su cubo. hazard: aviso.
   * estrella: el destello de cuatro puntas de las hojas de stickers.
   * diana: los anillos de registro de imprenta.
   */
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
        {shape === "estrella" && (
          /* Cuatro puntas con los flancos curvados hacia dentro: el destello
             de las hojas de stickers, relleno — un destello hueco no brilla. */
          <path d="M16 1 C17.6 10.4 21.6 14.4 31 16 C21.6 17.6 17.6 21.6 16 31 C14.4 21.6 10.4 17.6 1 16 C10.4 14.4 14.4 10.4 16 1 Z" />
        )}
        {shape === "diana" && (
          <>
            <circle cx="16" cy="16" r="13" />
            <circle cx="16" cy="16" r="9" />
            <circle cx="16" cy="16" r="5" />
            <circle cx="16" cy="16" r="1.6" />
          </>
        )}
      </svg>
    </span>
  );
}
