import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiFlecha.scss";

export type DenkiDir = "izq" | "der" | "arriba" | "abajo";

export interface DenkiFlechaProps {
  /** La secuencia de direcciones, en orden de lectura. */
  dirs: readonly DenkiDir[];
  /** Índice encendido, o null. Sirve para marcar el paso actual. */
  activo?: number | null;
  /** Corre la secuencia sola, como la demo de combos de una recreativa. */
  attract?: boolean;
  /** panel (default: sobre negro) · paper */
  tone?: "panel" | "paper";
  /**
   * Nombre accesible. Sin él la tira es decoración — que suele ser lo
   * correcto: un combo dibujado casi nunca dice algo que no esté escrito
   * al lado con palabras.
   */
  label?: string;
  className?: string;
}

// Las cuatro puntas, dibujadas como triángulos macizos. Rotar UNA flecha
// con CSS sería menos código, pero el triángulo tiene que apuntar sin
// deformarse a ningún tamaño y cada punto está medido para eso.
const PUNTA: Record<DenkiDir, string> = {
  izq: "11,3 11,17 3,10",
  der: "9,3 9,17 17,10",
  arriba: "3,14 17,14 10,4",
  abajo: "3,6 17,6 10,16",
};

export default function DenkiFlecha({
  dirs,
  activo = null,
  attract = false,
  tone = "panel",
  label,
  className,
}: DenkiFlechaProps) {
  return (
    <span
      className={cx("denki-flecha", `denki-flecha--${tone}`, attract && "is-attract", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {dirs.map((dir, i) => (
        <span
          key={`${dir}-${i}`}
          className={cx("denki-flecha__celda", activo === i && "is-activa")}
          style={{ animationDelay: `${i * 0.26}s` }}
        >
          <svg viewBox="0 0 20 20">
            <polygon points={PUNTA[dir]} />
          </svg>
        </span>
      ))}
    </span>
  );
}
