import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaCarga.scss";

export interface VitrinaCargaProps {
  /**
   * barra: un hilo coral fijo arriba de la página, indeterminado.
   * bolsa: la bolsa que se dibuja sola y se llena de coral (inline).
   * pagina: la bolsa grande centrada con su texto, para una pantalla entera.
   */
  modo?: "barra" | "bolsa" | "pagina";
  texto?: string;
  /** 0–100. Con él la bolsa se llena hasta ahí en vez de en bucle. */
  progreso?: number;
  tamano?: "sm" | "md" | "lg";
  className?: string;
}

const LADO = { sm: 24, md: 48, lg: 96 } as const;

// La bolsa de compras: asa y cuerpo, dibujados con un solo trazo para que
// stroke-dashoffset la "escriba" de arriba abajo.
const BOLSA = "M16 18V13a8 8 0 0 1 16 0v5M8 18h32l-3 24H11L8 18z";
const CUERPO = "M8 18h32l-3 24H11L8 18z";

function Bolsa({ tamano, progreso }: { tamano: keyof typeof LADO; progreso?: number }) {
  const determinado = progreso !== undefined;
  return (
    <span className={cx("vitrina-carga__bolsa", determinado && "is-determinada")} style={determinado ? ({ "--p": `${Math.max(0, Math.min(100, progreso))}%` } as CSSProperties) : undefined} aria-hidden="true">
      <svg viewBox="0 0 48 48" width={LADO[tamano]} height={LADO[tamano]} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <clipPath id="vitrina-carga-cuerpo">
          <path d={CUERPO} />
        </clipPath>
        <rect className="vitrina-carga__relleno" x="6" y="16" width="36" height="28" clipPath="url(#vitrina-carga-cuerpo)" />
        <path className="vitrina-carga__trazo" d={BOLSA} stroke="currentColor" pathLength="100" />
      </svg>
    </span>
  );
}

/**
 * Carga VITRINA: el cargador de la familia. La barra es el hilo coral que
 * corre arriba mientras llega una pantalla; la bolsa es la marca — se
 * dibuja sola de arriba abajo y luego se llena de coral, en bucle o hasta
 * el porcentaje que se le diga. En reposo la bolsa queda quieta, medio
 * llena, y el texto cuenta lo que pasa.
 */
export default function VitrinaCarga({ modo = "bolsa", texto, progreso, tamano = "md", className }: VitrinaCargaProps) {
  if (modo === "barra") {
    return (
      <div className={cx("vitrina-carga", "vitrina-carga--barra", className)} role="status" aria-label={texto ?? "Cargando"}>
        <span className="vitrina-carga__hilo" />
      </div>
    );
  }

  return (
    <div className={cx("vitrina-carga", `vitrina-carga--${modo}`, className)} role="status" aria-live="polite">
      <Bolsa tamano={modo === "pagina" ? "lg" : tamano} progreso={progreso} />
      {(texto || modo === "pagina") && <span className="vitrina-carga__texto">{texto ?? "Cargando…"}</span>}
      {!texto && modo === "bolsa" && <span className="vitrina-carga__sr">Cargando</span>}
    </div>
  );
}
