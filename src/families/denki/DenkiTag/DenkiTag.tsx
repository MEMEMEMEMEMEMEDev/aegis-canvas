import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiTag.scss";

export interface DenkiTagProps {
  children: ReactNode;
  /** Contorno (default), panel negro o bermellón. */
  tone?: "line" | "panel" | "red";
  className?: string;
}

/**
 * Etiqueta DENKI: chip de ficha técnica — mono, mayúsculas, casi cuadrado.
 */
export default function DenkiTag({ children, tone = "line", className }: DenkiTagProps) {
  return (
    <span className={cx("denki-tag", `denki-tag--${tone}`, className)}>{children}</span>
  );
}
