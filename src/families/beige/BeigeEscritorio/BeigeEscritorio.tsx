import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BeigeCrt from "../BeigeCrt/BeigeCrt";
import "../beige.scss";
import "./BeigeEscritorio.scss";

export interface BeigeEscritorioProps {
  children: ReactNode;
  /** El tubo encima de la pantalla. Apagarlo solo para depurar. */
  crt?: boolean;
  className?: string;
}

/**
 * El escritorio verde azulado: el suelo donde viven iconos, ventanas y la
 * barra de tareas. Monta el monitor (BeigeCrt) encima de todo.
 */
export default function BeigeEscritorio({ children, crt = true, className }: BeigeEscritorioProps) {
  return (
    <div className={cx("beige-escritorio", className)}>
      {children}
      {crt && <BeigeCrt />}
    </div>
  );
}
