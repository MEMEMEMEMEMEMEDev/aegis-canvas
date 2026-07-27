import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoTag.scss";

export interface TebeoTagProps {
  children: ReactNode;
  /** paper (default), ink o sun. */
  tone?: "paper" | "ink" | "sun";
  className?: string;
}

/** Chip píldora con borde de tinta: stack, categorías, metadatos. */
export default function TebeoTag({ children, tone = "paper", className }: TebeoTagProps) {
  return (
    <span className={cx("tebeo-tag", `tebeo-tag--${tone}`, className)}>{children}</span>
  );
}
