import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarPill.scss";

export type BazarPillIcon =
  | "alerta"
  | "flecha"
  | "reciclar"
  | "descarga"
  | "candado"
  | "mira"
  | "corazon";

export interface BazarPillProps {
  children: ReactNode;
  icon?: BazarPillIcon;
  /** tinta (default) · linea · rosa. */
  tone?: "tinta" | "linea" | "rosa";
  /**
   * Sobre qué superficie se pega: el pliego claro (default) o el chrome
   * oscuro.
   *
   * No es cosmético: la píldora de contorno se dibuja con `--bazar-tinta`,
   * que es EXACTAMENTE el color del chrome. Sobre el pliego da 14:1 y sobre
   * el chrome desaparece —tinta negra sobre fondo negro, 1:1— que es lo que
   * pasaba en la pantalla de agente antes de que esto existiera. La familia
   * siempre vivió sobre dos superficies; esta pieza no se había enterado.
   */
  sobre?: "papel" | "chrome";
  className?: string;
}

const ICONOS: Record<BazarPillIcon, ReactNode> = {
  alerta: (
    <path
      d="M8 2.5L14.5 13.5H1.5zM8 6.8v3M8 11.6v.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  flecha: (
    <path
      d="M4 12L12 4M6 4h6v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  reciclar: (
    <path
      d="M8 2.8l2.4 4.1H5.6zM12.6 8.6l1.8 3.2-3.6 2.1-1.8-3.2M3.4 8.6L1.6 11.8l3.6 2.1 1.8-3.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  descarga: (
    <path
      d="M8 2v7M5 6.5L8 9.5l3-3M2.5 12.5h11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  candado: (
    <>
      <rect x="3.2" y="7" width="9.6" height="6.8" rx="1.4" fill="currentColor" />
      <path d="M5.2 7V5a2.8 2.8 0 0 1 5.6 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  mira: (
    <path
      d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M8 5.2A2.8 2.8 0 1 1 8 10.8 2.8 2.8 0 0 1 8 5.2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  corazon: (
    <path
      d="M8 13.5C4.5 11 2 8.8 2 6.2 2 4.4 3.4 3 5.1 3 6.3 3 7.4 3.6 8 4.6 8.6 3.6 9.7 3 10.9 3 12.6 3 14 4.4 14 6.2c0 2.6-2.5 4.8-6 7.3z"
      fill="currentColor"
    />
  ),
};

/** Píldora de letra pequeña: icono + micro-texto, la voz de los avisos. */
export default function BazarPill({
  children,
  icon,
  tone = "tinta",
  sobre = "papel",
  className,
}: BazarPillProps) {
  return (
    <span className={cx("bazar-pill", `bazar-pill--${tone}`, `bazar-pill--en-${sobre}`, className)}>
      {icon && (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {ICONOS[icon]}
        </svg>
      )}
      {children}
    </span>
  );
}
