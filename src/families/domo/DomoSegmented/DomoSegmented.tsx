import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoSegmented.scss";

export interface DomoSegmentedOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DomoSegmentedProps {
  /** Opciones; un string vale como label y value a la vez. */
  options: ReadonlyArray<string | DomoSegmentedOption>;
  /** Valor controlado (undefined = no controlado). */
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  /** Nombre del dato para lectores de pantalla ("plazo", "zona"…). */
  label: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Control segmentado DOMO (el WEST | EAST de la referencia): radiogroup
 * en cápsula de borde fino, el segmento activo se entinta. Flechas para
 * moverse (roving tabindex), controlable desde fuera.
 */
export default function DomoSegmented({
  options,
  value,
  defaultValue,
  onChange,
  label,
  size = "md",
  className,
}: DomoSegmentedProps) {
  const items = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o,
  );
  const firstEnabled = items.find((o) => !o.disabled)?.value;
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? firstEnabled,
    onChange,
  });

  // Flechas: siguiente/anterior habilitado, con wrap (patrón radiogroup).
  // Selecciona Y mueve el foco al segmento nuevo (roving tabindex).
  const moveFrom = (group: HTMLElement | null, index: number, delta: 1 | -1) => {
    for (let step = 1; step <= items.length; step++) {
      const next = (index + delta * step + items.length * step) % items.length;
      const item = items[next];
      if (item && !item.disabled) {
        setCurrent(item.value);
        (group?.children[next] as HTMLElement | undefined)?.focus();
        return;
      }
    }
  };

  return (
    <div
      className={cx("domo-segmented", `domo-segmented--${size}`, className)}
      role="radiogroup"
      aria-label={label}
    >
      {items.map((item, i) => {
        const selected = item.value === current;
        // Roving tabindex: entra por el seleccionado; si no hay selección
        // (p. ej. controlado con ""), por el primer habilitado.
        const tabbable = selected || (!items.some((o) => o.value === current) && item.value === firstEnabled);
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabbable ? 0 : -1}
            disabled={item.disabled}
            className={cx("domo-segmented__seg", selected && "is-selected")}
            onClick={() => setCurrent(item.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                moveFrom(e.currentTarget.parentElement, i, 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                moveFrom(e.currentTarget.parentElement, i, -1);
              }
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
