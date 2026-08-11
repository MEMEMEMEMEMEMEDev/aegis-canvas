import type { MouseEventHandler } from "react";
import { cx } from "../../../utils/cx";
import BeigePicto, { type BeigePictoName } from "../BeigePicto/BeigePicto";
import "../beige.scss";
import "./BeigeIcono.scss";

export interface BeigeIconoProps {
  picto: BeigePictoName;
  /** El nombre bajo el icono. Texto real: es lo que se lee y se enfoca. */
  label: string;
  href?: string;
  onClick?: MouseEventHandler;
  /** Pintado como seleccionado (rótulo en marino). */
  selected?: boolean;
  className?: string;
}

/**
 * El icono de escritorio: arte de píxel arriba, rótulo abajo. Enlace de
 * verdad cuando lleva href — el escritorio ES la navegación del mundo.
 */
export default function BeigeIcono({
  picto,
  label,
  href,
  onClick,
  selected = false,
  className,
}: BeigeIconoProps) {
  const clase = cx("beige-icono", selected && "beige-icono--sel", className);
  const contenido = (
    <>
      <span className="beige-icono__arte">
        <BeigePicto name={picto} size={48} />
      </span>
      <span className="beige-icono__rotulo">{label}</span>
    </>
  );

  if (href) {
    return (
      <a className={clase} href={href} onClick={onClick}>
        {contenido}
      </a>
    );
  }
  if (onClick) {
    return (
      <button className={clase} type="button" onClick={onClick}>
        {contenido}
      </button>
    );
  }
  return <span className={clase}>{contenido}</span>;
}
