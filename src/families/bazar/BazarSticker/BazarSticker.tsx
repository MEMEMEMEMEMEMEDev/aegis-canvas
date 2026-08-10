import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarSticker.scss";

export interface BazarStickerProps {
  children: ReactNode;
  /** papel (default) · rosa · tinta · holo. */
  tone?: "papel" | "rosa" | "tinta" | "holo";
  /** Grados de rotación. La calcomanía recta no existe en la referencia. */
  angle?: number;
  className?: string;
}

/** Calcomanía pegada en ángulo, con su troquel punteado por dentro. */
export default function BazarSticker({
  children,
  tone = "papel",
  angle = -6,
  className,
}: BazarStickerProps) {
  return (
    <span
      className={cx("bazar-sticker", `bazar-sticker--${tone}`, className)}
      style={{ "--bazar-sticker-angulo": `${angle}deg` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
