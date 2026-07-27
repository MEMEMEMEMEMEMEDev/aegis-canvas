import type { ElementType, ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiBrush.scss";

export interface KoiBrushProps {
  children: ReactNode;
  /** Etiqueta semántica. Default: span. */
  as?: ElementType;
  /** snow (default), sun o ink (para fondos claros). */
  tone?: "snow" | "sun" | "ink";
  /** hero (gigante), title o word (inline). */
  size?: "hero" | "title" | "word";
  /** Grados de inclinación caligráfica. Default: -3. */
  tilt?: number;
  className?: string;
}

/**
 * Caligrafía KOI: Permanent Marker con inclinación, la voz "pintada a mano"
 * que cruza sobre el vidrio y el hinomaru (el "FES-TIVAL" / "KANDA" de las
 * referencias).
 */
export default function KoiBrush({
  children,
  as: Tag = "span",
  tone = "snow",
  size = "title",
  tilt = -3,
  className,
}: KoiBrushProps) {
  return (
    <Tag
      className={cx("koi-brush", `koi-brush--${tone}`, `koi-brush--${size}`, className)}
      style={{ "--kb-tilt": `${tilt}deg` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
