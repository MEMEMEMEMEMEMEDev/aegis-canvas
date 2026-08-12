import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqHolo.scss";

export interface DisqHoloProps {
  /** Diámetro en em, relativo al texto de alrededor. */
  size?: number;
  className?: string;
}

/**
 * Holo DISQUETE: el sticker holográfico circular de la hoja de referencia —
 * ese redondel tornasolado que las imprentas pegaban como sello de
 * autenticidad.
 *
 * Es un conic-gradient con las tintas del espectro batidas en suave, una
 * retícula fina encima y un brillo que gira despacio (solo transform). Con
 * prefers-reduced-motion el brillo se queda quieto: el tornasol sigue,
 * porque el tornasol es impresión, no movimiento. Decorativo siempre.
 */
export default function DisqHolo({ size = 4, className }: DisqHoloProps) {
  return (
    <span
      className={cx("disq-holo", className)}
      style={{ width: `${size}em`, height: `${size}em` }}
      aria-hidden="true"
    >
      <span className="disq-holo__brillo" />
    </span>
  );
}
