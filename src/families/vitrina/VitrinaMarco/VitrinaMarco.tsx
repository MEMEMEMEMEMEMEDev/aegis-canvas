import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaMarco.scss";

export interface VitrinaMarcoProps {
  /** navegar (blanco) o transaccion (gris de boleta). */
  modo?: "navegar" | "transaccion";
  /** normal (la tienda) o estrecho (checkout y acceso: 44rem centrados). */
  ancho?: "normal" | "estrecho";
  cabecera?: ReactNode;
  /** La barra de pestañas de abajo (solo se ve en el teléfono). */
  pestanas?: ReactNode;
  pie?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Marco VITRINA: el chasis de una página de la tienda. Cabecera arriba,
 * cuerpo con su ancho, pie abajo y —en el teléfono— la barra de pestañas
 * pegada al borde, para la que el cuerpo reserva sitio. A diferencia del
 * lienzo de CALCO, aquí la página SÍ scrollea: una tienda es larga. Y no
 * lleva `transform` nunca: el clon que vuela al carrito es `position:
 * fixed` y un ancestro transformado se lo comería.
 */
export default function VitrinaMarco({ modo = "navegar", ancho = "normal", cabecera, pestanas, pie, className, children }: VitrinaMarcoProps) {
  return (
    <div
      className={cx(
        "vitrina-scope",
        modo === "transaccion" && "vitrina-scope--transaccion",
        "vitrina-marco",
        `vitrina-marco--${modo}`,
        `vitrina-marco--${ancho}`,
        Boolean(pestanas) && "vitrina-marco--con-pestanas",
        className,
      )}
    >
      {cabecera && <div className="vitrina-marco__cabecera">{cabecera}</div>}
      <div className="vitrina-marco__cuerpo">{children}</div>
      {pie && <div className="vitrina-marco__pie">{pie}</div>}
      {pestanas && <div className="vitrina-marco__pestanas">{pestanas}</div>}
    </div>
  );
}
