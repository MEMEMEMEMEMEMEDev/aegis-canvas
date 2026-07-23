import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../../utils/cx";
import "./MesoTag.scss";

export type MesoTagTone = "neutral" | "accent";

export interface MesoTagProps extends ComponentPropsWithoutRef<"span"> {
  tone?: MesoTagTone;
}

/**
 * Etiqueta técnica MESOSOICOS: chip mono con marcador cuadrado.
 */
export default function MesoTag({
  tone = "neutral",
  className,
  children,
  ...rest
}: MesoTagProps) {
  return (
    <span className={cx("meso-tag", `meso-tag--${tone}`, className)} {...rest}>
      {children}
    </span>
  );
}
