import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BalizaAvatar from "../BalizaAvatar/BalizaAvatar";
import "../baliza.scss";
import "./BalizaFila.scss";

export interface BalizaFilaProps {
  /** Nombre de la persona (o del camión, o de la base). */
  titulo: string;
  /** "SOS-0412 · Puente Alto". */
  sub?: ReactNode;
  /** Al final: una BalizaInsignia, una hora. */
  fin?: ReactNode;
  /** Lo que va a la izquierda; por omisión, las iniciales del título. */
  marca?: ReactNode;
  elegida?: boolean;
  /** Con onClick la fila es un botón (y se enfoca); sin él, sólo se lee. */
  onClick?: () => void;
  className?: string;
}

export default function BalizaFila({ titulo, sub, fin, marca, elegida = false, onClick, className }: BalizaFilaProps) {
  const cuerpo = (
    <>
      {marca ?? <BalizaAvatar nombre={titulo} />}
      <span className="baliza-fila__texto">
        <span className="baliza-fila__titulo">{titulo}</span>
        {sub && <span className="baliza-fila__sub">{sub}</span>}
      </span>
      {fin && <span className="baliza-fila__fin">{fin}</span>}
    </>
  );
  const clases = cx("baliza-fila", elegida && "baliza-fila--elegida", onClick && "baliza-fila--toca", className);
  return onClick ? (
    <button type="button" className={clases} aria-pressed={elegida} onClick={onClick}>
      {cuerpo}
    </button>
  ) : (
    <div className={clases}>{cuerpo}</div>
  );
}
