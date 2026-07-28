import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaTape.scss";

export interface CintaTapeProps {
  /** Título del sticker. */
  title: string;
  /** Texto pequeño bajo el título (stack, año…). */
  meta?: string;
  /** Lado del cassette. */
  side?: "A" | "B";
  /** Color del sticker. */
  color?: "amber" | "coral" | "sky" | "cream";
  /** Carretes girando (la cinta está sonando). */
  playing?: boolean;
  /** Cassette insertado/elegido. */
  selected?: boolean;
  /** Si viene, el cassette es un botón (se puede insertar). */
  onClick?: () => void;
  className?: string;
}

/**
 * Cassette CINTA: la pieza firma — cuerpo de tinta, sticker de color,
 * ventana con dos carretes dentados que GIRAN cuando suena. Con onClick
 * se vuelve botón: el cassette se inserta en el reproductor.
 */
export default function CintaTape({
  title,
  meta,
  side = "A",
  color = "amber",
  playing = false,
  selected = false,
  onClick,
  className,
}: CintaTapeProps) {
  const Root = onClick ? "button" : "div";
  return (
    <Root
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className={cx(
        "cinta-tape",
        `cinta-tape--${color}`,
        playing && "is-playing",
        selected && "is-selected",
        className,
      )}
      aria-label={onClick ? `Insertar cassette: ${title}` : undefined}
      aria-pressed={onClick ? selected : undefined}
    >
      <span className="cinta-tape__sticker">
        <span className="cinta-tape__head">
          <b className="cinta-tape__side" aria-hidden="true">
            {side}
          </b>
          <span className="cinta-tape__titles">
            <span className="cinta-tape__title">{title}</span>
            {meta && <span className="cinta-tape__meta">{meta}</span>}
          </span>
        </span>
        <span className="cinta-tape__window" aria-hidden="true">
          <span className="cinta-tape__reel" />
          <span className="cinta-tape__ribbon" />
          <span className="cinta-tape__reel" />
        </span>
      </span>
      <span className="cinta-tape__feet" aria-hidden="true" />
    </Root>
  );
}
