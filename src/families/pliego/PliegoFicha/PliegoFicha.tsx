import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoFicha.scss";

export interface PliegoFichaProps {
  children: ReactNode;
  /** Rótulo en micro sobre el texto. */
  titulo?: string;
  /** Kanji al margen, como la anotación al canto de la referencia. */
  kana?: string;
  /** Numera la ficha: "01". */
  indice?: string;
  tone?: "hoja" | "papel" | "tinta";
  className?: string;
}

/**
 * El bloque de texto denso del pliego: el párrafo pequeño y muy ordenado que
 * en la referencia va en japonés, con su filete al margen y su anotación.
 *
 * Aquí lleva prosa de verdad —el problema que resuelve un demo, lo que
 * incluye— y por eso el cuerpo NO baja de 0,7rem por mucho que se le pida:
 * la letra pequeña de esta familia es contenido, no textura.
 */
export default function PliegoFicha({
  children,
  titulo,
  kana,
  indice,
  tone = "hoja",
  className,
}: PliegoFichaProps) {
  return (
    <div className={cx("pliego-ficha", `pliego-ficha--${tone}`, className)}>
      {(titulo || indice) && (
        <p className="pliego-ficha__cabeza">
          {indice && (
            <span className="pliego-ficha__indice" aria-hidden="true">
              {indice}
            </span>
          )}
          {titulo && <span className="pliego-ficha__titulo">{titulo}</span>}
        </p>
      )}

      <div className="pliego-ficha__cuerpo">{children}</div>

      {kana && (
        <span className="pliego-ficha__kana" aria-hidden="true">
          {kana}
        </span>
      )}
    </div>
  );
}
