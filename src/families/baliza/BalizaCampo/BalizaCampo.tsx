import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaCampo.scss";

export interface BalizaCampoProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  etiqueta: string;
  /** Debajo, en tenue: "Sólo personal de salud lo ve". */
  ayuda?: ReactNode;
  /** Reemplaza la ayuda y marca el campo inválido. */
  error?: string;
  /** Lupa del buscador, ícono a la izquierda. */
  icono?: ReactNode;
  /** Oculta la etiqueta visible (sigue para lectores): el buscador. */
  etiquetaOculta?: boolean;
  className?: string;
}

export default function BalizaCampo({
  etiqueta,
  ayuda,
  error,
  icono,
  etiquetaOculta = false,
  className,
  id,
  ...rest
}: BalizaCampoProps) {
  const auto = useId();
  const campoId = id ?? auto;
  const pieId = `${campoId}-pie`;
  const pie = error ?? ayuda;
  return (
    <div className={cx("baliza-campo", error && "baliza-campo--error", className)}>
      <label htmlFor={campoId} className={cx("baliza-campo__etiqueta", etiquetaOculta && "baliza-oculto")}>
        {etiqueta}
      </label>
      <span className={cx("baliza-campo__caja", icono != null && "baliza-campo__caja--icono")}>
        {icono && <span className="baliza-campo__icono" aria-hidden="true">{icono}</span>}
        <input
          id={campoId}
          className="baliza-campo__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={pie ? pieId : undefined}
          {...rest}
        />
      </span>
      {pie && <span id={pieId} className="baliza-campo__pie" role={error ? "alert" : undefined}>{pie}</span>}
    </div>
  );
}
