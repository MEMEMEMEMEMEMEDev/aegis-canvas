import { forwardRef } from "react";
import type { ReactNode, MouseEvent, CSSProperties, Ref } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoLoseta.scss";

export interface CalcoLosetaProps {
  titulo: ReactNode;
  /** Kanji grande, el sello de la loseta. Decorativo. */
  kana?: string;
  /** Segunda línea: qué hay dentro, en cuatro palabras. */
  meta?: ReactNode;
  /** Número de orden: "01". Es también el atajo de teclado que la abre. */
  indice?: string;
  /** Un sticker pequeño en la esquina: "NUEVO", "5", "★". */
  pegatina?: ReactNode;
  tono?: CalcoTono;
  /** Grande: ocupa dos columnas de la rejilla si la hay. */
  ancha?: boolean;
  /** La loseta que está en pantalla ahora. */
  activa?: boolean;
  /** Con href es un enlace; sin él, un botón que avisa por onClick. */
  href?: string;
  onClick?: (evento: MouseEvent<HTMLElement>) => void;
  /** id de la ventana que controla, para el tablist. */
  controla?: string;
  /** El turno en la entrada escalonada (ver .calco-entra). */
  turno?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * La loseta: el bloque de la pantalla de inicio de una consola. Un color,
 * un kanji enorme, un nombre y una línea. Se pulsa entera.
 *
 * Es un botón (o un enlace), nunca un div con onClick: la rejilla de losetas
 * es la navegación principal de la pantalla y tiene que recorrerse con
 * tabulación y activarse con Enter y Espacio sin que nadie lo programe.
 */
const CalcoLoseta = forwardRef<HTMLElement, CalcoLosetaProps>(function CalcoLoseta(
  {
    titulo,
    kana,
    meta,
    indice,
    pegatina,
    tono = "crema",
    ancha = false,
    activa = false,
    href,
    onClick,
    controla,
    turno,
    disabled = false,
    className,
  },
  ref,
) {
  const clases = cx(
    "calco-loseta",
    `calco-loseta--${tono}`,
    ancha && "calco-loseta--ancha",
    activa && "is-activa",
    turno !== undefined && "calco-entra",
    className,
  );

  const estilo = turno !== undefined ? ({ "--calco-i": turno } as CSSProperties) : undefined;

  const dentro = (
    <>
      {indice && (
        <span className="calco-loseta__indice" aria-hidden="true">
          {indice}
        </span>
      )}

      {pegatina && <span className="calco-loseta__pegatina">{pegatina}</span>}

      {kana && (
        <span className="calco-loseta__kana" aria-hidden="true">
          {kana}
        </span>
      )}

      <span className="calco-loseta__texto">
        <span className="calco-loseta__titulo">{titulo}</span>
        {meta && <span className="calco-loseta__meta">{meta}</span>}
      </span>

      <span className="calco-loseta__flecha" aria-hidden="true">
        ▶
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={clases}
        style={estilo}
        href={href}
        aria-current={activa ? "true" : undefined}
        onClick={onClick}
      >
        {dentro}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={clases}
      style={estilo}
      aria-pressed={controla ? undefined : activa}
      aria-selected={controla ? activa : undefined}
      aria-controls={controla}
      role={controla ? "tab" : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {dentro}
    </button>
  );
});

export default CalcoLoseta;
