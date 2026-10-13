import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import ProtoAvatar from "../ProtoAvatar/ProtoAvatar";
import ProtoInsignia, { type ProtoInsigniaEstado } from "../ProtoInsignia/ProtoInsignia";
import "../proto.scss";
import "./ProtoCita.scss";

export type ProtoCitaEstado = "porConfirmar" | "confirmada" | "enSala" | "enAtencion" | "atendida" | "cancelada" | "noAsistio";

const ESTADOS: Record<ProtoCitaEstado, { texto: string; insignia: ProtoInsigniaEstado; punto?: boolean }> = {
  porConfirmar: { texto: "Por confirmar", insignia: "espera" },
  confirmada: { texto: "Confirmada", insignia: "bien" },
  enSala: { texto: "En sala de espera", insignia: "persona", punto: true },
  enAtencion: { texto: "En atención", insignia: "bien", punto: true },
  atendida: { texto: "Atendida", insignia: "neutra" },
  cancelada: { texto: "Cancelada", insignia: "neutra" },
  noAsistio: { texto: "No asistió", insignia: "neutra" },
};

export interface ProtoCitaProps {
  /** "10:30" */
  hora: string;
  /** En minutos: la tarjeta crece con ella en la vista del día. */
  duracion: number;
  mascota: string;
  /** "Perro · Labrador · 7 años" */
  especie?: string;
  dueno: string;
  servicio: string;
  estado: ProtoCitaEstado;
  /** La nota que el equipo tiene que ver antes de entrar ("Muerde al pesarlo"). */
  nota?: ReactNode;
  /** Marca la urgencia: el único rojo de la tarjeta. */
  urgente?: boolean;
  /** `bloque` escala la altura con la duración (la vista del día). */
  forma?: "fila" | "bloque";
  accion?: ReactNode;
  className?: string;
}

export default function ProtoCita({
  hora, duracion, mascota, especie, dueno, servicio, estado, nota, urgente = false, forma = "fila", accion, className,
}: ProtoCitaProps) {
  const e = ESTADOS[estado];
  const apagada = estado === "cancelada" || estado === "noAsistio";
  return (
    <article
      className={cx("proto-cita", `proto-cita--${forma}`, urgente && "proto-cita--urgente", apagada && "proto-cita--apagada", className)}
      style={forma === "bloque" ? { minHeight: `${Math.max(duracion, 30) * 2.4}px` } : undefined}
      aria-label={`${hora}, ${mascota}, ${servicio}`}
    >
      <div className="proto-cita__hora">
        <span className="proto-cita__inicio">{hora}</span>
        <span className="proto-cita__duracion">{duracion < 60 ? `${duracion} min` : `${duracion / 60} h`}</span>
      </div>
      <div className="proto-cita__cuerpo">
        <div className="proto-cita__quien">
          <ProtoAvatar nombre={mascota} tipo="mascota" tamano="chico" />
          <div className="proto-cita__nombres">
            <span className="proto-cita__mascota">{mascota}</span>
            <span className="proto-cita__dueno">{especie ? `${especie} · ` : ""}{dueno}</span>
          </div>
        </div>
        <div className="proto-cita__servicio">{servicio}</div>
        {nota && <div className="proto-cita__nota">{nota}</div>}
      </div>
      <div className="proto-cita__lado">
        {urgente && <ProtoInsignia estado="urgencia" punto>Urgencia</ProtoInsignia>}
        <ProtoInsignia estado={e.insignia} punto={e.punto}>{e.texto}</ProtoInsignia>
        {accion}
      </div>
    </article>
  );
}
