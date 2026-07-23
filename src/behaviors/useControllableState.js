import { useCallback, useRef, useState } from "react";

/**
 * Estado dual controlado/no-controlado — la base de TODO componente del sistema.
 * Si `value` viene definido, el componente es controlado (el padre manda);
 * si no, mantiene estado interno inicializado con `defaultValue`.
 * `onChange` se dispara siempre, en ambos modos.
 *
 * Este contrato es el que permite que un agente de AI (o cualquier código)
 * maneje un componente por completo desde fuera, igual que un humano.
 *
 * @param {object} opts
 * @param {*} [opts.value]        valor controlado (undefined = no controlado)
 * @param {*} [opts.defaultValue] valor inicial en modo no controlado
 * @param {(next: *) => void} [opts.onChange]
 * @returns {[*, (next: *) => void]}
 */
export function useControllableState({ value, defaultValue, onChange } = {}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const set = useCallback(
    (next) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, set];
}
