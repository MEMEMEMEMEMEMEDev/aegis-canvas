import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoCard.scss";

export interface TebeoCardProps {
  /** Título de la pestaña superior (mayúsculas, bold). */
  title: string;
  children: ReactNode;
  /** Puntitos de ventana ●●● en la cabecera. Default: true. */
  dots?: boolean;
  /** Zona de acciones al pie (botones, enlaces). */
  footer?: ReactNode;
  /** paper (default) o sun (tarjeta destacada). */
  tone?: "paper" | "sun";
  className?: string;
}

/**
 * Tarjeta-ventana TEBEO: borde grueso, radio grande, cabecera con título en
 * caps y puntitos de ventana retro (la card "SMARTPHONE APP MEMES" de la
 * referencia).
 */
export default function TebeoCard({
  title,
  children,
  dots = true,
  footer,
  tone = "paper",
  className,
}: TebeoCardProps) {
  return (
    <article className={cx("tebeo-card", `tebeo-card--${tone}`, className)}>
      <header className="tebeo-card__head">
        <h3 className="tebeo-card__title">{title}</h3>
        {dots && (
          <span className="tebeo-card__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </header>
      <div className="tebeo-card__body">{children}</div>
      {footer && <footer className="tebeo-card__foot">{footer}</footer>}
    </article>
  );
}
