import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../proto.scss";
import "./ProtoOpcion.scss";

export interface ProtoOpcionItem {
  id: string;
  titulo: ReactNode;
  detalle?: ReactNode;
  /** A la derecha: la duración, el precio. */
  extra?: ReactNode;
  icono?: ReactNode;
  deshabilitada?: boolean;
}

export interface ProtoOpcionesProps {
  /** El nombre del grupo, para lectores de pantalla ("Tipo de atención"). */
  leyenda: string;
  opciones: ProtoOpcionItem[];
  valor: string | null;
  onCambio: (id: string) => void;
  /** Muestra la leyenda en pantalla (por omisión sólo la oyen). */
  leyendaVisible?: boolean;
  className?: string;
}

/**
 * Tarjetas para elegir UNA cosa ("¿Qué necesita tu mascota?"). Son radios
 * de verdad: flechas para moverse, espacio para elegir, sin JS de teclado.
 */
export default function ProtoOpciones({ leyenda, opciones, valor, onCambio, leyendaVisible = false, className }: ProtoOpcionesProps) {
  return (
    <fieldset className={cx("proto-opciones", className)}>
      <legend className={leyendaVisible ? "proto-opciones__leyenda" : "proto-oculto"}>{leyenda}</legend>
      {opciones.map((o) => (
        <label
          key={o.id}
          className={cx("proto-opcion", valor === o.id && "proto-opcion--elegida", o.deshabilitada && "proto-opcion--apagada")}
        >
          <input
            type="radio"
            className="proto-opcion__radio"
            name={leyenda}
            value={o.id}
            checked={valor === o.id}
            disabled={o.deshabilitada}
            onChange={() => onCambio(o.id)}
          />
          {o.icono && <span className="proto-opcion__icono" aria-hidden="true">{o.icono}</span>}
          <span className="proto-opcion__texto">
            <span className="proto-opcion__titulo">{o.titulo}</span>
            {o.detalle && <span className="proto-opcion__detalle">{o.detalle}</span>}
          </span>
          {o.extra && <span className="proto-opcion__extra">{o.extra}</span>}
        </label>
      ))}
    </fieldset>
  );
}
