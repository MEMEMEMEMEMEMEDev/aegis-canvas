import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoCampo.scss";

export interface PliegoCampoProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "children"> {
  /** El rótulo. Obligatorio: un campo sin nombre no se completa. */
  etiqueta: ReactNode;
  /** La regla, dicha antes de que alguien la rompa. */
  ayuda?: ReactNode;
  /** El rechazo, con las palabras del servidor. Reemplaza a la ayuda. */
  error?: ReactNode;
  className?: string;
}

/**
 * Un campo de la lámina: rótulo en micro arriba, la línea de escribir como
 * un filete de un pelo, y el error en el rojo de TEXTO de la familia.
 *
 * Renderiza SU PROPIO `<input>` y reparte el resto de las props sobre él:
 * no lleva hijos (el tipo lo impide — la guía 03 de conf cuenta lo que
 * costó un componente que los aceptaba en silencio).
 */
export default function PliegoCampo({ etiqueta, ayuda, error, className, ...rest }: PliegoCampoProps) {
  const id = useId();
  const idPie = `${id}-pie`;
  return (
    <div className={cx("pliego-campo", error ? "pliego-campo--mal" : undefined, className)}>
      <label className="pliego-campo__etiqueta" htmlFor={id}>
        {etiqueta}
      </label>
      <input
        id={id}
        className="pliego-campo__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={ayuda || error ? idPie : undefined}
        {...rest}
      />
      {(error || ayuda) && (
        <p className="pliego-campo__pie" id={idPie} role={error ? "alert" : undefined}>
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}
