import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiAnillo.scss";

export interface ObsiAnilloProps {
  /** Nombre bajo el anillo. */
  label: string;
  /** Rol / detalle en mono. */
  sublabel?: string;
  /** Imagen del retrato. Sin src, muestra las iniciales. */
  src?: string;
  /** Iniciales de respaldo (máx. 2 caracteres visibles). */
  initials?: string;
  /** Fracción del arco cian, 0–1. Default: 0.72 (nunca el círculo entero). */
  arc?: number;
  /** Anillo destacado (arco a pleno color y retrato encendido). */
  active?: boolean;
  className?: string;
}

/**
 * Anillo OBSIDIANA: retrato circular con un arco cian incompleto — la única
 * curva permitida en la familia, y por eso mismo la que destaca. Para
 * autores, colaboradores o "featured" de la galería.
 */
export default function ObsiAnillo({
  label,
  sublabel,
  src,
  initials,
  arc = 0.72,
  active = false,
  className,
}: ObsiAnilloProps) {
  const grados = Math.max(0, Math.min(1, arc)) * 360;
  return (
    <figure className={cx("obsi-anillo", active && "is-active", className)}>
      <span
        className="obsi-anillo__aro"
        style={{ ["--obsi-arc" as string]: `${grados}deg` }}
        aria-hidden="true"
      >
        {src ? (
          <img className="obsi-anillo__retrato" src={src} alt="" />
        ) : (
          <span className="obsi-anillo__retrato obsi-anillo__retrato--texto">
            {initials ?? label.slice(0, 2)}
          </span>
        )}
      </span>
      <figcaption className="obsi-anillo__pie">
        <span className="obsi-anillo__label">{label}</span>
        {sublabel && <span className="obsi-anillo__sublabel">{sublabel}</span>}
      </figcaption>
    </figure>
  );
}
