import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../obsidiana.scss";
import "./ObsiMuro.scss";

export interface ObsiEsquirlaProps {
  /** Rótulo pequeño en mono (categoría, stack, año…). */
  eyebrow?: string;
  title: string;
  /** Fondo-arte: cualquier valor CSS de background (gradiente, url()…). */
  art: string;
  /** Esquirla destacada: a todo color y más ancha. */
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

/**
 * Esquirla: panel-paralelogramo de la galería. Apagada (gris, angosta) hasta
 * que está activa o recibe hover/foco: entonces enciende el arte y crece.
 * Si recibe `onSelect` es un botón de verdad (teclado incluido).
 */
export function ObsiEsquirla({
  eyebrow,
  title,
  art,
  active = false,
  onSelect,
  className,
}: ObsiEsquirlaProps) {
  const clase = cx("obsi-esquirla", active && "is-active", className);
  const cuerpo = (
    <>
      <span className="obsi-esquirla__art" style={{ background: art }} aria-hidden="true" />
      <span className="obsi-esquirla__velo" aria-hidden="true" />
      <span className="obsi-esquirla__placa">
        {eyebrow && <span className="obsi-esquirla__eyebrow">{eyebrow}</span>}
        <span className="obsi-esquirla__title">{title}</span>
      </span>
    </>
  );
  return onSelect ? (
    <button type="button" aria-pressed={active} onClick={onSelect} className={clase}>
      {cuerpo}
    </button>
  ) : (
    <div className={clase}>{cuerpo}</div>
  );
}

export interface ObsiMuroProps {
  children: ReactNode;
  /** Alto del muro. Default: clamp(300px, 46vh, 430px). */
  height?: string;
  className?: string;
}

/**
 * Muro: la fila de esquirlas solapadas por sus cortes diagonales.
 * Puro layout — el estado (cuál está activa) lo decide el consumidor.
 */
export default function ObsiMuro({ children, height, className }: ObsiMuroProps) {
  return (
    <div
      className={cx("obsi-muro", className)}
      style={height ? ({ "--obsi-muro-h": height } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
