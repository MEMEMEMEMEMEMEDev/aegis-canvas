import type { MouseEventHandler, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../beige.scss";
import "./BeigeBoton.scss";

export interface BeigeBotonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  /** El botón por defecto del diálogo: doble borde negro. */
  principal?: boolean;
  className?: string;
}

/**
 * El botón del sistema: plata con bisel saliente que se hunde al pulsar.
 * `<a>` si lleva href, `<button>` si lleva onClick, `<span>` si es maqueta.
 */
export default function BeigeBoton({
  children,
  href,
  onClick,
  principal = false,
  className,
}: BeigeBotonProps) {
  const clase = cx("beige-boton", principal && "beige-boton--principal", className);

  if (href) {
    return (
      <a className={clase} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button className={clase} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className={clase}>{children}</span>;
}
