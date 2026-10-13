import { useId, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoCampo.scss";

export interface ProtoCampoProps {
  etiqueta: ReactNode;
  valor: string;
  onCambio: (valor: string) => void;
  tipo?: "text" | "tel" | "email";
  /** Varias líneas: el motivo de la consulta, una nota. */
  multilinea?: boolean;
  ayuda?: ReactNode;
  error?: ReactNode;
  requerido?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}

/** Un campo controlado: el valor vive en quien lo usa, nunca adentro. */
export default function ProtoCampo({
  etiqueta, valor, onCambio, tipo = "text", multilinea = false, ayuda, error,
  requerido = false, autoComplete, placeholder, className,
}: ProtoCampoProps) {
  const id = useId();
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;
  const describe = [ayuda && idAyuda, error && idError].filter(Boolean).join(" ") || undefined;
  const comun = {
    id,
    value: valor,
    required: requerido,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describe,
    className: "proto-campo__control",
  };
  return (
    <div className={cx("proto-campo", Boolean(error) && "proto-campo--error", className)}>
      <label htmlFor={id} className="proto-campo__etiqueta">
        {etiqueta}
        {requerido && <span aria-hidden="true"> *</span>}
      </label>
      {multilinea ? (
        <textarea {...comun} rows={3} onChange={(e) => onCambio(e.target.value)} />
      ) : (
        <input {...comun} type={tipo} onChange={(e) => onCambio(e.target.value)} />
      )}
      {ayuda && <p id={idAyuda} className="proto-campo__ayuda">{ayuda}</p>}
      {error && <p id={idError} className="proto-campo__error">{error}</p>}
    </div>
  );
}
