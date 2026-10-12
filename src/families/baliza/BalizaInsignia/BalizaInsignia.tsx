import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaInsignia.scss";

export type BalizaInsigniaEstado =
  | "activa"
  | "bloqueada"
  | "sinAtender"
  | "atendida"
  | "reservado"
  | "neutro";

export interface BalizaInsigniaProps {
  /**
   * El estado decide el color; el texto siempre lo dice con palabras, porque
   * un daltónico en la base tiene que leer "sin atender" igual que los demás.
   */
  estado: BalizaInsigniaEstado;
  /** `sinAtender` late (salvo prefers-reduced-motion). */
  children: ReactNode;
  className?: string;
}

export default function BalizaInsignia({ estado, children, className }: BalizaInsigniaProps) {
  return (
    <span className={cx("baliza-insignia", `baliza-insignia--${estado}`, className)}>
      {estado === "sinAtender" && <span className="baliza-insignia__latido" aria-hidden="true" />}
      {children}
    </span>
  );
}
