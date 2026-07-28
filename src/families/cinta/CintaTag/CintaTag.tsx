import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../cinta.scss";
import "./CintaTag.scss";

export interface CintaTagProps {
  children: ReactNode;
  /** Contorno (default), tinta, ámbar, coral, cielo o peligro (rayado). */
  tone?: "line" | "ink" | "amber" | "coral" | "sky" | "hazard";
  className?: string;
}

/**
 * Tag CINTA: rótulo serigrafiado ("STEREO", "OP-Z SYSTEM") — píldora mono
 * con esquinas suaves; el tono hazard lleva el rayado de advertencia.
 */
export default function CintaTag({ children, tone = "line", className }: CintaTagProps) {
  return (
    <span className={cx("cinta-tag", `cinta-tag--${tone}`, className)}>
      {tone === "hazard" && <span className="cinta-tag__stripes" aria-hidden="true" />}
      {children}
    </span>
  );
}
