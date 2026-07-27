import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoTabbar.scss";

export interface TebeoTabbarItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface TebeoTabbarProps {
  items: TebeoTabbarItem[];
  className?: string;
}

/**
 * Tab bar móvil TEBEO: cápsula de tinta con el ítem activo en píldora de sol.
 * Vive al pie de una pantalla (real o dentro de un TebeoPhone).
 */
export default function TebeoTabbar({ items, className }: TebeoTabbarProps) {
  return (
    <nav className={cx("tebeo-tabbar", className)}>
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={cx("tebeo-tabbar__item", item.active && "is-active")}
          aria-current={item.active ? "page" : undefined}
          onClick={item.onClick}
        >
          <span className="tebeo-tabbar__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="tebeo-tabbar__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
