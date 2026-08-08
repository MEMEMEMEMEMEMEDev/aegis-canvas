import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqBadge.scss";

export interface DisqBadgeProps {
  /** La cifra o letra del cuadro ("5", "A", "HD"). */
  mark: string;
  /** Las dos líneas de letra pequeña a la derecha del cuadro. */
  lines: [string, string];
  className?: string;
}

/**
 * Sello DISQUETE: el cuadro de certificación de las etiquetas de la
 * referencia ("5 · THE PRODUCTION · SUPERIOR"). Una cifra grande encajonada
 * y dos renglones diminutos al lado.
 */
export default function DisqBadge({ mark, lines, className }: DisqBadgeProps) {
  return (
    <span className={cx("disq-badge", className)}>
      <b className="disq-badge__mark">{mark}</b>
      <span className="disq-badge__lines">
        <i>{lines[0]}</i>
        <i>{lines[1]}</i>
      </span>
    </span>
  );
}
