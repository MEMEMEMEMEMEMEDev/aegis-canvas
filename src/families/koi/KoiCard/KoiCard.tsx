import type { ReactNode } from "react";
import KoiPill from "../KoiPill/KoiPill";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiCard.scss";

export interface KoiCardProps {
  title: string;
  /** Visual de fondo: img, gradiente, canvas… llena toda la tarjeta. */
  visual: ReactNode;
  /** Píldora meta bajo el título ("5:00 pm – 7:00 pm", stack, año…). */
  pill?: ReactNode;
  /** tall = tarjeta vertical con título girado 90° (como la referencia). */
  orientation?: "wide" | "tall";
  /** Contenido extra sobre el visual (esquina inferior). */
  children?: ReactNode;
  /** Si viene, la tarjeta entera es un enlace. */
  href?: string;
  className?: string;
}

/**
 * Tarjeta de evento KOI: visual a sangre bajo velo de vidrio, título blanco
 * y píldora de horario. En `tall` el título corre en vertical por el borde,
 * como los carteles "Quiver Dance / Golden Road" de la referencia.
 */
export default function KoiCard({
  title,
  visual,
  pill,
  orientation = "wide",
  children,
  href,
  className,
}: KoiCardProps) {
  const Root = href ? "a" : "article";
  return (
    <Root
      className={cx("koi-card", `koi-card--${orientation}`, className)}
      {...(href ? { href } : {})}
    >
      <div className="koi-card__visual">{visual}</div>
      <div className="koi-card__scrim" aria-hidden="true" />
      <div className="koi-card__head">
        <h3 className="koi-card__title">{title}</h3>
        {pill && <span className="koi-card__pill">{typeof pill === "string" ? <KoiPill>{pill}</KoiPill> : pill}</span>}
      </div>
      {children && <div className="koi-card__extra">{children}</div>}
    </Root>
  );
}
