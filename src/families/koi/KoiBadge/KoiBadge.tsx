import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiBadge.scss";

export interface KoiBadgeProps {
  /** Línea meta superior (p. ej. "📍 Japan"). */
  eyebrow?: ReactNode;
  /** Título en caligrafía brush. */
  title: ReactNode;
  /** Línea inferior en UI limpia ("Of the Year"). */
  sub?: ReactNode;
  /** Sello rojo pequeño en la esquina. Default: true. */
  seal?: boolean;
  className?: string;
}

/**
 * Sticker-nube KOI: tarjeta blanca de esquinas infladas con caligrafía brush
 * y sello hinomaru (el badge "FES-TIVAL Of the Year" de la referencia).
 */
export default function KoiBadge({ eyebrow, title, sub, seal = true, className }: KoiBadgeProps) {
  return (
    <div className={cx("koi-badge", className)}>
      {eyebrow && <span className="koi-badge__eyebrow">{eyebrow}</span>}
      <span className="koi-badge__title">{title}</span>
      {sub && <span className="koi-badge__sub">{sub}</span>}
      {seal && (
        <span className="koi-badge__seal" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <path
              d="M30 68 C 44 54, 52 40, 56 24 M52 50 C 60 58, 68 63, 78 66"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
