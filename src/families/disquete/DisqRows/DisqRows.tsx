import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqRows.scss";

export interface DisqRowsProps {
  /** Las entradas, en orden. Se numeran solas. */
  items: string[];
  /** stack: una por línea (lista). inline: corridas, como un tracklist. */
  layout?: "stack" | "inline";
  className?: string;
}

/**
 * Filas de pista DISQUETE: la letra pequeña numerada de una etiqueta de
 * mixtape ("1 · CONNECTIONS 2 · FAKE TRUE 3 · LOGIC LOVERS…").
 *
 * Es un `<ol>` de verdad: para un lector de pantalla esto es una lista
 * ordenada, y el numerito no es un carácter escrito a mano sino el contador
 * de la lista. Con `inline` se leen corridas, que es como se imprimen.
 */
export default function DisqRows({ items, layout = "stack", className }: DisqRowsProps) {
  return (
    <ol className={cx("disq-rows", `disq-rows--${layout}`, className)}>
      {items.map((item, i) => (
        <li className="disq-rows__item" key={i}>
          {item}
        </li>
      ))}
    </ol>
  );
}
