import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiNav.scss";

export interface ObsiNavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface ObsiNavProps {
  /** Marca a la izquierda (texto o nodo). */
  brand: ReactNode;
  links: ObsiNavLink[];
  /** Acción a la derecha (p. ej. un ObsiBoton de contacto). */
  action?: ReactNode;
  /** Fija la barra arriba del scope. Default: true. */
  sticky?: boolean;
  className?: string;
  onNavigate?: (href: string) => void;
}

/**
 * Barra de navegación OBSIDIANA: la única regla es que SIEMPRE se ve.
 * Enlaces con resalte-paralelogramo en el activo y hairline inferior.
 * Convencional a propósito: el esqueleto no juega, juega la piel.
 */
export default function ObsiNav({
  brand,
  links,
  action,
  sticky = true,
  className,
  onNavigate,
}: ObsiNavProps) {
  return (
    <nav className={cx("obsi-nav", sticky && "obsi-nav--sticky", className)}>
      <span className="obsi-nav__brand">{brand}</span>
      <ul className="obsi-nav__links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cx("obsi-nav__link", link.active && "is-active")}
              onClick={
                onNavigate
                  ? (e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }
                  : undefined
              }
            >
              <span data-obsi-recto>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {action && <span className="obsi-nav__action">{action}</span>}
    </nav>
  );
}
