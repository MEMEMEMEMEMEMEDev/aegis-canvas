import { useId } from "react";
import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCantidad.scss";

export interface VitrinaCantidadProps {
  value?: number;
  defaultValue?: number;
  onChange?: (n: number) => void;
  min?: number;
  /** El stock. Al llegar, el + se apaga. */
  max?: number;
  /** Nombre accesible ("Cantidad de Taladro 20V"). */
  label: string;
  tamano?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

/**
 * Cantidad VITRINA: el − n + de la cesta. El número es un input real (se
 * puede teclear), los botones lo mueven de uno en uno y se apagan en los
 * bordes, y un status oculto anuncia el valor nuevo sin que el lector
 * tenga que buscarlo.
 */
export default function VitrinaCantidad({ value, defaultValue = 1, onChange, min = 1, max, label, tamano = "md", disabled = false, className }: VitrinaCantidadProps) {
  const id = useId();
  const [n = defaultValue, setN] = useControllableState<number>({ value, defaultValue, onChange });
  const tope = max ?? Number.POSITIVE_INFINITY;
  const fija = (x: number) => setN(Math.max(min, Math.min(tope, Math.round(x) || min)));

  return (
    <span className={cx("vitrina-cantidad", `vitrina-cantidad--${tamano}`, disabled && "is-disabled", className)} role="group" aria-label={label}>
      <button type="button" className="vitrina-cantidad__boton" onClick={() => fija(n - 1)} disabled={disabled || n <= min} aria-label="Quitar uno">
        <VitrinaPicto name="menos" size={16} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        className="vitrina-cantidad__input"
        value={n}
        min={min}
        max={max}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isNaN(v)) fija(v);
        }}
      />
      <button type="button" className="vitrina-cantidad__boton" onClick={() => fija(n + 1)} disabled={disabled || n >= tope} aria-label="Añadir uno">
        <VitrinaPicto name="mas" size={16} />
      </button>
      <span className="vitrina-cantidad__sr" role="status" aria-live="polite">
        Cantidad: {n}
        {max !== undefined && n >= max ? " (máximo disponible)" : ""}
      </span>
    </span>
  );
}
