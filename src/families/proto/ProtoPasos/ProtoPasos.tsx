import { cx } from "../../../utils/cx";
import { IconoCheck } from "../iconos";
import "../proto.scss";
import "./ProtoPasos.scss";

export interface ProtoPasosProps {
  pasos: string[];
  /** Índice del paso actual (desde 0). */
  actual: number;
  className?: string;
}

/** Dónde va la persona en un flujo de varios pasos (agendar). */
export default function ProtoPasos({ pasos, actual, className }: ProtoPasosProps) {
  return (
    <ol className={cx("proto-pasos", className)} aria-label="Pasos">
      {pasos.map((p, i) => {
        const estado = i < actual ? "hecho" : i === actual ? "actual" : "pendiente";
        return (
          <li key={p} className={cx("proto-pasos__paso", `proto-pasos__paso--${estado}`)} aria-current={estado === "actual" ? "step" : undefined}>
            <span className="proto-pasos__marca" aria-hidden="true">
              {estado === "hecho" ? <IconoCheck tamano={14} /> : i + 1}
            </span>
            <span className="proto-pasos__nombre">
              {p}
              {estado === "hecho" && <span className="proto-oculto"> (listo)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
