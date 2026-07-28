import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoGlitch.scss";

export interface DomoGlitchProps {
  /** Texto a glitchear (necesita ser string: se duplica en capas fantasma). */
  text: string;
  as?: ElementType;
  /** Ráfagas periódicas (default) o glitch continuo mientras `intense`. */
  intense?: boolean;
  className?: string;
}

/**
 * Texto glitch DOMO (v2, guiño NieR): dos capas fantasma recortadas en
 * franjas que se desfasan en ráfagas cortas — interferencia de sistema,
 * no fiesta de neón: todo en tinta. Decorativo (aria-hidden en las capas).
 */
export default function DomoGlitch({
  text,
  as: Tag = "span",
  intense = false,
  className,
}: DomoGlitchProps) {
  return (
    <Tag
      className={cx("domo-glitch", intense && "is-intense", className)}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
