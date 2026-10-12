import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaPanel.scss";

export interface BalizaPanelProps {
  titulo?: ReactNode;
  sub?: ReactNode;
  /** A la derecha del título: "+ Nuevo", filtros. */
  acciones?: ReactNode;
  /** Sin relleno interior: listas y tablas que tocan los bordes. */
  sinRelleno?: boolean;
  /** Nivel del título; por omisión h2. */
  nivel?: 2 | 3;
  children?: ReactNode;
  className?: string;
}

export default function BalizaPanel({
  titulo,
  sub,
  acciones,
  sinRelleno = false,
  nivel = 2,
  children,
  className,
}: BalizaPanelProps) {
  const Titulo = nivel === 2 ? "h2" : "h3";
  return (
    <section className={cx("baliza-panel", sinRelleno && "baliza-panel--sin-relleno", className)}>
      {(titulo || acciones) && (
        <header className="baliza-panel__cabeza">
          <div>
            {titulo && <Titulo className="baliza-panel__titulo">{titulo}</Titulo>}
            {sub && <p className="baliza-panel__sub">{sub}</p>}
          </div>
          {acciones && <div className="baliza-panel__acciones">{acciones}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
