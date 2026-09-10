import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useFieldProps } from "../../../primitives/Field/Field";
import Input from "../../../primitives/Input/Input";
import type { InputProps } from "../../../primitives/Input/Input";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaEntrada.scss";

export interface VitrinaEntradaAccion {
  icono: ReactNode;
  label: string;
  onClick: () => void;
}

interface Adorno {
  /** caja (borde de un pelo, radio pequeño) o linea (solo la línea de abajo). */
  modo?: "caja" | "linea";
  /** Pictograma a la izquierda. */
  icono?: ReactNode;
  /** Botón a la derecha: el ojo de la contraseña, la ✕ de limpiar. */
  accion?: VitrinaEntradaAccion;
}

function Marco({ modo = "caja", icono, accion, invalid, className, children }: Adorno & { invalid?: boolean; className?: string; children: ReactNode }) {
  return (
    <span className={cx("vitrina-entrada", `vitrina-entrada--${modo}`, Boolean(icono) && "vitrina-entrada--con-icono", Boolean(accion) && "vitrina-entrada--con-accion", invalid && "is-invalid", className)}>
      {icono && (
        <span className="vitrina-entrada__icono" aria-hidden="true">
          {icono}
        </span>
      )}
      {children}
      {accion && (
        <button type="button" className="vitrina-entrada__accion" onClick={accion.onClick} aria-label={accion.label}>
          {accion.icono}
        </button>
      )}
    </span>
  );
}

export interface VitrinaEntradaProps extends InputProps, Adorno {}

/**
 * Entrada VITRINA: la piel del Input headless en dos voces. `caja` es la
 * de la tienda (borde de un pelo, radio pequeño, 44 px). `linea` es la del
 * checkout de la referencia 02: sin caja, solo la línea de abajo, y el
 * foco la engorda. Dentro de <VitrinaCampo> queda cableado solo.
 */
const VitrinaEntrada = forwardRef<HTMLInputElement, VitrinaEntradaProps>(function VitrinaEntrada({ modo, icono, accion, className, invalid, ...rest }, ref) {
  const field = useFieldProps({ invalid });
  return (
    <Marco modo={modo} icono={icono} accion={accion} invalid={Boolean(field["aria-invalid"])} className={className}>
      <Input ref={ref} className="vitrina-entrada__control" invalid={invalid} {...rest} />
    </Marco>
  );
});

export default VitrinaEntrada;

export interface VitrinaAreaProps extends ComponentPropsWithoutRef<"textarea">, Adorno {
  invalid?: boolean;
}

/** La misma piel, para un <textarea>. */
export const VitrinaArea = forwardRef<HTMLTextAreaElement, VitrinaAreaProps>(function VitrinaArea({ modo, icono, accion, className, invalid, disabled, required, id, ...rest }, ref) {
  const field = useFieldProps({ invalid, disabled, required, id });
  return (
    <Marco modo={modo} icono={icono} accion={accion} invalid={Boolean(field["aria-invalid"])} className={cx("vitrina-entrada--area", className)}>
      <textarea ref={ref} className="vitrina-entrada__control vitrina-entrada__control--area" rows={4} {...field} {...rest} />
    </Marco>
  );
});

export interface VitrinaSelectProps extends ComponentPropsWithoutRef<"select">, Adorno {
  invalid?: boolean;
}

/** La misma piel, para un <select> nativo (con su chevrón dibujado). */
export const VitrinaSelect = forwardRef<HTMLSelectElement, VitrinaSelectProps>(function VitrinaSelect({ modo, icono, className, invalid, disabled, required, id, children, ...rest }, ref) {
  const field = useFieldProps({ invalid, disabled, required, id });
  return (
    <Marco modo={modo} icono={icono} invalid={Boolean(field["aria-invalid"])} className={cx("vitrina-entrada--select", className)}>
      <select ref={ref} className="vitrina-entrada__control vitrina-entrada__control--select" {...field} {...rest}>
        {children}
      </select>
      <span className="vitrina-entrada__chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9l7 7 7-7" />
        </svg>
      </span>
    </Marco>
  );
});
