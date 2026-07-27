import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoHeadline.scss";

export interface TebeoHeadlineProps {
  children: ReactNode;
  /** Etiqueta semántica (h1, h2…). Default: h1. */
  as?: ElementType;
  /** Tamaño: hero (gigante) o section (título de sección). */
  size?: "hero" | "section";
  className?: string;
}

/**
 * Titular TEBEO: Archivo Black en mayúsculas, interlineado aplastado.
 * El titular ES el gráfico — se usa enorme o no se usa.
 */
export default function TebeoHeadline({
  children,
  as: Tag = "h1",
  size = "hero",
  className,
}: TebeoHeadlineProps) {
  return (
    <Tag className={cx("tebeo-headline", `tebeo-headline--${size}`, className)}>
      {children}
    </Tag>
  );
}
