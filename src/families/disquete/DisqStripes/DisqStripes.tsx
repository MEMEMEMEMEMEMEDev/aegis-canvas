import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqStripes.scss";

export interface DisqStripesProps {
  /** Alto de la pila en em, relativo al texto de la etiqueta. */
  height?: number;
  /** Bandas planas (default) o el borde superior escalonado del pliego. */
  step?: boolean;
  /**
   * atardecer: las tres tintas del pie de etiqueta (default).
   * espectro: las cinco del arcoíris instantáneo de la referencia 4 —
   * rojo, naranja, amarillo, verde, azul, en ese orden de imprenta.
   */
  variant?: "atardecer" | "espectro";
  /** Vertical: la banda cae como en el lomo de un pliego. */
  vertical?: boolean;
  className?: string;
}

/**
 * Bandas DISQUETE: tintas planas apiladas.
 *
 * Colores sólidos y NO un degradado: en la referencia están impresos en
 * offset, y el escalón entre tintas es justo lo que delata que está impreso
 * y no renderizado. Puramente decorativo.
 */
export default function DisqStripes({
  height = 1.6,
  step = false,
  variant = "atardecer",
  vertical = false,
  className,
}: DisqStripesProps) {
  const tintas = variant === "espectro" ? 5 : 3;
  return (
    <span
      className={cx(
        "disq-stripes",
        `disq-stripes--${variant}`,
        step && "disq-stripes--step",
        vertical && "disq-stripes--vertical",
        className,
      )}
      style={vertical ? { width: `${height}em` } : { height: `${height}em` }}
      aria-hidden="true"
    >
      {Array.from({ length: tintas }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
