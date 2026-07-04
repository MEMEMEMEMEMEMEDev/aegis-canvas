import { createPortal } from "react-dom";
import { getOverlayRoot } from "./overlayRoot";

/**
 * Renders its children into the shared body-level overlay root, escaping any
 * transformed / clipped / nested ancestor. Use for modals, drawers, toasts.
 */
export default function Portal({ children }) {
  const root = getOverlayRoot();
  if (!root) return null;
  return createPortal(children, root);
}
