import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiPlay.scss";

export interface KoiPlayProps {
  /** Etiqueta bajo el círculo ("Intro", "Reel"). */
  label?: string;
  onClick?: () => void;
  /** Diámetro del círculo en px. Default: 96. */
  size?: number;
  className?: string;
}

/**
 * Botón-play KOI: anillo de vidrio con triángulo, etiqueta espaciada debajo
 * (el "Intro" flotando sobre el pez de la referencia).
 */
export default function KoiPlay({ label, onClick, size = 96, className }: KoiPlayProps) {
  return (
    <button
      type="button"
      className={cx("koi-play", className)}
      onClick={onClick}
      aria-label={label ?? "Reproducir"}
    >
      <span className="koi-play__ring" style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6.5 L17 12 L9 17.5 Z" fill="currentColor" />
        </svg>
      </span>
      {label && <span className="koi-play__label">{label}</span>}
    </button>
  );
}
