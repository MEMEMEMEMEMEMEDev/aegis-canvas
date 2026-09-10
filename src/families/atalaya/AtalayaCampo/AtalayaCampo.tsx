import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaCampo.scss";

export interface AtalayaCampoProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  etiqueta: ReactNode;
  /**
   * La regla, dicha ANTES de que alguien la rompa. En un contrato con
   * reglas inmutables —un nombre no se cambia después— avisar tarde es
   * avisar mal.
   */
  ayuda?: ReactNode;
  /** El rechazo, con las palabras del validador y no reescrito acá. */
  error?: ReactNode;
  /** Un prefijo o sufijo fijo: el dominio raíz, un puerto. */
  sufijo?: ReactNode;
  className?: string;
}

export default function AtalayaCampo({
  etiqueta,
  ayuda,
  error,
  sufijo,
  className,
  ...rest
}: AtalayaCampoProps) {
  const id = useId();
  const idAyuda = `${id}-ayuda`;
  return (
    <div className={cx("atalaya-campo", error ? "atalaya-campo--mal" : undefined, className)}>
      <label className="atalaya-campo__etiqueta" htmlFor={id}>
        {etiqueta}
      </label>
      <div className="atalaya-campo__caja">
        <input
          id={id}
          className="atalaya-campo__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={ayuda || error ? idAyuda : undefined}
          {...rest}
        />
        {sufijo && <span className="atalaya-campo__sufijo">{sufijo}</span>}
      </div>
      {(error || ayuda) && (
        <p className="atalaya-campo__pie" id={idAyuda}>
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}
