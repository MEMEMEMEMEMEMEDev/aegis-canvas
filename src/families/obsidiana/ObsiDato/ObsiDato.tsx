import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiDato.scss";

export interface ObsiDatoProps {
  /** La cifra (mono, grande). */
  value: string;
  label: string;
  /** Cifra en cian en vez de blanco. */
  accent?: boolean;
  className?: string;
}

/**
 * Dato OBSIDIANA: cifra mono con su tick diagonal — la unidad mínima de
 * evidencia de la galería (métricas de un caso de estudio, stats del hero).
 */
export default function ObsiDato({ value, label, accent = false, className }: ObsiDatoProps) {
  return (
    <div className={cx("obsi-dato", accent && "obsi-dato--accent", className)}>
      <span className="obsi-dato__tick" aria-hidden="true" />
      <span className="obsi-dato__value">{value}</span>
      <span className="obsi-dato__label">{label}</span>
    </div>
  );
}
