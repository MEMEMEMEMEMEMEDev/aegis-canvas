import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiDate.scss";

export interface KoiDateProps {
  /** Líneas pequeñas a la izquierda ("Tokyo's", "Kanda", "Matsuri"). */
  lines: string[];
  /** Texto pequeño sobre la cifra ("Oct, 2024"). */
  over?: string;
  /** La cifra protagonista ("02"). */
  big: string;
  className?: string;
}

/**
 * Tarjeta-fecha KOI: bloque blanco con líneas pequeñas, divisor y cifra
 * gigante (la tarjeta "Oct 2024 / 02" de la referencia). Sirve para fechas,
 * disponibilidad o cualquier dato que merezca protagonismo.
 */
export default function KoiDate({ lines, over, big, className }: KoiDateProps) {
  return (
    <div className={cx("koi-date", className)}>
      <span className="koi-date__lines">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      <span className="koi-date__divider" aria-hidden="true" />
      <span className="koi-date__main">
        {over && <span className="koi-date__over">{over}</span>}
        <span className="koi-date__big">{big}</span>
      </span>
    </div>
  );
}
