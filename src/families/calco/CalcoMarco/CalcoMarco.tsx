import type { ReactNode, CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoMarco.scss";

export interface CalcoMarcoProps {
  /** Proporción del hueco: "1", "4 / 3", "16 / 10". */
  ratio?: string;
  /** El pie escrito debajo del hueco, como en una foto pegada. */
  pie?: ReactNode;
  /** Dos tiras de cinta adhesiva en las esquinas de arriba. */
  cinta?: boolean;
  /** El color de la cinta. */
  tono?: CalcoTono;
  /** Grados de giro. Una foto pegada nunca va recta. */
  giro?: number;
  /** Trama de semitono en el hueco, para cuando no hay imagen. */
  semitono?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * El marco: una foto pegada al álbum con dos tiras de cinta. Es donde va un
 * retrato, un clip o una ilustración; sin nada dentro, el hueco lleva la
 * trama de semitono y sigue pareciendo un sitio donde va algo.
 *
 * Las tiras son pseudo-elementos con rayas y un poco de transparencia — la
 * cinta de embalar deja ver lo que tapa.
 */
export default function CalcoMarco({
  ratio = "4 / 3",
  pie,
  cinta = true,
  tono = "sol",
  giro = -2,
  semitono = true,
  className,
  children,
}: CalcoMarcoProps) {
  return (
    <figure
      className={cx("calco-marco", `calco-marco--${tono}`, cinta && "calco-marco--cinta", className)}
      style={{ "--calco-giro": `${giro}deg`, "--calco-ratio": ratio } as CSSProperties}
    >
      <div className={cx("calco-marco__hueco", semitono && "calco-marco__hueco--semitono")}>{children}</div>
      {pie && <figcaption className="calco-marco__pie">{pie}</figcaption>}
    </figure>
  );
}
