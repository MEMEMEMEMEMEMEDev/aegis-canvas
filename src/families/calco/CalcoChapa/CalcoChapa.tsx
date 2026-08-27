import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoChapa.scss";

export interface CalcoChapaProps {
  tono?: CalcoTono | "tinta";
  /**
   * Un punto de estado a la izquierda. `viva` lo hace parpadear: es la
   * luz de "esto está encendido".
   */
  punto?: "quieto" | "viva";
  /** Un glifo a la izquierda, en vez del punto. */
  icono?: ReactNode;
  size?: "sm" | "md";
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

/**
 * La chapa: la etiqueta pequeña de la familia. Un dato corto con contorno
 * —periodo, estado, cuenta— que se pega al lado de cualquier cosa. Sin
 * sombra, a propósito: es la única pieza plana, porque va en cantidad y
 * doce chapas con relieve harían ruido.
 */
export default function CalcoChapa({
  tono = "crema",
  punto,
  icono,
  size = "md",
  as: Tag = "span",
  className,
  children,
}: CalcoChapaProps) {
  return (
    <Tag className={cx("calco-chapa", `calco-chapa--${tono}`, `calco-chapa--${size}`, className)}>
      {punto && (
        <span className={cx("calco-chapa__punto", punto === "viva" && "calco-chapa__punto--viva")} aria-hidden="true" />
      )}
      {icono && (
        <span className="calco-chapa__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      {children}
    </Tag>
  );
}
