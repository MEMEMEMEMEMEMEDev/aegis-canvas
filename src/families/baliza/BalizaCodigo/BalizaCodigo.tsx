import type { CSSProperties } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaCodigo.scss";

export interface BalizaCodigoProps {
  etiqueta: string;
  valor: string;
  onCambio: (valor: string) => void;
  /** Cuántos dígitos (6 por omisión). */
  largo?: number;
  ayuda?: string;
  error?: string;
  className?: string;
}

/**
 * Un código de N dígitos. UN solo input (no seis): pegar, autocompletar
 * desde un SMS (one-time-code) y los lectores de pantalla funcionan solos.
 * Las cajas son dibujo de fondo.
 */
export default function BalizaCodigo({ etiqueta, valor, onCambio, largo = 6, ayuda, error, className }: BalizaCodigoProps) {
  const id = useId();
  const pie = error ?? ayuda;
  return (
    <div className={cx("baliza-codigo", error && "baliza-codigo--error", className)} style={{ "--largo": largo } as CSSProperties}>
      <label htmlFor={id} className="baliza-codigo__etiqueta">{etiqueta}</label>
      <input
        id={id}
        className="baliza-codigo__input"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`\\d{${largo}}`}
        maxLength={largo}
        value={valor}
        aria-invalid={error ? true : undefined}
        aria-describedby={pie ? `${id}-pie` : undefined}
        onChange={(e) => onCambio(e.target.value.replace(/\D/g, "").slice(0, largo))}
      />
      {pie && <span id={`${id}-pie`} className="baliza-codigo__pie" role={error ? "alert" : undefined}>{pie}</span>}
    </div>
  );
}
