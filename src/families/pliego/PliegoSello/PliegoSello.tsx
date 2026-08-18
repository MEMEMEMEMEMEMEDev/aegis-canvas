import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoSello.scss";

export interface PliegoSelloProps {
  /** El glifo grande de la caja: un kanji, una cifra, un símbolo. */
  glifo: string;
  /** Rótulo al lado del glifo. */
  titulo?: string;
  /** Segunda línea, más pequeña. */
  sub?: string;
  tone?: "linea" | "rosa" | "tinta";
  className?: string;
}

/**
 * La marquita en caja de la esquina del pliego: el logo del estudio, el sello
 * de edición, el ™. Gráfica de cabo a rabo — va `aria-hidden` entera.
 *
 * Si lo que dice el sello es información que hace falta (un estado, una
 * categoría), la pieza correcta es PliegoEtiqueta, que sí se anuncia.
 */
export default function PliegoSello({
  glifo,
  titulo,
  sub,
  tone = "linea",
  className,
}: PliegoSelloProps) {
  return (
    <span className={cx("pliego-sello", `pliego-sello--${tone}`, className)} aria-hidden="true">
      <span className="pliego-sello__glifo">{glifo}</span>
      {(titulo || sub) && (
        <span className="pliego-sello__texto">
          {titulo && <span className="pliego-sello__titulo">{titulo}</span>}
          {sub && <span className="pliego-sello__sub">{sub}</span>}
        </span>
      )}
    </span>
  );
}
