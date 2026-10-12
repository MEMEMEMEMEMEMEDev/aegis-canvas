import type { KeyboardEvent } from "react";
import { useRef } from "react";
import { cx } from "../../../utils/cx";
import "../baliza.scss";
import "./BalizaPestanas.scss";

export interface BalizaPestana {
  id: string;
  nombre: string;
  /** Cuántas cosas esperan adentro; con `urgente` se pinta en rojo. */
  cuenta?: number;
  urgente?: boolean;
}

export interface BalizaPestanasProps {
  pestanas: BalizaPestana[];
  /** Controlado SIEMPRE desde fuera: un agente la mueve igual que una persona. */
  activa: string;
  onCambio: (id: string) => void;
  /** Nombre del grupo para lectores de pantalla: "Secciones del panel". */
  etiqueta: string;
  /** Cada pestaña es `${prefijo}-pestana-${id}`; su panel, `${prefijo}-panel-${id}`. */
  prefijo?: string;
  className?: string;
}

export function idsPestana(id: string, prefijo = "baliza") {
  return { pestana: `${prefijo}-pestana-${id}`, panel: `${prefijo}-panel-${id}` };
}

/**
 * Las pestañas-botón del panel. Teclado ARIA: una sola pestaña en el orden
 * de Tab, flechas para moverse, Inicio y Fin, activación al moverse.
 */
export default function BalizaPestanas({ pestanas, activa, onCambio, etiqueta, prefijo = "baliza", className }: BalizaPestanasProps) {
  const lista = useRef<HTMLDivElement>(null);

  function tecla(e: KeyboardEvent<HTMLDivElement>) {
    const i = pestanas.findIndex((p) => p.id === activa);
    const ir = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: pestanas.length - 1 }[e.key];
    if (ir === undefined) return;
    e.preventDefault();
    const destino = pestanas[(ir + pestanas.length) % pestanas.length];
    if (!destino) return;
    onCambio(destino.id);
    lista.current?.querySelector<HTMLElement>(`#${CSS.escape(idsPestana(destino.id, prefijo).pestana)}`)?.focus();
  }

  return (
    <div ref={lista} role="tablist" aria-label={etiqueta} className={cx("baliza-pestanas", className)} onKeyDown={tecla}>
      {pestanas.map((p) => {
        const ids = idsPestana(p.id, prefijo);
        const sel = p.id === activa;
        return (
          <button
            key={p.id}
            id={ids.pestana}
            type="button"
            role="tab"
            aria-selected={sel}
            aria-controls={ids.panel}
            tabIndex={sel ? 0 : -1}
            className={cx("baliza-pestanas__pestana", sel && "is-activa")}
            onClick={() => onCambio(p.id)}
          >
            {p.nombre}
            {p.cuenta !== undefined && (
              <span className={cx("baliza-pestanas__cuenta", p.urgente && "is-urgente")}>{p.cuenta}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
