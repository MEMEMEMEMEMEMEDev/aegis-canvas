import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import DisqEmblem from "../DisqEmblem/DisqEmblem";
import type { DisqEmblemShape } from "../DisqEmblem/DisqEmblem";
import "../disquete.scss";
import "./DisqSticker.scss";

export type DisqStickerShape = "caja" | "pastilla" | "escudo" | "banderin";
export type DisqStickerFill = "tinta" | "papel" | "coral" | "indigo";

export interface DisqStickerProps {
  /** El ideograma héroe (作品, 製品…): la pieza gráfica grande. */
  kana?: string;
  /** La línea latina bajo el kana. */
  title?: string;
  /** La microlínea del pie. */
  sub?: string;
  /** Emblema sobre el kana (el globo, el destello…). */
  emblem?: DisqEmblemShape;
  /** Forma del troquel. */
  shape?: DisqStickerShape;
  /** Tinta de fondo. */
  fill?: DisqStickerFill;
  /** Contenido libre en lugar de (o además de) la composición kana/title. */
  children?: ReactNode;
  /**
   * El kana es GRÁFICO y va aria-hidden (quien no lee japonés ve una forma;
   * el lector de pantalla no tiene por qué tropezar con ella). El title y el
   * sub sí se leen. Si el sticker entero es decorativo, escóndelo desde
   * fuera con aria-hidden.
   */
  className?: string;
}

/**
 * Sticker DISQUETE: la pieza troquelada de la hoja de la referencia 4 — el
 * parche negro con su ideograma enorme, la línea latina debajo y el borde de
 * papel del troquel alrededor.
 *
 * El borde troquelado no es un border: es el padding del propio sticker
 * enseñando el papel de fondo, que es como se imprime una pegatina de
 * verdad. En las formas cortadas (escudo, banderín) el mismo clip-path se
 * aplica dos veces —fuera papel, dentro tinta— y la diferencia de tamaño es
 * el canto.
 */
export default function DisqSticker({
  kana,
  title,
  sub,
  emblem,
  shape = "caja",
  fill = "tinta",
  children,
  className,
}: DisqStickerProps) {
  return (
    <span className={cx("disq-sticker", `disq-sticker--${shape}`, className)}>
      <span className={cx("disq-sticker__cuerpo", `disq-sticker__cuerpo--${fill}`)}>
        {emblem && (
          <span className="disq-sticker__emblema">
            <DisqEmblem shape={emblem} size={1.9} />
          </span>
        )}
        {kana && (
          <b className="disq-sticker__kana" aria-hidden="true">
            {kana}
          </b>
        )}
        {title && <span className="disq-sticker__title">{title}</span>}
        {sub && <span className="disq-sticker__sub">{sub}</span>}
        {children}
      </span>
    </span>
  );
}
