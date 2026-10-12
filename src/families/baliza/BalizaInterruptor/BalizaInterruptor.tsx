import type { ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaInterruptor.scss";

export interface BalizaInterruptorProps {
  etiqueta: string;
  descripcion?: ReactNode;
  activo: boolean;
  onCambio: (activo: boolean) => void;
  /** No se puede cambiar (un módulo base, uno que requiere la app nativa). */
  deshabilitado?: boolean;
  /** Al lado de la etiqueta: una insignia "Próximamente". */
  extra?: ReactNode;
  className?: string;
}

/** Un interruptor de verdad (role=switch): para los módulos que se activan por empresa. */
export default function BalizaInterruptor({ etiqueta, descripcion, activo, onCambio, deshabilitado = false, extra, className }: BalizaInterruptorProps) {
  const id = useId();
  return (
    <div className={cx("baliza-interruptor", deshabilitado && "is-deshabilitado", className)}>
      <div className="baliza-interruptor__texto">
        <span id={`${id}-e`} className="baliza-interruptor__etiqueta">{etiqueta} {extra}</span>
        {descripcion && <span id={`${id}-d`} className="baliza-interruptor__descripcion">{descripcion}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={activo}
        aria-labelledby={`${id}-e`}
        aria-describedby={descripcion ? `${id}-d` : undefined}
        disabled={deshabilitado}
        className="baliza-interruptor__pista"
        onClick={() => onCambio(!activo)}
      >
        <span className="baliza-interruptor__perilla" aria-hidden="true" />
      </button>
    </div>
  );
}
