import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoCategoriaName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaLoseta.scss";

export interface VitrinaLosetaProps {
  nombre: string;
  picto: PictoCategoriaName;
  /** El color de la placa (hex claro). */
  matiz: string;
  /** Texto pequeño bajo el nombre ("Ver todo", "124 productos"). */
  sub?: string;
  onClick?: () => void;
  href?: string;
  /** Solo placa y nombre, sin sub ni flecha: para filas apretadas. */
  compacta?: boolean;
  className?: string;
}

/**
 * Loseta VITRINA: el tile de categoría — la placa con el cartel de sección,
 * el nombre y la flecha. Toda la loseta es el control (botón o enlace).
 */
export default function VitrinaLoseta({ nombre, picto, matiz, sub, onClick, href, compacta = false, className }: VitrinaLosetaProps) {
  const clases = cx("vitrina-loseta", compacta && "vitrina-loseta--compacta", className);
  const cuerpo = (
    <>
      <span className="vitrina-loseta__placa" style={{ background: matiz }} aria-hidden="true">
        <VitrinaPicto name={picto} size={compacta ? 32 : 44} />
      </span>
      <span className="vitrina-loseta__pie">
        <span className="vitrina-loseta__nombre">{nombre}</span>
        {!compacta && sub && <span className="vitrina-loseta__sub">{sub}</span>}
      </span>
      {!compacta && (
        <span className="vitrina-loseta__flecha" aria-hidden="true">
          <VitrinaPicto name="flecha-der" size={18} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a className={clases} href={href} onClick={onClick}>
        {cuerpo}
      </a>
    );
  }
  return (
    <button type="button" className={clases} onClick={onClick}>
      {cuerpo}
    </button>
  );
}
