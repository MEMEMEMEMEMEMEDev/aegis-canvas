import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoUiName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaAviso.scss";

export interface VitrinaAvisoProps {
  tono?: "ok" | "aviso" | "error" | "neutro";
  texto: ReactNode;
  /** El enlace de la derecha: "Ver cesta", "Deshacer". */
  accion?: { label: string; onClick: () => void };
  onCerrar?: () => void;
  /** ms hasta cerrarse solo; 0 = nunca. Se pausa con el ratón o el foco encima. */
  duracion?: number;
  className?: string;
}

const PICTO: Record<NonNullable<VitrinaAvisoProps["tono"]>, PictoUiName> = { ok: "check", aviso: "alerta", error: "alerta", neutro: "info" };

/**
 * Aviso VITRINA: el toast. Entra subiendo, dice una cosa, ofrece una
 * acción y se va solo en cuatro segundos — salvo que tengas el ratón o el
 * foco encima, que entonces espera. role="status": se anuncia sin
 * interrumpir, y jamás roba el foco.
 */
export default function VitrinaAviso({ tono = "neutro", texto, accion, onCerrar, duracion = 4000, className }: VitrinaAvisoProps) {
  const [pausado, setPausado] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!duracion || pausado || !onCerrar) return undefined;
    timer.current = window.setTimeout(onCerrar, duracion);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [duracion, pausado, onCerrar]);

  return (
    <div
      className={cx("vitrina-aviso", `vitrina-aviso--${tono}`, className)}
      role={tono === "error" ? "alert" : "status"}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <span className="vitrina-aviso__icono" aria-hidden="true">
        <VitrinaPicto name={PICTO[tono]} size={18} />
      </span>
      <span className="vitrina-aviso__texto">{texto}</span>
      {accion && (
        <button type="button" className="vitrina-aviso__accion" onClick={accion.onClick}>
          {accion.label}
        </button>
      )}
      {onCerrar && (
        <button type="button" className="vitrina-aviso__cerrar" onClick={onCerrar} aria-label="Cerrar aviso">
          <VitrinaPicto name="cerrar" size={16} />
        </button>
      )}
    </div>
  );
}

/** La pila: abajo al centro sobre las pestañas en el teléfono, abajo a la derecha en escritorio. */
export function VitrinaAvisoPila({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("vitrina-scope", "vitrina-aviso-pila", className)} role="region" aria-label="Avisos">
      {children}
    </div>
  );
}
