import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaVacio.scss";

export interface AtalayaVacioProps {
  titulo: ReactNode;
  /** Qué hacer ahora. Un vacío sin salida es una pared. */
  children?: ReactNode;
  accion?: ReactNode;
  /**
   * `sinver` cuando la lista está vacía porque NO SE PUDO MIRAR, que no es
   * lo mismo que estar vacía. Los dos casos se ven igual en casi todo
   * tablero, y ahí es donde una caída se lee como calma.
   */
  motivo?: "vacio" | "sinver";
  className?: string;
}

export default function AtalayaVacio({
  titulo,
  children,
  accion,
  motivo = "vacio",
  className,
}: AtalayaVacioProps) {
  return (
    <div className={cx("atalaya-vacio", `atalaya-vacio--${motivo}`, className)}>
      <p className="atalaya-vacio__titulo">{titulo}</p>
      {children && <p className="atalaya-vacio__texto">{children}</p>}
      {accion && <div className="atalaya-vacio__accion">{accion}</div>}
    </div>
  );
}
