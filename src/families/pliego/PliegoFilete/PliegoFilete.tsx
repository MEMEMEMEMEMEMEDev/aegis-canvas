import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoFilete.scss";

export interface PliegoFileteProps {
  /** Rótulo al principio de la línea. Sin él, el filete es solo un filete. */
  label?: string;
  /** Lectura al final de la línea (una cifra, un estado). */
  readout?: string;
  /** Añade las marcas de tick de una regla de imprenta. */
  marcas?: boolean;
  tone?: "tinta" | "rosa" | "suave";
  className?: string;
}

/**
 * El filete rotulado: la línea de un pelo que separa los bloques del pliego,
 * con su nombre a la izquierda y su lectura a la derecha.
 *
 * Es un separador CON contenido, así que no lleva `role="separator"`: un
 * separador semántico que además anuncia dos textos confunde más de lo que
 * ayuda. Para una raya muda, se usa sin `label` ni `readout` y entonces sí
 * queda `aria-hidden`.
 */
export default function PliegoFilete({
  label,
  readout,
  marcas = false,
  tone = "tinta",
  className,
}: PliegoFileteProps) {
  const mudo = !label && !readout;

  return (
    <div
      className={cx("pliego-filete", `pliego-filete--${tone}`, marcas && "pliego-filete--marcas", className)}
      aria-hidden={mudo || undefined}
    >
      {label && <span className="pliego-filete__label">{label}</span>}
      <span className="pliego-filete__linea" aria-hidden="true" />
      {readout && <span className="pliego-filete__readout">{readout}</span>}
    </div>
  );
}
