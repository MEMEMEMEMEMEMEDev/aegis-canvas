import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import DisqEmblem from "../DisqEmblem/DisqEmblem";
import type { DisqEmblemShape } from "../DisqEmblem/DisqEmblem";
import "../disquete.scss";
import "./DisqShelf.scss";

export interface DisqShelfProps {
  children: ReactNode;
  /** Rótulo de la hoja, arriba a la izquierda. */
  title?: string;
  /** Nota al pie de la hoja. */
  note?: ReactNode;
  /**
   * Emblema de la esquina superior derecha, por NOMBRE de forma: ver la nota
   * de DisqTitle sobre por qué no se pasa como nodo.
   */
  mark?: DisqEmblemShape;
  /**
   * Ancho mínimo de cada disquete. 19rem no es un número redondo: es el
   * ancho por debajo del cual una etiqueta con titular, resumen, lista y pie
   * deja de caber en la proporción 90×94 y estira el objeto.
   */
  min?: string;
  className?: string;
}

/**
 * Pliego DISQUETE: la hoja oscura con grano sobre la que se presentan los
 * discos, tal como se presenta un set de mockups.
 *
 * La rejilla es `auto-fill` con un mínimo: los disquetes no se estiran para
 * rellenar la fila. Un diskette deformado deja de ser un diskette, así que
 * la proporción manda sobre el reparto del ancho.
 */
export default function DisqShelf({
  children,
  title,
  note,
  mark,
  min = "19rem",
  className,
}: DisqShelfProps) {
  return (
    <section className={cx("disq-shelf", className)}>
      {(title || mark) && (
        <header className="disq-shelf__head">
          {title && <h2 className="disq-shelf__title">{title}</h2>}
          {mark && (
            <span className="disq-shelf__mark">
              <DisqEmblem shape={mark} size={2.6} />
            </span>
          )}
        </header>
      )}

      <div className="disq-shelf__grid" style={{ "--disq-min": min } as CSSProperties}>
        {children}
      </div>

      {note && <p className="disq-shelf__note">{note}</p>}
    </section>
  );
}
