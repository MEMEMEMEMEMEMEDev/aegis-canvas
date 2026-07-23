import { useRef, useState } from "react";

export interface UseListNavigationOptions<T> {
  items: readonly T[];
  isDisabled?: (item: T) => boolean;
  /** Texto usado por el typeahead. */
  getLabel?: (item: T) => string;
}

export interface ListNavigationApi {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  /** Avanza `delta` posiciones desde `from` (wrap, salta disabled). */
  move: (delta: number, from?: number) => number;
  first: () => number;
  last: () => number;
  /** Acumula caracteres (<600 ms entre sí) y salta al primer label que calce. */
  typeahead: (char: string) => number;
}

/**
 * Navegación de listas (menús, listboxes, tabs, comandos): índice activo con
 * wrap, salto de items deshabilitados, Home/End y typeahead. Es el motor
 * compartido de todo widget con opciones — la piel decide cómo se ve
 * "activo"; esto decide QUÉ está activo.
 */
export function useListNavigation<T>({
  items,
  isDisabled = (item) => Boolean((item as { disabled?: boolean } | null)?.disabled),
  getLabel = (item) => String((item as { label?: unknown } | null)?.label ?? item ?? ""),
}: UseListNavigationOptions<T>): ListNavigationApi {
  const [activeIndex, setActiveIndex] = useState(-1);
  const bufferRef = useRef({ text: "", at: 0 });

  const move = (delta: number, from: number = activeIndex): number => {
    if (!items.length) return -1;
    let i = from;
    for (let step = 0; step < items.length; step++) {
      i = (i + delta + items.length) % items.length;
      const item = items[i];
      if (item !== undefined && !isDisabled(item)) {
        setActiveIndex(i);
        return i;
      }
    }
    return -1;
  };

  const first = () => move(1, -1);
  const last = () => move(-1, 0);

  const typeahead = (char: string): number => {
    const now = Date.now();
    const b = bufferRef.current;
    b.text = now - b.at < 600 ? b.text + char.toLowerCase() : char.toLowerCase();
    b.at = now;

    // Con 1 carácter busca DESPUÉS del activo (ciclar entre "a", "a"…);
    // con más caracteres busca DESDE el activo (refinar el match actual).
    const start = activeIndex < 0 ? 0 : activeIndex + (b.text.length === 1 ? 1 : 0);
    for (let step = 0; step < items.length; step++) {
      const i = (start + step) % items.length;
      const item = items[i];
      if (item === undefined || isDisabled(item)) continue;
      if (getLabel(item).toLowerCase().startsWith(b.text)) {
        setActiveIndex(i);
        return i;
      }
    }
    return -1;
  };

  return { activeIndex, setActiveIndex, move, first, last, typeahead };
}
