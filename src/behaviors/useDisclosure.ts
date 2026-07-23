import { useCallback } from "react";
import { useControllableState } from "./useControllableState";

export interface UseDisclosureOptions {
  /** Estado controlado. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DisclosureApi {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Estado abierto/cerrado con API explícita — motor de menús, popovers,
 * modales, acordeones… Controlable desde fuera vía `open`/`onOpenChange`.
 */
export function useDisclosure({
  open,
  defaultOpen = false,
  onOpenChange,
}: UseDisclosureOptions = {}): DisclosureApi {
  const [isOpen = false, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const doOpen = useCallback(() => setOpen(true), [setOpen]);
  const doClose = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  return { isOpen, open: doOpen, close: doClose, toggle };
}
