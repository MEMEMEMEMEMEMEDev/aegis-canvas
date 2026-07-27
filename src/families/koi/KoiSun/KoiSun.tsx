import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiSun.scss";

export interface KoiSunProps {
  /** Diámetro en px. Default: 180. */
  size?: number;
  /** Trazo de caligrafía cruzando el disco (default: uno de brocha SVG). */
  children?: ReactNode;
  /** Latido de glow. Default: true. */
  glow?: boolean;
  className?: string;
}

/**
 * Hinomaru KOI: disco solar rojo con un trazo de brocha blanca cruzándolo.
 * Ancla gráfica decorativa — se posiciona detrás/entre el contenido.
 */
export default function KoiSun({ size = 180, children, glow = true, className }: KoiSunProps) {
  return (
    <span
      className={cx("koi-sun", glow && "koi-sun--glow", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children ?? (
        <svg viewBox="0 0 100 100" className="koi-sun__stroke">
          <path
            d="M28 70 C 40 52, 46 40, 50 22 M50 46 C 58 56, 66 62, 78 66"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
