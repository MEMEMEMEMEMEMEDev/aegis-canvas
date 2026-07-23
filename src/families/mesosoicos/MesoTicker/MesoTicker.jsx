import { cx } from "../../../utils/cx";
import "./MesoTicker.scss";

/**
 * Cinta deslizante MESOSOICOS (marquee de estratos). Decorativa: se marca
 * aria-hidden y con prefers-reduced-motion queda estática.
 *
 * @param {object} props
 * @param {string[]} props.items
 */
export default function MesoTicker({ items = [], className, ...rest }) {
  const group = (hidden) => (
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
