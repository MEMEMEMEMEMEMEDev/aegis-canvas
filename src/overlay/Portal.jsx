import { createPortal } from "react-dom";
import { getOverlayRoot } from "./overlayRoot";

/**
 * Portal React hacia el overlay root compartido del design system.
 */
export default function Portal({ children }) {
  const root = getOverlayRoot();
  return root ? createPortal(children, root) : null;
}
