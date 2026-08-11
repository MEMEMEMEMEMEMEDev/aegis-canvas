import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeClip.scss";

export interface BeigeClipProps {
  /** Lo que dice el asistente. Va en el globo, como texto real. */
  children: ReactNode;
  /** Nombre accesible de la figura. */
  label?: string;
  className?: string;
}

/**
 * El asistente: un clip metálico con ojos enormes parado sobre su hoja
 * amarilla, con globo de diálogo. Dibujo PROPIO en SVG — homenaje al
 * arquetipo, sin un solo asset ajeno. Parpadea cada tanto (motion-safe) y
 * levanta las cejas al pasar por encima.
 */
export default function BeigeClip({ children, label = "El asistente", className }: BeigeClipProps) {
  return (
    <figure className={cx("beige-clip", className)} aria-label={label}>
      <div className="beige-clip__globo">
        <div className="beige-clip__texto">{children}</div>
        <span className="beige-clip__cola" aria-hidden="true" />
      </div>

      <div className="beige-clip__hoja" aria-hidden="true">
        <svg className="beige-clip__mono" viewBox="0 0 72 96">
          {/* La sombra sobre el papel. */}
          <ellipse cx="37" cy="88" rx="22" ry="5" fill="rgb(0 0 0 / 18%)" />

          {/* El alambre: dos vueltas de clip, trazo metálico con luz. */}
          <g fill="none" strokeLinecap="round">
            <path
              className="beige-clip__alambre"
              d="M24 86 C13 84 10 72 10 60 L10 26 C10 13 18 6 28 6 C38 6 46 13 46 26 L46 64 C46 74 41 80 34 80 C27 80 22 74 22 64 L22 32"
              stroke="#7e858d"
              strokeWidth="7"
            />
            <path
              d="M24 86 C13 84 10 72 10 60 L10 26 C10 13 18 6 28 6 C38 6 46 13 46 26 L46 64 C46 74 41 80 34 80 C27 80 22 74 22 64 L22 32"
              stroke="#b9c0c8"
              strokeWidth="3"
            />
            <path
              d="M24 86 C13 84 10 72 10 60 L10 26 C10 13 18 6 28 6"
              stroke="#e8edf2"
              strokeWidth="1.4"
            />
          </g>

          {/* Cejas: suben con el hover del contenedor. */}
          <g className="beige-clip__cejas" stroke="#3a3f45" strokeWidth="3" strokeLinecap="round">
            <path d="M16 22 L26 19" />
            <path d="M34 19 L44 22" />
          </g>

          {/* Ojos: blancos enormes, pupila y brillo. El párpado es un rect
              que cae con la animación de parpadeo. */}
          <g className="beige-clip__ojo beige-clip__ojo--izq">
            <ellipse cx="22" cy="32" rx="9" ry="11" fill="#fff" stroke="#3a3f45" strokeWidth="2.5" />
            <circle cx="24" cy="34" r="3.6" fill="#1c1f24" />
            <circle cx="25.4" cy="32.4" r="1.2" fill="#fff" />
            <rect className="beige-clip__parpado" x="12" y="20" width="20" height="0" fill="#c9ced4" />
          </g>
          <g className="beige-clip__ojo beige-clip__ojo--der">
            <ellipse cx="40" cy="32" rx="9" ry="11" fill="#fff" stroke="#3a3f45" strokeWidth="2.5" />
            <circle cx="42" cy="34" r="3.6" fill="#1c1f24" />
            <circle cx="43.4" cy="32.4" r="1.2" fill="#fff" />
            <rect className="beige-clip__parpado" x="30" y="20" width="20" height="0" fill="#c9ced4" />
          </g>
        </svg>
      </div>
    </figure>
  );
}
