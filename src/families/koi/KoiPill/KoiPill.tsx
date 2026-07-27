import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiPill.scss";

export interface KoiPillProps {
  children: ReactNode;
  /** Icono/emoji opcional delante. */
  icon?: ReactNode;
  /** glass (default), snow, sun o gold. */
  tone?: "glass" | "snow" | "sun" | "gold";
  className?: string;
}

/** Píldora meta KOI: horarios, ubicaciones, datos HUD ("5:00 pm – 7:00 pm"). */
export default function KoiPill({ children, icon, tone = "glass", className }: KoiPillProps) {
  return (
    <span className={cx("koi-pill", `koi-pill--${tone}`, className)}>
      {icon && (
        <span className="koi-pill__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
