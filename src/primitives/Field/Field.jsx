import { createContext, useContext, useId } from "react";
import { cx } from "../../utils/cx";

const FieldContext = createContext(null);

/** Contexto crudo del Field envolvente (o null si no hay). */
export function useFieldContext() {
  return useContext(FieldContext);
}

/**
 * Props DOM listas para esparcir en cualquier control (`<input {...props}>`):
 * id, disabled, required, aria-invalid y aria-describedby, resueltos desde el
 * Field envolvente. Los overrides explícitos siempre ganan al contexto.
 * Es lo que hace que CUALQUIER control puesto dentro de <Field> quede
 * accesible sin cablear nada a mano.
 */
export function useFieldProps(overrides = {}) {
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

/**
 * Envoltorio de campo: label + control + hint o error (excluyentes; el error
 * gana y se anuncia con role="alert"). Cablea ids y aria vía contexto.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.hint]
 * @param {string} [props.error]  si existe, el campo queda aria-invalid
 * @param {boolean} [props.required]
 * @param {boolean} [props.disabled]
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
}) {
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
