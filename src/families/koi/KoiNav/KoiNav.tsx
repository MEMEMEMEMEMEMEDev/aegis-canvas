import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../koi.scss";
import "./KoiNav.scss";

export interface KoiNavLink {
  label: string;
  href: string;
  /** Icono/emoji opcional delante del label. */
  icon?: ReactNode;
  active?: boolean;
}

export interface KoiNavProps {
  /** Marca a la izquierda (glifo brush corto, p. ej. "S-"). */
  brand: ReactNode;
  links?: KoiNavLink[];
  /** Racimo derecho (iconos, avatar, CTA). */
  right?: ReactNode;
  className?: string;
}

/** Nav KOI: cápsula de vidrio negro flotante con enlaces + racimo derecho. */
export default function KoiNav({ brand, links, right, className }: KoiNavProps) {
  return (
    <nav className={cx("koi-nav", className)}>
      <span className="koi-nav__brand">{brand}</span>
      {links && links.length > 0 && (
        <ul className="koi-nav__links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cx("koi-nav__link", link.active && "is-active")}
                aria-current={link.active ? "page" : undefined}
              >
                {link.icon && <span aria-hidden="true">{link.icon}</span>}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {right && <span className="koi-nav__right">{right}</span>}
    </nav>
  );
}
