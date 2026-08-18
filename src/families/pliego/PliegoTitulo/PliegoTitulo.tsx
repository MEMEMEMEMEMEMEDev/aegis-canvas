import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoTitulo.scss";

export interface PliegoTituloProps {
  /** La palabra grande. En minúsculas: es la firma de la familia. */
  children: ReactNode;
  /** Línea de kanji encima, del tamaño de la palabra. Decorativa. */
  kana?: string;
  /** Línea diminuta sobre todo, entre asteriscos. */
  sobre?: string;
  /** El signo rosa al final de la palabra. `false` lo quita. */
  bang?: boolean | string;
  size?: "hero" | "seccion" | "ficha";
  as?: ElementType;
  className?: string;
}

/**
 * El titular de PLIEGO: una palabra en minúsculas, enorme y muy apretada,
 * con una línea de marca encima —rótulo diminuto y sello de kanji— y un
 * signo rosa al final.
 *
 * El kanji va marcado `aria-hidden` a propósito: es una mancha gráfica, no
 * una traducción — quien escucha la página ya recibe el nombre en la línea
 * latina y oír además dos ideogramas sueltos solo añade ruido.
 */
export default function PliegoTitulo({
  children,
  kana,
  sobre,
  bang = false,
  size = "hero",
  as: Tag = "h2",
  className,
}: PliegoTituloProps) {
  const signo = bang === true ? "!" : bang || null;

  return (
    <Tag className={cx("pliego-titulo", `pliego-titulo--${size}`, className)}>
      {/* La línea de marca: el rótulo diminuto y el sello, JUNTOS y en la
          misma fila. El kanji tuvo su propia línea a cuerpo de titular, y
          puesto en una página de verdad el nombre de la pieza —el dato por
          el que alguien entró— quedaba segundo dentro de su propio titular.
          Al lado del rótulo se lee como lo que es: una marca de imprenta. */}
      {(sobre || kana) && (
        <span className="pliego-titulo__marca">
          {sobre && (
            <span className="pliego-titulo__sobre">
              <span className="pliego-titulo__ast" aria-hidden="true">
                ✳
              </span>
              {sobre}
              <span className="pliego-titulo__ast" aria-hidden="true">
                ✳
              </span>
            </span>
          )}

          {kana && (
            <span className="pliego-titulo__kana" aria-hidden="true">
              {kana}
            </span>
          )}
        </span>
      )}

      <span className="pliego-titulo__palabra">
        {children}
        {signo && (
          <span className="pliego-titulo__bang" aria-hidden="true">
            {signo}
          </span>
        )}
      </span>
    </Tag>
  );
}
