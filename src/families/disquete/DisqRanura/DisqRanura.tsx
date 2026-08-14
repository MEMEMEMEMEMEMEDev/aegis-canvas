import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqRanura.scss";

export interface DisqRanuraLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface DisqRanuraProps {
  /** El ideograma del troquel, en su bloque de acento. Gráfico, no lectura. */
  kana?: string;
  /** El nombre de la sección. */
  title: string;
  /** La línea pequeña bajo el nombre: un recuento, un estado. */
  sub?: string;
  /** Enlaces DE ESTA sección. Nunca a otras: la ranura no es un índice. */
  links?: readonly DisqRanuraLink[];
  /** A dónde lleva el botón de expulsar. */
  salidaHref: string;
  /** Rótulo de la salida. */
  salidaLabel?: string;
  /** Rótulo accesible del landmark. */
  label?: string;
  className?: string;
}

/**
 * RANURA DISQUETE: la cabecera de una sección vestida de unidad de disco.
 *
 * Es una nav de MUNDO, no del sitio: lleva el nombre de su sección, sus
 * propios enlaces si los tiene, y una salida. No anuncia ninguna marca ni
 * lista otras secciones — un mismo menú repetido encima de cinco mundos los
 * convierte en cinco pestañas del mismo sitio, que es justo lo contrario de
 * lo que un multiverso promete.
 *
 * La salida se llama EXPULSAR y lleva el triángulo sobre la barra de los
 * botones de eject de verdad, dibujado con dos bordes. Al apuntarlo, el
 * cartucho asoma de la ranura; al pulsarlo, el botón se hunde hasta tocar su
 * propia sombra. La navegación es un enlace normal y ocurre al instante: la
 * animación acompaña, nunca hace esperar.
 */
export default function DisqRanura({
  kana,
  title,
  sub,
  links,
  salidaHref,
  salidaLabel = "Expulsar",
  label,
  className,
}: DisqRanuraProps) {
  return (
    <nav className={cx("disq-ranura", className)} aria-label={label ?? title}>
      <span className="disq-ranura__marca">
        {kana && (
          <b className="disq-ranura__kana" aria-hidden="true">
            {kana}
          </b>
        )}
        <span className="disq-ranura__rotulos">
          <b className="disq-ranura__title">{title}</b>
          {sub && <i className="disq-ranura__sub">{sub}</i>}
        </span>
      </span>

      {links && links.length > 0 && (
        <ul className="disq-ranura__links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className={cx("disq-ranura__link", link.active && "is-active")}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <a className="disq-ranura__salida" href={salidaHref}>
        {/* El cartucho que asoma de la ranura al apuntar la salida. */}
        <span className="disq-ranura__cartucho" aria-hidden="true" />
        <span className="disq-ranura__eject" aria-hidden="true" />
        {salidaLabel}
      </a>
    </nav>
  );
}
