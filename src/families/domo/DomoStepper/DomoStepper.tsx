import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoStepper.scss";

export interface DomoStepperProps {
  /** Valor controlado (undefined = no controlado). */
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  step?: number;
  min?: number;
  max?: number;
  /** Nombre del dato para lectores de pantalla ("temperatura", "presupuesto"…). */
  label: string;
  /** Presentación del valor (default: String). Ej: (n) => `${n.toFixed(1)}°C`. */
  format?: (n: number) => string;
  size?: "md" | "lg";
  disabled?: boolean;
  className?: string;
}

/**
 * Stepper DOMO: el control ⊖ 19.0°C ⊕ de la referencia. Valor grande
 * monoespaciado entre dos botones circulares. Controlable desde fuera
 * (un agente AI puede fijar `value` igual que un humano pulsa).
 */
export default function DomoStepper({
  value,
  defaultValue,
  onChange,
  step = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  label,
  format = String,
  size = "md",
  disabled = false,
  className,
}: DomoStepperProps) {
  const [current = 0, setCurrent] = useControllableState<number>({
    value,
    defaultValue: defaultValue ?? (Number.isFinite(min) ? min : 0),
    onChange,
  });

  // Suma en enteros de `step` para esquivar los errores de coma flotante
  // (19.1 + 0.1 → 19.200000000000003).
  const decimals = (String(step).split(".")[1] ?? "").length;
  const nudge = (dir: 1 | -1) => {
    const next = Number((current + dir * step).toFixed(decimals));
    setCurrent(Math.min(max, Math.max(min, next)));
  };

  const display = format(current);

  return (
    <div
      className={cx("domo-stepper", `domo-stepper--${size}`, className)}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="domo-stepper__btn"
        aria-label={`Disminuir ${label}`}
        disabled={disabled || current <= min}
        onClick={() => nudge(-1)}
      >
        −
      </button>
      <span className="domo-stepper__value" aria-live="polite">
        {/* key = remount → animación de tick en cada cambio */}
        <span className="domo-stepper__digits" key={display}>
          {display}
        </span>
      </span>
      <button
        type="button"
        className="domo-stepper__btn"
        aria-label={`Aumentar ${label}`}
        disabled={disabled || current >= max}
        onClick={() => nudge(1)}
      >
        +
      </button>
    </div>
  );
}
