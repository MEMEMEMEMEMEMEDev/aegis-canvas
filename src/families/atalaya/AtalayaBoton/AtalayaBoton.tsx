import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaBoton.scss";

export interface AtalayaBotonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `firme` es la acción principal de la pantalla y hay UNA por pantalla.
   * `suave` es el resto. `peligro` es lo que no se deshace, y su color no
   * es el acento sino el rojo de estado, porque acá lo que avisa es lo que
   * va a pasar y no que se pueda tocar.
   */
  tono?: "firme" | "suave" | "fantasma" | "peligro";
  tamano?: "normal" | "chico";
  children: ReactNode;
}

export default function AtalayaBoton({
  tono = "suave",
  tamano = "normal",
  className,
  type = "button",
  children,
  ...rest
}: AtalayaBotonProps) {
  return (
    <button
      type={type}
      className={cx(
        "atalaya-boton",
        `atalaya-boton--${tono}`,
        tamano === "chico" && "atalaya-boton--chico",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
