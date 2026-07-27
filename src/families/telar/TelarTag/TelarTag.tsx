import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarTag.scss";

export interface TelarTagProps {
  children: ReactNode;
  /** Hilado de la muesca lateral. Default: sol. */
  tone?: "fucsia" | "cobre" | "verde" | "sol" | "cream";
  className?: string;
}

/** Etiqueta TELAR: chip mono cuadrado con muesca de hilado a la izquierda. */
export default function TelarTag({ children, tone = "sol", className }: TelarTagProps) {
  return (
    <span className={cx("telar-tag", `telar-tag--${tone}`, className)}>{children}</span>
  );
}
