import { useRef, useState } from "react";

/**
 * Navegación de listas (menús, listboxes, tabs, comandos): índice activo con
 * wrap, salto de items deshabilitados, Home/End y typeahead con buffer de
 * 600 ms. Es el motor compartido de todo widget con opciones — la piel decide
 * cómo se ve "activo"; esto decide QUÉ está activo.
 *
 * @param {object} opts
 * @param {Array} opts.items
 * @param {(item: *) => boolean} [opts.isDisabled]
 * @param {(item: *) => string} [opts.getLabel]  texto usado por el typeahead
 */
export function useListNavigation({
  items,
  isDisabled = (item) => Boolean(item?.disabled),
  getLabel = (item) => String(item?.label ?? item ?? ""),
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const bufferRef = useRef({ text: "", at: 0 });

  /** Avanza `delta` posiciones desde `from` (wrap, salta disabled). */
  const move = (delta, from = activeIndex) => {
    if (!items.length) return -1;
    let i = from;
    for (let step = 0; step < items.length; step++) {
      i = (i + delta + items.length) % items.length;
      if (!isDisabled(items[i])) {
        setActiveIndex(i);
        return i;
      }
    }
    return -1;
  };

  const first = () => move(1, -1);
  const last = () => move(-1, 0);

  /** Acumula caracteres (<600 ms entre sí) y salta al primer label que calce. */
  const typeahead = (char) => {
    const now = Date.now();
    const b = bufferRef.current;
    b.text = now - b.at < 600 ? b.text + char.toLowerCase() : char.toLowerCase();
    b.at = now;

    // Con 1 carácter busca DESPUÉS del activo (ciclar entre "a", "a"…);
    // con más caracteres busca DESDE el activo (refinar el match actual).
    const start = activeIndex < 0 ? 0 : activeIndex + (b.text.length === 1 ? 1 : 0);
    for (let step = 0; step < items.length; step++) {
      const i = (start + step) % items.length;
      if (isDisabled(items[i])) continue;
      if (getLabel(items[i]).toLowerCase().startsWith(b.text)) {
        setActiveIndex(i);
        return i;
      }
    }
    return -1;
  };

  return { activeIndex, setActiveIndex, move, first, last, typeahead };
}
