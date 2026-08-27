import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoVentana.scss";

export interface CalcoVentanaProps {
  /** El rótulo de la barra de título. */
  titulo: ReactNode;
  /** Kanji al final de la barra. Decorativo. */
  kana?: string;
  /** Color de la barra de título. El cuerpo siempre es crema. */
  tono?: CalcoTono;
  /** Botones o chapas a la derecha de la barra. */
  acciones?: ReactNode;
  /** Si se pasa, aparece la X de cerrar y avisa por aquí. */
  onCerrar?: () => void;
  /** Trama de pantalla vieja en el cuerpo. */
  reja?: boolean;
  /**
   * Sin aire dentro: para cuando el contenido es una imagen o una lista que
   * quiere llegar hasta el borde.
   */
  pegado?: boolean;
  /** Elemento raíz. `section` por defecto; `article` para una ficha. */
  as?: ElementType;
  /** id para que un tab la controle (aria-controls). */
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * La ventana: el cromo de sistema operativo viejo de las referencias — barra
 * de título con tres puntos, contorno de tinta y sombra dura.
 *
 * Es el ÚNICO sitio de la familia donde se scrollea. El lienzo no scrollea,
 * las losetas no scrollean; si una sección tiene más contenido del que cabe,
 * es el cuerpo de la ventana el que se desplaza, por dentro, con la barra de
 * título quieta. Así la pantalla sigue siendo una pantalla y no una página.
 */
export default function CalcoVentana({
  titulo,
  kana,
  tono = "crema",
  acciones,
  onCerrar,
  reja = false,
  pegado = false,
  as: Tag = "section",
  id,
  className,
  children,
}: CalcoVentanaProps) {
  return (
    <Tag id={id} className={cx("calco-ventana", `calco-ventana--${tono}`, className)}>
      <div className="calco-ventana__barra">
        <span className="calco-ventana__puntos" aria-hidden="true" />
        <span className="calco-ventana__titulo">{titulo}</span>
        {kana && (
          <span className="calco-ventana__kana" aria-hidden="true">
            {kana}
          </span>
        )}
        {acciones && <span className="calco-ventana__acciones">{acciones}</span>}
        {onCerrar && (
          <button type="button" className="calco-ventana__cerrar" onClick={onCerrar} aria-label="Cerrar">
            ✕
          </button>
        )}
      </div>

      <div className={cx("calco-ventana__cuerpo", reja && "calco-ventana__cuerpo--reja", pegado && "calco-ventana__cuerpo--pegado")}>
        {children}
      </div>
    </Tag>
  );
}
