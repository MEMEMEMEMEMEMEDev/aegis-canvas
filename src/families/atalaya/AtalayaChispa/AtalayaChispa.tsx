import { useId } from "react";
import { cx } from "../../../utils/cx";
import "../atalaya.scss";
import "./AtalayaChispa.scss";

export interface AtalayaChispaProps {
  /** La serie, en orden cronológico. Vacía o de un solo punto no se dibuja. */
  datos: number[];
  /** Qué mide la serie, para quien no ve el dibujo. */
  etiqueta: string;
  /**
   * `bien | mal | aviso` tiñen la línea con el color de estado. Sin esto va
   * en el neutro apagado, que es lo correcto para una serie que sólo
   * acompaña a una cifra.
   */
  tono?: "neutro" | "bien" | "mal" | "aviso";
  /** Alto en px. El ancho lo pone el contenedor. */
  alto?: number;
  className?: string;
}

/**
 * La serie chiquita al lado de una cifra.
 *
 * Dos decisiones que no son estética. El área bajo la línea va rellena con
 * una opacidad muy baja, porque una línea de un pelo sobre fondo claro
 * desaparece en una pantalla mala. Y el ÚLTIMO punto lleva un círculo: en
 * un tablero lo que importa es dónde terminó la serie, no su forma, y sin
 * la marca el ojo se va al pico.
 *
 * La escala se calcula sobre los datos y se deja un margen arriba y abajo,
 * para que la línea nunca toque el borde de su caja y parezca cortada.
 */
export default function AtalayaChispa({
  datos,
  etiqueta,
  tono = "neutro",
  alto = 32,
  className,
}: AtalayaChispaProps) {
  const id = useId();
  if (!datos || datos.length < 2) {
    return (
      <span className={cx("atalaya-chispa", "atalaya-chispa--vacia", className)}>
        sin serie
      </span>
    );
  }

  const W = 100;
  const H = alto;
  const pad = 2;
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  // Una serie plana no tiene rango: sin esto la división da infinito y la
  // línea se dibuja fuera de la caja.
  const span = max - min || 1;
  const x = (i: number) => (i / (datos.length - 1)) * W;
  const y = (v: number) => H - pad - ((v - min) / span) * (H - pad * 2);

  const linea = datos.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
  const area = `${linea} L${W},${H} L0,${H} Z`;
  // El último punto se saca a una constante y no se indexa dos veces: con
  // el índice suelto el compilador lo da por posiblemente ausente, y tiene
  // razón — la guarda de arriba es lo único que lo garantiza.
  const ultimo = datos[datos.length - 1] ?? min;

  return (
    <span
      className={cx("atalaya-chispa", `atalaya-chispa--${tono}`, className)}
      role="img"
      aria-label={`${etiqueta}: ${datos.length} muestras, de ${min} a ${max}, termina en ${ultimo}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="atalaya-chispa__area" d={area} fill={`url(#${id})`} />
        <path className="atalaya-chispa__linea" d={linea} fill="none" />
        <circle
          className="atalaya-chispa__fin"
          cx={W}
          cy={y(ultimo)}
          r={1.8}
        />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
