import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoSegmento.scss";

export interface ProtoSegmentoProps {
  /** El nombre del grupo ("Para quién es la nota"). */
  leyenda: string;
  opciones: { id: string; texto: ReactNode }[];
  valor: string;
  onCambio: (id: string) => void;
  /** Muestra la leyenda en pantalla. */
  leyendaVisible?: boolean;
  className?: string;
}

/** Elegir una entre pocas opciones cortas, en fila (Todos · Un rol · Sólo yo). Radios de verdad. */
export default function ProtoSegmento({ leyenda, opciones, valor, onCambio, leyendaVisible = false, className }: ProtoSegmentoProps) {
  return (
    <fieldset className={cx("proto-segmento", className)}>
      <legend className={leyendaVisible ? "proto-segmento__leyenda" : "proto-oculto"}>{leyenda}</legend>
      <div className="proto-segmento__fila">
        {opciones.map((o) => (
          <label key={o.id} className={cx("proto-segmento__opcion", valor === o.id && "proto-segmento__opcion--elegida")}>
            <input type="radio" name={leyenda} value={o.id} checked={valor === o.id} onChange={() => onCambio(o.id)} className="proto-segmento__radio" />
            {o.texto}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
