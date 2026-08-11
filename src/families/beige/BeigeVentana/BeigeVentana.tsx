import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BeigePicto, { type BeigePictoName } from "../BeigePicto/BeigePicto";
import "../beige.scss";
import "./BeigeVentana.scss";

export interface BeigeVentanaProps {
  title: string;
  /** Etiqueta del título: "h2"/"h3" cuando la ventana ES una sección. */
  as?: ElementType;
  /** Icono de la barra de título, de la lámina propia. */
  picto?: BeigePictoName;
  /** Barra de título gris: la ventana que no tiene el foco. */
  inactiva?: boolean;
  /** Menú decorativo bajo el título (Archivo · Edición · …). */
  menu?: readonly string[];
  /** Celdas de la barra de estado del pie. */
  estado?: readonly string[];
  /** Pozo blanco en el cuerpo (lista/documento) en vez de plata. */
  pozo?: boolean;
  /** Los tres botones del título. Decorativos, como manda la época. */
  botones?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}

/**
 * La ventana del sistema: barra de título en degradado, botones minimizar/
 * maximizar/cerrar, menú opcional, cuerpo y barra de estado. Cero radios,
 * cero sombras difusas — solo biseles, como en 1998.
 */
export default function BeigeVentana({
  title,
  as: Title = "p",
  picto,
  inactiva = false,
  menu,
  estado,
  pozo = false,
  botones = true,
  id,
  children,
  className,
}: BeigeVentanaProps) {
  return (
    <section id={id} className={cx("beige-ventana", className)}>
      <header
        className={cx("beige-ventana__titulo", inactiva && "beige-ventana__titulo--inactiva")}
      >
        {picto && <BeigePicto name={picto} size={16} />}
        <Title className="beige-ventana__rotulo">{title}</Title>
        {botones && (
          <span className="beige-ventana__botones" aria-hidden="true">
            <i className="beige-ventana__min" />
            <i className="beige-ventana__max" />
            <i className="beige-ventana__x" />
          </span>
        )}
      </header>

      {menu && menu.length > 0 && (
        <div className="beige-ventana__menu" aria-hidden="true">
          {menu.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}

      <div className={cx("beige-ventana__cuerpo", pozo && "beige-ventana__cuerpo--pozo")}>
        {children}
      </div>

      {estado && estado.length > 0 && (
        <footer className="beige-ventana__estado">
          {estado.map((celda) => (
            <span key={celda}>{celda}</span>
          ))}
        </footer>
      )}
    </section>
  );
}
