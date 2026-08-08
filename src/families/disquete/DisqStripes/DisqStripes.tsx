import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqStripes.scss";

export interface DisqStripesProps {
  /** Alto de la pila en em, relativo al texto de la etiqueta. */
  height?: number;
  /** Bandas planas (default) o el borde superior escalonado del pliego. */
  step?: boolean;
  className?: string;
}

/**
 * Bandas DISQUETE: las tres tintas planas del pie de etiqueta.
 *
 * Tres colores sólidos y NO un degradado: en la referencia son un atardecer
 * impreso en offset, y el escalón entre tintas es justo lo que delata que
 * está impreso y no renderizado. Puramente decorativo.
 */
export default function DisqStripes({ height = 1.6, step = false, className }: DisqStripesProps) {
  return (
    <span
      className={cx("disq-stripes", step && "disq-stripes--step", className)}
      style={{ height: `${height}em` }}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}
