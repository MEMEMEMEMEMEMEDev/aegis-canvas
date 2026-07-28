import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoToggle.scss";

export interface DomoToggleProps {
  /** Estado controlado (undefined = no controlado). */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  /** Nombre del dato para lectores de pantalla ("radiadores", "modo AI"…). */
  label: string;
  /** Textos dentro de la píldora. */
  labels?: { on: string; off: string };
  disabled?: boolean;
  className?: string;
}

/**
 * Interruptor DOMO: la píldora ON/OFF de la referencia — siempre tinta,
 * el estado lo cuentan la posición de la perilla y el texto que cambia
 * de lado. role="switch" nativo, controlable desde fuera.
 */
export default function DomoToggle({
  checked,
  defaultChecked = false,
  onChange,
  label,
  labels = { on: "ON", off: "OFF" },
  disabled = false,
  className,
}: DomoToggleProps) {
  const [on = false, setOn] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      className={cx("domo-toggle", on && "is-on", className)}
      onClick={() => setOn(!on)}
    >
      <span className="domo-toggle__text domo-toggle__text--on" aria-hidden="true">
        {labels.on}
      </span>
      <span className="domo-toggle__text domo-toggle__text--off" aria-hidden="true">
        {labels.off}
      </span>
      <span className="domo-toggle__knob" aria-hidden="true" />
    </button>
  );
}
