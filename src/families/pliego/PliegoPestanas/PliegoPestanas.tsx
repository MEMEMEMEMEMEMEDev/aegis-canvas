import type { CSSProperties, KeyboardEvent } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoPestanas.scss";

export interface PliegoPestana {
  id: string;
  nombre: string;
  /** Cuántas cosas esperan adentro (la bandeja). Salta al cambiar. */
  cuenta?: number;
  /** La cuenta pide atención: se imprime en rosa. */
  urgente?: boolean;
}

export interface PliegoPestanasProps {
  pestanas: PliegoPestana[];
  /** Controlado SIEMPRE desde fuera: un agente la mueve igual que una persona. */
  activa: string;
  onCambio: (id: string) => void;
  /** Nombre del grupo: "Secciones del panel". */
  etiqueta: string;
  /**
   * Prefijo de los ids. Cada pestaña es `${prefijo}-pestana-${id}` y su panel
   * tiene que ser `${prefijo}-panel-${id}` (role="tabpanel",
   * aria-labelledby a la pestaña). Ver `idsPestana`.
   */
  prefijo?: string;
  className?: string;
}

export function idsPestana(id: string, prefijo = "pliego") {
  return { pestana: `${prefijo}-pestana-${id}`, panel: `${prefijo}-panel-${id}` };
}

/**
 * Pestañas de la lámina: rótulos en micro sobre un filete, y una raya rosa
 * que se DESLIZA hasta la activa (no aparece: viaja). El patrón de teclado
 * es el de ARIA: una sola pestaña en el orden de Tab, flechas para moverse
 * entre ellas, Inicio y Fin, y activación al moverse.
 */
export default function PliegoPestanas({ pestanas, activa, onCambio, etiqueta, prefijo = "pliego", className }: PliegoPestanasProps) {
  const lista = useRef<HTMLDivElement>(null);
  const [raya, setRaya] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const el = lista.current?.querySelector<HTMLElement>(`[aria-selected="true"]`);
    if (el) setRaya({ x: el.offsetLeft, w: el.offsetWidth });
  }, [activa, pestanas]);

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
    <div ref={lista} className={cx("pliego-pestanas", className)} role="tablist" aria-label={etiqueta} onKeyDown={tecla}
      style={raya ? ({ "--pliego-raya-x": `${raya.x}px`, "--pliego-raya-w": `${raya.w}px` } as CSSProperties) : undefined}>
      {pestanas.map((p) => {
        const ids = idsPestana(p.id, prefijo);
        const sel = p.id === activa;
        return (
          <button key={p.id} type="button" role="tab" id={ids.pestana} aria-selected={sel} aria-controls={ids.panel}
            tabIndex={sel ? 0 : -1} className={cx("pliego-pestanas__una", sel && "pliego-pestanas__una--activa")}
            onClick={() => onCambio(p.id)}>
            {p.nombre}
            {p.cuenta != null && p.cuenta > 0 && (
              <span key={p.cuenta} className={cx("pliego-pestanas__cuenta", p.urgente && "pliego-pestanas__cuenta--urgente")}>
                {p.cuenta}
              </span>
            )}
          </button>
        );
      })}
      {raya && <span className="pliego-pestanas__raya" aria-hidden="true" />}
    </div>
  );
}
