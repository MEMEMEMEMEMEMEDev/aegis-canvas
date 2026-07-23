import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface FieldContextValue {
  id?: string;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  describedBy?: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Contexto crudo del Field envolvente (o null si no hay). */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

/** Props DOM listas para esparcir en cualquier control nativo. */
export interface FieldControlProps {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-invalid"?: "true";
  "aria-describedby"?: string;
}

/**
 * Props DOM listas para esparcir en cualquier control (`<input {...props}>`):
 * id, disabled, required, aria-invalid y aria-describedby, resueltos desde el
 * Field envolvente. Los overrides explícitos siempre ganan al contexto.
 * Es lo que hace que CUALQUIER control puesto dentro de <Field> quede
 * accesible sin cablear nada a mano.
 */
export function useFieldProps(overrides: FieldContextValue = {}): FieldControlProps {
  const ctx = useFieldContext() ?? {};
  const invalid = overrides.invalid ?? ctx.invalid;
  const disabled = overrides.disabled ?? ctx.disabled;
  const required = overrides.required ?? ctx.required;
  return {
    id: overrides.id ?? ctx.id,
    disabled: disabled || undefined,
    required: required || undefined,
    "aria-invalid": invalid ? "true" : undefined,
    "aria-describedby": overrides.describedBy ?? ctx.describedBy,
  };
}

export interface FieldProps {
  label?: string;
  hint?: string;
  /** Si existe, el campo queda aria-invalid y el error reemplaza al hint. */
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Envoltorio de campo: label + control + hint o error (excluyentes; el error
 * gana y se anuncia con role="alert"). Cablea ids y aria vía contexto.
 */
export default function Field({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  id: idProp,
  className,
  children,
}: FieldProps) {
  const autoId = useId();
  const id = idProp ?? `ds-field-${autoId}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const invalid = Boolean(error);

  return (
    <div
      className={cx(
        "ds-field",
        invalid && "is-invalid",
        disabled && "is-disabled",
        className,
      )}
    >
      {label && (
        <label className="ds-field__label" htmlFor={id}>
          {label}
          {required && (
            <span className="ds-field__required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <FieldContext.Provider
        value={{
          id,
          invalid,
          disabled,
          required,
          describedBy: invalid ? errorId : hintId,
        }}
      >
        {children}
      </FieldContext.Provider>
      {invalid ? (
        <p className="ds-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="ds-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
