import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaBoton.scss";

export interface BalizaBotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `accion` es la principal de la pantalla. `hondo` guarda (el "Guardar
   * cambios" del Figma). `suave` es el resto. `sos` es SÓLO para responder a
   * una emergencia ("Tomar caso", "Pedir ayuda"). `peligro` es lo que no se
   * deshace: borde y texto rojos, nunca relleno, para que no compita con `sos`.
   */
  tono?: "accion" | "hondo" | "suave" | "sos" | "peligro" | "fantasma";
  tamano?: "chico" | "normal" | "grande";
  /** `pastilla` es la forma de la landing; `recta` la del panel. */
  forma?: "recta" | "pastilla";
  /** Ocupa todo el ancho (la app del trabajador, el pie de una tarjeta). */
  bloque?: boolean;
  icono?: ReactNode;
  children: ReactNode;
}

export default function BalizaBoton({
  tono = "suave",
  tamano = "normal",
  forma = "recta",
  bloque = false,
  icono,
  className,
  type = "button",
  children,
  ...rest
}: BalizaBotonProps) {
  return (
    <button
      type={type}
      className={cx(
        "baliza-boton",
        `baliza-boton--${tono}`,
        `baliza-boton--${tamano}`,
        forma === "pastilla" && "baliza-boton--pastilla",
        bloque && "baliza-boton--bloque",
        className,
      )}
      {...rest}
    >
      {icono && <span className="baliza-boton__icono" aria-hidden="true">{icono}</span>}
      {children}
    </button>
  );
}
