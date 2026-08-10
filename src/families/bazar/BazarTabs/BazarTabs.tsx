import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarTabs.scss";

export interface BazarTabsItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BazarTabsProps {
  items: readonly BazarTabsItem[];
  /** Rótulo del landmark de navegación. */
  label?: string;
  className?: string;
}

/**
 * La fila de secciones del portal (HOMEPAGE · GOLD MEMBER · …): píldoras
 * sobre el pliego, la activa entintada. Es un landmark de navegación real.
 */
export default function BazarTabs({ items, label = "Secciones", className }: BazarTabsProps) {
  return (
    <nav className={cx("bazar-tabs", className)} aria-label={label}>
      <ul>
        {items.map((item) => {
          const clase = cx("bazar-tabs__tab", item.active && "bazar-tabs__tab--activa");
          return (
            <li key={item.label}>
              {item.href ? (
                <a className={clase} href={item.href} aria-current={item.active ? "true" : undefined}>
                  {item.label}
                </a>
              ) : (
                <span className={clase} aria-current={item.active ? "true" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
