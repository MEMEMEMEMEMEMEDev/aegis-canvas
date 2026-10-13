import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoMetrica.scss";

export interface ProtoMetricaProps {
  rotulo: ReactNode;
  valor: ReactNode;
  /** El contexto del número: "vs. martes pasado", "de 24 horas". */
  nota?: ReactNode;
  /** La tendencia. `buena`/`mala` las decide quien llama: subir no siempre es bueno. */
  tendencia?: { texto: string; sentido: "buena" | "mala" | "igual" };
  icono?: ReactNode;
  className?: string;
}

export default function ProtoMetrica({ rotulo, valor, nota, tendencia, icono, className }: ProtoMetricaProps) {
  return (
    <div className={cx("proto-metrica", className)}>
      <div className="proto-metrica__rotulo">
        {icono && <span className="proto-metrica__icono" aria-hidden="true">{icono}</span>}
        {rotulo}
      </div>
      <div className="proto-metrica__valor">{valor}</div>
      {(tendencia || nota) && (
        <div className="proto-metrica__pie">
          {tendencia && (
            <span className={cx("proto-metrica__tendencia", `proto-metrica__tendencia--${tendencia.sentido}`)}>
              {tendencia.texto}
            </span>
          )}
          {nota && <span>{nota}</span>}
        </div>
      )}
    </div>
  );
}
