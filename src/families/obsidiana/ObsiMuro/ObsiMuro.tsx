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
  /** Destino. Convierte la esquirla en un enlace de verdad. */
  href?: string;
  onSelect?: () => void;
  className?: string;
}

/**
 * Esquirla: panel-paralelogramo de la galería. Apagada (gris, angosta) hasta
 * que está activa o recibe hover/foco: entonces enciende el arte y crece.
 *
 * Elige su elemento según lo que recibe, y el orden importa: `href` la vuelve
 * un <a> —navegación real, que funciona sin JavaScript y se puede abrir en
 * otra pestaña—, `onSelect` un <button>, y sin ninguno de los dos es un <div>
 * decorativo. La variante de enlace es la que permite que un sitio estático
 * use el muro como galería sin envolverla: el muro solapa a sus HIJOS
 * DIRECTOS, así que un <a> por fuera le rompería los cortes diagonales.
 */
export function ObsiEsquirla({
  eyebrow,
  title,
  art,
  active = false,
  href,
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
  if (href) {
    return (
      <a href={href} aria-current={active ? "page" : undefined} className={clase}>
        {cuerpo}
      </a>
    );
  }
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
