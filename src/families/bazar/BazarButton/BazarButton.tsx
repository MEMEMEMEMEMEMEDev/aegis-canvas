import type { MouseEventHandler, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarButton.scss";

export interface BazarButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  /** rosa (default) · tinta · linea. */
  tone?: "rosa" | "tinta" | "linea";
  /** El círculo con la flecha ↗. */
  flecha?: boolean;
  className?: string;
}

/**
 * El botón del portal: cápsula con borde entintado y el círculo de la
 * flecha. `<a>` si lleva href, `<button>` si lleva onClick, `<span>` si es
 * solo maqueta.
 */
export default function BazarButton({
  children,
  href,
  onClick,
  tone = "rosa",
  flecha = true,
  className,
}: BazarButtonProps) {
  const clase = cx("bazar-boton", `bazar-boton--${tone}`, className);
  const contenido = (
    <>
      <span className="bazar-boton__texto">{children}</span>
      {flecha && (
        <span className="bazar-boton__flecha" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path
              d="M4 12L12 4M6 4h6v6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a className={clase} href={href} onClick={onClick}>
        {contenido}
      </a>
    );
  }
  if (onClick) {
    return (
      <button className={clase} type="button" onClick={onClick}>
        {contenido}
      </button>
    );
  }
  return <span className={clase}>{contenido}</span>;
}
