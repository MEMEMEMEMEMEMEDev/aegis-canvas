import { useCallback, useRef, useState } from "react";

export interface UseControllableStateOptions<T> {
  /** Valor controlado (undefined = modo no controlado). */
  value?: T;
  /** Valor inicial en modo no controlado. */
  defaultValue?: T;
  /** Se dispara siempre, en ambos modos. */
  onChange?: (next: T) => void;
}

/**
 * Estado dual controlado/no-controlado — la base de TODO componente del sistema.
 * Si `value` viene definido, el componente es controlado (el padre manda);
 * si no, mantiene estado interno inicializado con `defaultValue`.
 *
 * Este contrato es el que permite que un agente de AI (o cualquier código)
 * maneje un componente por completo desde fuera, igual que un humano.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T> = {}): [T | undefined, (next: T) => void] {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, set];
}
