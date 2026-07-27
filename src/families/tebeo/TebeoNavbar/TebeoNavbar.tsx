import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../tebeo.scss";
import "./TebeoNavbar.scss";

export interface TebeoNavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface TebeoNavbarProps {
  /** Marca a la izquierda (texto o logo). */
  brand: ReactNode;
  links?: TebeoNavbarLink[];
  /** Acción a la derecha (normalmente un TebeoButton tone="sun"). */
  cta?: ReactNode;
  className?: string;
}

/** Barra de navegación TEBEO: cápsula de tinta, enlaces en crema, CTA al borde. */
export default function TebeoNavbar({ brand, links, cta, className }: TebeoNavbarProps) {
  return (
    <nav className={cx("tebeo-navbar", className)}>
      <span className="tebeo-navbar__brand">{brand}</span>
      {links && links.length > 0 && (
        <ul className="tebeo-navbar__links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cx("tebeo-navbar__link", link.active && "is-active")}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {cta && <span className="tebeo-navbar__cta">{cta}</span>}
    </nav>
  );
}
