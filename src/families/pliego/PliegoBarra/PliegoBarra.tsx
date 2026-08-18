import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoBarra.scss";

export interface PliegoBarraProps {
  /** Cuánto va lleno, de 0 a `max`. */
  value: number;
  max?: number;
  /** Nombre de la medida. Sin él la barra es decorativa y se calla. */
  label?: string;
  /** Lo que se imprime al final: "222", "3 / 5", "68 %". */
  readout?: string;
  tone?: "rosa" | "tinta";
  size?: "sm" | "md";
  className?: string;
}

/**
 * La barra de la referencia: el riel fino con el punto corredizo y la cifra
 * al final. Sirve de medidor (cuánta cobertura tiene un stack) y de progreso
 * (por qué parada del recorrido vas).
 *
 * Con `label` es un `progressbar` de verdad y se anuncia; sin `label` se
 * marca `aria-hidden`. Una barra que no puede decir de qué es no debería
 * estar hablándole a nadie.
 */
export default function PliegoBarra({
  value,
  max = 100,
  label,
  readout,
  tone = "rosa",
  size = "md",
  className,
}: PliegoBarraProps) {
  const tope = max > 0 ? max : 1;
  const pct = Math.min(100, Math.max(0, (value / tope) * 100));

  return (
    <div
      className={cx("pliego-barra", `pliego-barra--${tone}`, `pliego-barra--${size}`, className)}
      role={label ? "progressbar" : undefined}
      aria-label={label}
      aria-valuenow={label ? value : undefined}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? max : undefined}
      aria-valuetext={label && readout ? readout : undefined}
      aria-hidden={label ? undefined : "true"}
    >
      {label && <span className="pliego-barra__label">{label}</span>}

      <span className="pliego-barra__riel">
        <span className="pliego-barra__lleno" style={{ inlineSize: `${pct}%` }}>
          <span className="pliego-barra__punto" />
        </span>
      </span>

      {readout && <span className="pliego-barra__readout">{readout}</span>}
    </div>
  );
}
