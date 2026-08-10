import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarChrome.scss";

export interface BazarChromeProps {
  /** La dirección que muestra la barra. Texto real y visible — no un adorno. */
  url: string;
  children: ReactNode;
  className?: string;
}

/**
 * El navegador ficticio que envuelve la página: barra de dirección arriba,
 * pliego de papel al centro y pie con la dirección reflejada. Es el marco
 * de TODA vista BAZAR — los demás componentes viven sobre su pliego.
 */
export default function BazarChrome({ url, children, className }: BazarChromeProps) {
  return (
    <div className={cx("bazar-chrome", className)}>
      <div className="bazar-chrome__barra">
        <span className="bazar-chrome__menu" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="bazar-chrome__direccion">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
            <path
              d="M5 7V5a3 3 0 0 1 6 0v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          <span className="bazar-chrome__url">{url}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M13 8a5 5 0 1 1-1.5-3.5M11.5 1.5v3h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <div className="bazar-chrome__pagina">{children}</div>

      {/* El pie del portal: la dirección y su reflejo, como en la referencia.
          Decorativo entero — la dirección real ya se leyó arriba. */}
      <div className="bazar-chrome__pie" aria-hidden="true">
        <span>{url}</span>
        <span className="bazar-chrome__espejo">{url}</span>
      </div>
    </div>
  );
}
