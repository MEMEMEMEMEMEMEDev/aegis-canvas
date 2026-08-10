import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarBanner.scss";

export interface BazarBannerProps {
  /** El titular gigante. En el héroe de una página, pasar `as="h1"`. */
  title: string;
  as?: ElementType;
  /** Placa entintada arriba a la izquierda (p. ej. el rol o la sección). */
  kicker?: string;
  /** Micro-texto de la esquina derecha: telemetría del portal. */
  meta?: string;
  /** Línea pequeña bajo el titular, dentro del panel. */
  note?: ReactNode;
  /** rosa (default) · morado · holo — holo entinta el panel y tornasola el titular. */
  tone?: "rosa" | "morado" | "holo";
  className?: string;
}

/**
 * El banner de cartel: marco entintado con esquina cortada, panel de color
 * y un titular expandido y sesgado que ocupa todo el ancho. Es la pieza
 * que abre cada sección del portal.
 */
export default function BazarBanner({
  title,
  as: Title = "p",
  kicker,
  meta,
  note,
  tone = "rosa",
  className,
}: BazarBannerProps) {
  return (
    <section className={cx("bazar-banner", `bazar-banner--${tone}`, className)}>
      <div className="bazar-banner__panel">
        {(kicker || meta) && (
          <div className="bazar-banner__cabecera">
            {kicker && <span className="bazar-banner__kicker">{kicker}</span>}
            {meta && <span className="bazar-banner__meta">{meta}</span>}
          </div>
        )}
        <Title className="bazar-banner__titulo">
          <span className={cx("bazar-banner__texto", tone === "holo" && "bazar-holo")}>
            {title}
          </span>
        </Title>
        {note && <p className="bazar-banner__nota">{note}</p>}
      </div>
    </section>
  );
}
