import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqDisk.scss";

export type DisqColor = "shell" | "indigo" | "magenta" | "teal" | "coral" | "ink";

export interface DisqDiskProps {
  /** Contenido de la etiqueta de papel: normalmente un DisqLabel. */
  children: ReactNode;
  /** Color del plástico de la carcasa. */
  color?: DisqColor;
  /** Rótulo del fabricante, arriba a la izquierda. */
  maker?: string;
  /** Código de formato bajo el fabricante ("MF2-HD", "2S/HD"…). */
  format?: string;
  /** Si viene, el disquete entero es un enlace. */
  href?: string;
  /** Si viene (y no hay href), el disquete es un botón. */
  onClick?: () => void;
  /** Disquete elegido: la compuerta queda abierta. */
  selected?: boolean;
  /**
   * Nombre accesible del disquete cuando es enlace o botón.
   *
   * Sin esto, el nombre lo compone TODO el texto de la etiqueta —titular,
   * resumen, lista de tecnologías, código de barras—, y quien navega saltando
   * de enlace en enlace tiene que oír el párrafo entero para saber a dónde va.
   * El texto de la etiqueta sigue ahí y se lee igual: pasa a ser la
   * descripción, no el nombre.
   */
  label?: string;
  className?: string;
}

const TONOS: Record<DisqColor, string> = {
  shell: "disq-disk--shell",
  indigo: "disq-disk--indigo",
  magenta: "disq-disk--magenta",
  teal: "disq-disk--teal",
  coral: "disq-disk--coral",
  ink: "disq-disk--ink",
};

/**
 * DISQUETE de 3,5 pulgadas: la pieza firma de la familia.
 *
 * Proporción 90×94 — la real, no una aproximación cómoda: un diskette es
 * más alto que ancho y en cuanto se cuadra deja de reconocerse.
 *
 * Anatomía, de arriba abajo: la franja superior con la flecha de inserción,
 * el rótulo del fabricante y la compuerta metálica; debajo, la etiqueta de
 * papel donde va el arte; y los dos tacos de las esquinas inferiores.
 *
 * La compuerta SE DESLIZA al pasar por encima o al recibir el foco, y debajo
 * aparece el disco magnético. No es un adorno: es lo que hace un diskette
 * cuando entra en la unidad, y es la señal de que la pieza responde.
 */
export default function DisqDisk({
  children,
  color = "shell",
  maker = "AHROI",
  format = "MF2-HD",
  href,
  onClick,
  selected = false,
  label,
  className,
}: DisqDiskProps) {
  const interactivo = Boolean(href || onClick);
  const Root = href ? "a" : onClick ? "button" : "div";

  return (
    <Root
      {...(href ? { href } : {})}
      {...(!href && onClick ? { type: "button" as const, onClick } : {})}
      {...(interactivo && label ? { "aria-label": label } : {})}
      className={cx(
        "disq-disk",
        TONOS[color],
        interactivo && "disq-disk--activo",
        selected && "is-selected",
        className,
      )}
    >
      <span className="disq-disk__top" aria-hidden="true">
        <span className="disq-disk__hub">
          <span className="disq-disk__arrow" />
        </span>

        <span className="disq-disk__maker">
          <b>{maker}</b>
          <i>{format}</i>
        </span>

        {/* La ventana va DEBAJO de la compuerta en el apilado: cuando la
            compuerta se desliza, lo que asoma es el disco de dentro. */}
        <span className="disq-disk__gate">
          <span className="disq-disk__window" />
          <span className="disq-disk__shutter" />
        </span>
      </span>

      <span className="disq-disk__label">{children}</span>

      <span className="disq-disk__stud disq-disk__stud--bl" aria-hidden="true" />
      <span className="disq-disk__stud disq-disk__stud--br" aria-hidden="true" />
    </Root>
  );
}
