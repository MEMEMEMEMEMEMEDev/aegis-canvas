import { useCallback } from "react";
import { useControllableState } from "./useControllableState";

/**
 * Estado abierto/cerrado con API explícita — motor de menús, popovers,
 * modales, acordeones… Controlable desde fuera vía `open`/`onOpenChange`.
 *
 * @param {object} opts
 * @param {boolean} [opts.open]         estado controlado
 * @param {boolean} [opts.defaultOpen=false]
 * @param {(open: boolean) => void} [opts.onOpenChange]
 */
export function useDisclosure({ open, defaultOpen = false, onOpenChange } = {}) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const doOpen = useCallback(() => setOpen(true), [setOpen]);
  const doClose = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  return { isOpen, open: doOpen, close: doClose, toggle };
}
