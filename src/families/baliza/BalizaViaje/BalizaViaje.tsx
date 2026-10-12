import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaViaje.scss";

export interface BalizaViajeProps {
  origen: string;
  destino: string;
  /** "14:00". */
  llegada: string;
  /** Lo que queda, ya formateado: "1 h 42 min", "−18 min". */
  resta: string;
  /** 0 a 1: cuánto del plazo ya pasó. */
  avance: number;
  /**
   * `enCurso`: va bien. `porVencer`: quedan menos de 15 min (ámbar).
   * `vencido`: pasó la hora sin confirmar — la base ya recibió un aviso.
   * `llego`: confirmado, viaje cerrado.
   */
  estado: "enCurso" | "porVencer" | "vencido" | "llego";
  /** Botones: "Llegué", "Necesito más tiempo". */
  acciones?: ReactNode;
  className?: string;
}

const LEYENDA = {
  enCurso: "Viaje vigilado",
  porVencer: "Por vencer",
  vencido: "Sin confirmar · la base fue avisada",
  llego: "Llegada confirmada",
};

/**
 * El viaje con hora de llegada: el seguro del trabajador que va solo. Si
 * no confirma a tiempo, el SERVIDOR avisa a la base aunque el teléfono
 * esté apagado o sin señal. Por eso la tarjeta lo dice: "vigilado".
 */
export default function BalizaViaje({ origen, destino, llegada, resta, avance, estado, acciones, className }: BalizaViajeProps) {
  const pct = Math.round(Math.min(1, Math.max(0, avance)) * 100);
  return (
    <section className={cx("baliza-viaje", `baliza-viaje--${estado}`, className)} aria-label={`Viaje de ${origen} a ${destino}`}>
      <p className="baliza-viaje__estado">{LEYENDA[estado]}</p>
      <ol className="baliza-viaje__ruta">
        <li>{origen}</li>
        <li>{destino}</li>
      </ol>
      <div className="baliza-viaje__tiempo">
        <div>
          <span className="baliza-viaje__rotulo">Llegada estimada</span>
          <span className="baliza-viaje__llegada">{llegada}</span>
        </div>
        <div className="baliza-viaje__resta">
          <span className="baliza-viaje__rotulo">{estado === "vencido" ? "Atrasado" : "Quedan"}</span>
          <span className="baliza-viaje__cifra">{resta}</span>
        </div>
      </div>
      {estado !== "llego" && (
        <div
          className="baliza-viaje__barra"
          role="progressbar"
          aria-label="Tiempo del viaje transcurrido"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          style={{ "--pct": `${pct}%` } as CSSProperties}
        />
      )}
      {acciones && <div className="baliza-viaje__acciones">{acciones}</div>}
    </section>
  );
}
