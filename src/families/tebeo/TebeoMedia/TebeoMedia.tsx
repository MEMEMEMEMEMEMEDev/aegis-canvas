import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoMedia.scss";

export interface TebeoMediaProps {
  /** Visual: img, video, canvas 3D… cualquier nodo. */
  children: ReactNode;
  /** Riel amarillo lateral con estrellas y flecha (como en la referencia). */
  rail?: "right" | "left" | "none";
  /** Relación de aspecto CSS, p. ej. "4 / 3". Default: "4 / 5". */
  ratio?: string;
  className?: string;
}

/**
 * Marco de medios TEBEO: borde grueso, radio grande y riel de sol opcional
 * con ★★ y flecha — el marco de personaje de la referencia. Pensado para
 * capturas de proyectos o un canvas 3D en vivo.
 */
export default function TebeoMedia({
  children,
  rail = "none",
  ratio = "4 / 5",
  className,
}: TebeoMediaProps) {
  return (
    <figure
      className={cx("tebeo-media", rail !== "none" && `tebeo-media--rail-${rail}`, className)}
      style={{ aspectRatio: ratio }}
    >
      <div className="tebeo-media__visual">{children}</div>
      {rail !== "none" && (
        <span className="tebeo-media__rail" aria-hidden="true">
          <span className="tebeo-media__stars">
            ★<br />★
          </span>
          <span className="tebeo-media__arrow">↑</span>
        </span>
      )}
    </figure>
  );
}
