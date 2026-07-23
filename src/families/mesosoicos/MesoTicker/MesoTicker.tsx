import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../../utils/cx";
import "./MesoTicker.scss";

export interface MesoTickerProps extends ComponentPropsWithoutRef<"div"> {
  items?: string[];
}

/**
 * Cinta deslizante MESOSOICOS (marquee de estratos). Decorativa: se marca
 * aria-hidden y con prefers-reduced-motion queda estática.
 */
export default function MesoTicker({
  items = [],
  className,
  ...rest
}: MesoTickerProps) {
  const group = (hidden: boolean) => (
    <ul className="meso-ticker__group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="meso-ticker__item">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cx("meso-ticker", className)} aria-hidden="true" {...rest}>
      <div className="meso-ticker__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
