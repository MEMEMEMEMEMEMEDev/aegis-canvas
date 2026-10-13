import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoPanel.scss";

export interface ProtoPanelProps {
  titulo?: ReactNode;
  sub?: ReactNode;
  /** Lo que va a la derecha del título: un enlace, un botón chico. */
  accion?: ReactNode;
  /** El nivel del título: los paneles de una pantalla suelen ser h2. */
  nivel?: 2 | 3;
  /** `pozo`: un panel hundido en arena, para agrupar sin levantar. */
  variante?: "hoja" | "pozo";
  children?: ReactNode;
  className?: string;
}

export default function ProtoPanel({ titulo, sub, accion, nivel = 2, variante = "hoja", children, className }: ProtoPanelProps) {
  const Titulo = nivel === 2 ? "h2" : "h3";
  return (
    <section className={cx("proto-panel", `proto-panel--${variante}`, className)}>
      {(titulo || accion) && (
        <header className="proto-panel__cabeza">
          <div>
            {titulo && <Titulo className="proto-panel__titulo">{titulo}</Titulo>}
            {sub && <p className="proto-panel__sub">{sub}</p>}
          </div>
          {accion && <div className="proto-panel__accion">{accion}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
