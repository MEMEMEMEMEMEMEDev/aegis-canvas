import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiStat.scss";

export interface KoiStatItem {
  label: string;
  value: string;
}

export interface KoiStatProps {
  items: KoiStatItem[];
  className?: string;
}

/** Fila de métricas KOI sobre vidrio ("users 15.6k · gen 35.6k · artists 1.4k"). */
export default function KoiStat({ items, className }: KoiStatProps) {
  return (
    <dl className={cx("koi-stat", className)}>
      {items.map((item) => (
        <div key={item.label} className="koi-stat__item">
          <dt className="koi-stat__label">{item.label}</dt>
          <dd className="koi-stat__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
