import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaChip.scss";

export interface VitrinaChipProps {
  /** Filtro que se enciende y apaga (aria-pressed). */
  activo?: boolean;
  onClick?: () => void;
  /** Chip eliminable: el texto y una ✕ con su propio botón. */
  onQuitar?: () => void;
  icono?: ReactNode;
  /** Cifra al final ("Tecnología 12"). */
  contador?: number;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Chip VITRINA: la píldora de filtro. Como botón conmuta (activo = tinta
 * invertida); como chip eliminable lleva el texto y una ✕ aparte, para que
 * "quitar el filtro" sea un control con su propio nombre.
 */
export default function VitrinaChip({ activo, onClick, onQuitar, icono, contador, disabled, className, children }: VitrinaChipProps) {
  const clases = cx("vitrina-chip", activo && "is-activo", disabled && "is-disabled", className);
  const cuerpo = (
    <>
      {icono && (
        <span className="vitrina-chip__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      <span className="vitrina-chip__texto">{children}</span>
      {contador !== undefined && <span className="vitrina-chip__contador">{contador}</span>}
    </>
  );

  if (onQuitar) {
    return (
      <span className={cx(clases, "vitrina-chip--quitable")}>
        {cuerpo}
        <button type="button" className="vitrina-chip__quitar" onClick={onQuitar} disabled={disabled} aria-label={`Quitar ${typeof children === "string" ? children : "filtro"}`}>
          <VitrinaPicto name="cerrar" size={14} />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={clases}
      onClick={onClick}
      disabled={disabled}
      {...(activo !== undefined ? { "aria-pressed": activo } : {})}
    >
      {cuerpo}
    </button>
  );
}

/** La fila de chips que se desliza de lado en el teléfono. */
export function VitrinaChipFila({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx("vitrina-chip-fila", className)} role="group" aria-label={label}>
      {children}
    </div>
  );
}
