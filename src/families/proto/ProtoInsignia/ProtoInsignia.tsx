import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoInsignia.scss";

/**
 * El estado de una cita o de un paciente. El color sigue la ley de la
 * familia: `urgencia` es rojo y nada más lo es; `espera` (por confirmar, en
 * lista de espera) es miel; `bien` (confirmada, atendida) verde; `persona`
 * celeste; `neutra` lo que ya no pide nada (cancelada, archivado).
 */
export type ProtoInsigniaEstado = "bien" | "espera" | "urgencia" | "persona" | "neutra";

export interface ProtoInsigniaProps {
  estado?: ProtoInsigniaEstado;
  /** El punto delante: para estados vivos (en sala, en curso). */
  punto?: boolean;
  children: ReactNode;
  className?: string;
}

export default function ProtoInsignia({ estado = "neutra", punto = false, children, className }: ProtoInsigniaProps) {
  return (
    <span className={cx("proto-insignia", `proto-insignia--${estado}`, className)}>
      {punto && <span className="proto-insignia__punto" aria-hidden="true" />}
      {children}
    </span>
  );
}
