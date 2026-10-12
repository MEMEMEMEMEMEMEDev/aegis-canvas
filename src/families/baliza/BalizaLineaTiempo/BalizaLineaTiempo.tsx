import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaLineaTiempo.scss";

export interface BalizaHito {
  id: string;
  /** "13:31:06". */
  hora: string;
  texto: ReactNode;
  /** Quién lo hizo: "Marcelo Ibarra". Un caso es también evidencia. */
  quien?: string;
  /** `sos` el origen, `clave` lo que cambia el caso, `nota` el resto. */
  tipo?: "sos" | "clave" | "nota" | "cierre";
}

export interface BalizaLineaTiempoProps {
  hitos: BalizaHito[];
  /** Lo que lee un lector de pantalla: "Bitácora del caso". */
  etiqueta: string;
  className?: string;
}

/** La bitácora de un caso: qué pasó, a qué hora y quién. Lo más reciente abajo. */
export default function BalizaLineaTiempo({ hitos, etiqueta, className }: BalizaLineaTiempoProps) {
  return (
    <ol className={cx("baliza-linea", className)} aria-label={etiqueta}>
      {hitos.map((h) => (
        <li key={h.id} className={cx("baliza-linea__hito", `baliza-linea__hito--${h.tipo ?? "nota"}`)}>
          <time className="baliza-linea__hora">{h.hora}</time>
          <div className="baliza-linea__texto">
            {h.texto}
            {h.quien && <span className="baliza-linea__quien">{h.quien}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}
