import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaSello.scss";

export type VitrinaSelloTono = "nuevo" | "oferta" | "flash" | "vendido" | "agotado" | "ok" | "aviso" | "error" | "neutro";

export interface VitrinaSelloProps {
  tono?: VitrinaSelloTono;
  /** Pictograma delante del texto. */
  icono?: ReactNode;
  pequeno?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Sello VITRINA: la etiqueta pegada en la esquina de una tarjeta o al lado
 * de un estado. Micro con suelo, radio pequeño, y cada tono con su par de
 * contraste medido: nuevo y vendido en bloque, oferta y flash en coral
 * (con tinta encima), los estados en su velo.
 */
export default function VitrinaSello({ tono = "neutro", icono, pequeno = false, className, children }: VitrinaSelloProps) {
  return (
    <span className={cx("vitrina-sello", `vitrina-sello--${tono}`, pequeno && "vitrina-sello--pequeno", className)}>
      {icono && (
        <span className="vitrina-sello__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      {children}
    </span>
  );
}
