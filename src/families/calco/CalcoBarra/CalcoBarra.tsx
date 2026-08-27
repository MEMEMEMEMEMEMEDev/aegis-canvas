import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoBarra.scss";

export interface CalcoBarraProps {
  value: number;
  max?: number;
  /** Qué mide. Obligatorio: es el nombre accesible del progressbar. */
  label: string;
  /** Lo que se lee al lado: "04 / 05", "68 %". */
  readout?: string;
  /** Cuántos bloques dibuja. La barra de carga de la referencia 3 tiene 12. */
  segmentos?: number;
  tono?: CalcoTono;
  /** Los bloques se van encendiendo uno a uno al aparecer. */
  animada?: boolean;
  className?: string;
}

/**
 * La barra de píxeles: la "LOADING ▮▮▮▮" de la referencia 3. No es una
 * barra continua sino bloques discretos, que es como se veía el progreso
 * antes de que se pudiera dibujar un píxel a medias.
 *
 * Cada bloque es un span vacío y el relleno lo decide una clase: así el
 * progressbar sigue siendo un solo nodo con su aria-valuenow y los bloques
 * son puro dibujo.
 */
export default function CalcoBarra({
  value,
  max = 100,
  label,
  readout,
  segmentos = 12,
  tono = "lima",
  animada = false,
  className,
}: CalcoBarraProps) {
  const proporcion = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const llenos = Math.round(proporcion * segmentos);

  return (
    <div className={cx("calco-barra", `calco-barra--${tono}`, animada && "calco-barra--animada", className)}>
      <div className="calco-barra__cabeza">
        <span className="calco-barra__label">{label}</span>
        {readout && <span className="calco-barra__readout">{readout}</span>}
      </div>

      <div
        className="calco-barra__pista"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={readout}
      >
        {Array.from({ length: segmentos }, (_, i) => (
          <span
            key={i}
            className={cx("calco-barra__bloque", i < llenos && "is-lleno")}
            style={{ "--calco-i": i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
