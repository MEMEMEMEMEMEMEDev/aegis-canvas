import { useId } from "react";
import type { ReactNode } from "react";
import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaOpcion.scss";

export interface VitrinaOpcionProps {
  /** radio (uno de varios), casilla (sí/no) o interruptor (ajustes). */
  tipo?: "radio" | "casilla" | "interruptor";
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label: ReactNode;
  /** La segunda línea: "Llega en 3 a 5 días hábiles". */
  detalle?: ReactNode;
  /** Lo que va a la derecha: el precio del envío, el logo del medio de pago. */
  derecha?: ReactNode;
  /** Pictograma delante del texto. */
  icono?: ReactNode;
  disabled?: boolean;
  /** Con marco (la fila de checkout) o desnuda (una casilla suelta). */
  marco?: boolean;
  className?: string;
}

/**
 * Opción VITRINA: la fila que se elige. Radio o casilla nativos (ocultos,
 * dibujados encima) con label, detalle y lo que vaya a la derecha —
 * "Envío express · $4.990", el logo de la tarjeta. El interruptor es la
 * misma fila con un checkbox role="switch": nativo, controlable desde
 * fuera, y el estado lo cuenta la posición de la perilla.
 */
export default function VitrinaOpcion({ tipo = "radio", name, value, checked, defaultChecked = false, onChange, label, detalle, derecha, icono, disabled = false, marco = true, className }: VitrinaOpcionProps) {
  const id = useId();
  const [on = false, setOn] = useControllableState<boolean>({ value: checked, defaultValue: defaultChecked, onChange });

  return (
    <label
      htmlFor={id}
      className={cx("vitrina-opcion", `vitrina-opcion--${tipo}`, marco && "vitrina-opcion--marco", on && "is-on", disabled && "is-disabled", className)}
    >
      <input
        id={id}
        className="vitrina-opcion__nativo"
        type={tipo === "radio" ? "radio" : "checkbox"}
        role={tipo === "interruptor" ? "switch" : undefined}
        name={name}
        value={value}
        checked={on}
        disabled={disabled}
        onChange={(e) => setOn(e.target.checked)}
      />
      {tipo !== "interruptor" && (
        <span className="vitrina-opcion__control" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        </span>
      )}
      {icono && (
        <span className="vitrina-opcion__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      <span className="vitrina-opcion__texto">
        <span className="vitrina-opcion__label">{label}</span>
        {detalle && <span className="vitrina-opcion__detalle">{detalle}</span>}
      </span>
      {derecha && <span className="vitrina-opcion__derecha">{derecha}</span>}
      {tipo === "interruptor" && (
        <span className="vitrina-opcion__perilla" aria-hidden="true">
          <span className="vitrina-opcion__perilla-bola" />
        </span>
      )}
    </label>
  );
}

export interface VitrinaOpcionGrupoProps {
  leyenda: ReactNode;
  /** Ayuda bajo la leyenda. */
  hint?: ReactNode;
  error?: string | null;
  /** Filas pegadas (una lista de envío) o sueltas (casillas). */
  pegadas?: boolean;
  className?: string;
  children: ReactNode;
}

/** El grupo: un fieldset con su leyenda en micro. */
export function VitrinaOpcionGrupo({ leyenda, hint, error, pegadas = true, className, children }: VitrinaOpcionGrupoProps) {
  const id = useId();
  return (
    <fieldset className={cx("vitrina-opcion-grupo", pegadas && "vitrina-opcion-grupo--pegadas", error && "is-invalid", className)} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="vitrina-opcion-grupo__leyenda">{leyenda}</legend>
      {hint && <p className="vitrina-opcion-grupo__hint">{hint}</p>}
      <div className="vitrina-opcion-grupo__filas">{children}</div>
      {error && (
        <p className="vitrina-opcion-grupo__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
