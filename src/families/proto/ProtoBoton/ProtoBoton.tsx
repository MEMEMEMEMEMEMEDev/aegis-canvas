import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoBoton.scss";

export interface ProtoBotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `accion` es la principal de la pantalla (verde parque). `suave` el resto.
   * `calido` habla de o con una persona ("Escribirle a Camila"): ciruela.
   * `urgencia` es SÓLO para responder a una urgencia ("Atender ahora").
   * `peligro` es lo que no se deshace: borde y texto rojos, nunca relleno,
   * para que no compita con `urgencia`.
   */
  tono?: "accion" | "suave" | "calido" | "urgencia" | "peligro" | "fantasma";
  tamano?: "chico" | "normal" | "grande";
  /** Ocupa todo el ancho (el pie de un paso, el teléfono). */
  bloque?: boolean;
  icono?: ReactNode;
  children: ReactNode;
}

export default function ProtoBoton({
  tono = "suave",
  tamano = "normal",
  bloque = false,
  icono,
  className,
  type = "button",
  children,
  ...rest
}: ProtoBotonProps) {
  return (
    <button
      type={type}
      className={cx(
        "proto-boton",
        `proto-boton--${tono}`,
        `proto-boton--${tamano}`,
        bloque && "proto-boton--bloque",
        className,
      )}
      {...rest}
    >
      {icono && <span className="proto-boton__icono" aria-hidden="true">{icono}</span>}
      {children}
    </button>
  );
}
