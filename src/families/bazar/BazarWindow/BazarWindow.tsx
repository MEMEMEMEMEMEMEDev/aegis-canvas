import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarWindow.scss";

export interface BazarWindowProps {
  title: string;
  /** Etiqueta del título: "h2"/"h3" cuando la ventana ES una sección. */
  as?: ElementType;
  /** morado (default) · rosa · tinta. */
  tone?: "morado" | "rosa" | "tinta";
  /** El botón de cerrar decorativo que muerde la esquina. */
  cerrar?: boolean;
  /** Grados de rotación de la calcomanía. 0 = recta. */
  rotate?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Ventana retro del sistema operativo inventado del portal: barra de título
 * con sus botones, cuerpo de papel y un cerrar que no cierra nada — está
 * pegado como calcomanía, igual que en la referencia.
 */
export default function BazarWindow({
  title,
  as: Title = "p",
  tone = "morado",
  cerrar = true,
  rotate = 0,
  children,
  className,
}: BazarWindowProps) {
  return (
    <section
      className={cx("bazar-ventana", `bazar-ventana--${tone}`, className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <header className="bazar-ventana__barra">
        <span className="bazar-ventana__lineas" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <Title className="bazar-ventana__titulo">{title}</Title>
        <span className="bazar-ventana__botones" aria-hidden="true">
          <i />
          <i />
        </span>
      </header>
      {cerrar && (
        <span className="bazar-ventana__cerrar" aria-hidden="true">
          ✕
        </span>
      )}
      <div className="bazar-ventana__cuerpo">{children}</div>
    </section>
  );
}
