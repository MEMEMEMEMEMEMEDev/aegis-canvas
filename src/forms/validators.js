/**
 * Validators — tiny, composable, framework-free.
 *
 * Each factory returns `(value) => string | null`: the error message when
 * invalid, `null` when valid. Designed to plug into `useField`, but usable
 * anywhere (they're pure functions).
 *
 *   import { validators } from "@ahroi/foundation";
 *   const rules = [validators.required(), validators.email()];
 *
 * Convention: every validator except `required` passes on empty values —
 * combine with `required()` when the field is mandatory. That way optional
 * fields only validate once the user types something.
 */

const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0);

export const required =
  (message = "Este campo es obligatorio") =>
  (value) =>
    isEmpty(value) ? message : null;

export const email =
  (message = "Correo electrónico inválido") =>
  (value) =>
    isEmpty(value) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ? null
      : message;

export const minLength =
  (n, message = `Mínimo ${n} caracteres`) =>
  (value) =>
    isEmpty(value) || String(value).length >= n ? null : message;

export const maxLength =
  (n, message = `Máximo ${n} caracteres`) =>
  (value) =>
    isEmpty(value) || String(value).length <= n ? null : message;

export const pattern =
  (re, message = "Formato inválido") =>
  (value) =>
    isEmpty(value) || re.test(value) ? null : message;

export const min =
  (n, message = `Debe ser ≥ ${n}`) =>
  (value) =>
    isEmpty(value) || Number(value) >= n ? null : message;

export const max =
  (n, message = `Debe ser ≤ ${n}`) =>
  (value) =>
    isEmpty(value) || Number(value) <= n ? null : message;

export const url =
  (message = "URL inválida") =>
  (value) => {
    if (isEmpty(value)) return null;
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:"
        ? null
        : message;
    } catch {
      return message;
    }
  };

/** Custom rule: `matches(v => v === other, "No coincide")`. */
export const matches =
  (predicate, message = "Valor inválido") =>
  (value) =>
    isEmpty(value) || predicate(value) ? null : message;

/** Run validators in order, return the first error (or null). */
export const compose =
  (...fns) =>
  (value) => {
    for (const fn of fns) {
      const error = fn(value);
      if (error) return error;
    }
    return null;
  };
