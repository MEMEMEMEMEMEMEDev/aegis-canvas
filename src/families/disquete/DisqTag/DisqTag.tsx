import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../disquete.scss";
import "./DisqTag.scss";

export interface DisqTagProps {
  children: ReactNode;
  /** line (contorno, default), ink, indigo o papel sobre fondo oscuro. */
  tone?: "line" | "ink" | "indigo" | "label";
  className?: string;
}

/** Chip DISQUETE: la etiqueta encajonada de la letra pequeña. */
export default function DisqTag({ children, tone = "line", className }: DisqTagProps) {
  return <span className={cx("disq-tag", `disq-tag--${tone}`, className)}>{children}</span>;
}
