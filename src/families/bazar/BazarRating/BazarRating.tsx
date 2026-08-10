import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarRating.scss";

export interface BazarRatingProps {
  /** El dato que muestra el display: "★5", "2022 · 2025", "4 AÑOS"… */
  value: string;
  /** Corazones llenos (0–5). Decorativos: el dato es `value`. */
  corazones?: number;
  /** Nombre accesible completo. Default: el propio value. */
  label?: string;
  tone?: "morado" | "rosa";
  /** Grados de rotación de la calcomanía. */
  rotate?: number;
  className?: string;
}

/**
 * La ventanita de valoración: fila de corazones y un display con el dato.
 * El dato es texto real y configurable — la familia no inventa puntajes;
 * el display puede mostrar un período, una duración o lo que el contenido
 * pueda respaldar.
 */
export default function BazarRating({
  value,
  corazones = 5,
  label,
  tone = "morado",
  rotate = 2,
  className,
}: BazarRatingProps) {
  return (
    <div
      className={cx("bazar-rating", `bazar-rating--${tone}`, className)}
      role="img"
      aria-label={label ?? value}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div className="bazar-rating__corazones" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={cx(i < corazones && "bazar-rating__lleno")}>
            ♥
          </span>
        ))}
      </div>
      <div className="bazar-rating__valor" aria-hidden="true">
        {value}
      </div>
    </div>
  );
}
