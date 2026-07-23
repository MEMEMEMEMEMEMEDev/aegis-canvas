import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { getOverlayRoot } from "./overlayRoot";

/**
 * Portal React hacia el overlay root compartido del design system.
 */
export default function Portal({ children }: { children: ReactNode }) {
  const root = getOverlayRoot();
  return root ? createPortal(children, root) : null;
}
