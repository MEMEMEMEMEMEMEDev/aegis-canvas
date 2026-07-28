import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiHanko.scss";

export interface KoiHankoProps {
  /** Carácter del sello (kanji, kana o letra). Default: 鯉 (koi). */
  char?: string;
  /** Lado en px. Default: 76. */
  size?: number;
  /** Rojo hinomaru (default) o dorado linterna. */
  tone?: "sun" | "gold";
  /** Grados de inclinación del estampado. Default: -7. */
  tilt?: number;
  /** Si viene, el sello es informativo (role img); si no, decorativo. */
  label?: string;
  className?: string;
}

/**
 * Hanko KOI: sello japonés estampado — marco cuadrado de trazo grueso,
 * carácter caligráfico y la imperfección de la tinta (un lado del marco
 * más débil, como toda estampa real).
 */
export default function KoiHanko({
  char = "鯉",
  size = 76,
  tone = "sun",
  tilt = -7,
  label,
  className,
}: KoiHankoProps) {
  return (
    <span
      className={cx("koi-hanko", `koi-hanko--${tone}`, className)}
      style={
        {
          width: size,
          height: size,
          fontSize: size * 0.52,
          "--kh-tilt": `${tilt}deg`,
        } as CSSProperties
      }
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {char}
    </span>
  );
}
