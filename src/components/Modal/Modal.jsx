import { useEffect, useRef, useCallback } from "react";
import Portal from "../../overlay/Portal";
import "./Modal.scss";

/**
 * Accessible modal dialog. Portals to the shared overlay root so it always
 * covers the real viewport, regardless of where it's called from (any MFE,
 * any nesting, even inside transformed/clipped parents).
 *
 * @param {object}   props
 * @param {boolean}  props.open
 * @param {() => void} props.onClose
 * @param {string}   [props.title]
 * @param {boolean}  [props.fullscreen=false]
 * @param {boolean}  [props.closeOnBackdrop=true]
 * @param {boolean}  [props.closeOnEsc=true]
 */
export default function Modal({
  open,
  onClose,
  children,
  title,
  fullscreen = false,
  closeOnBackdrop = true,
  closeOnEsc = true,
  className = "",
}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  // Esc to close.
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Minimal focus trap.
  const onKeyDown = useCallback((e) => {
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  if (!open) return null;

  return (
    <Portal>
      <div
        className="ds-modal"
        role="presentation"
        onMouseDown={(e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
        }}
      >
        <div
          ref={panelRef}
          className={`ds-modal__panel ${fullscreen ? "ds-modal__panel--full" : ""} ${className}`.trim()}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {title && (
            <header className="ds-modal__header">
              <h3 className="ds-modal__title">{title}</h3>
              <button
                type="button"
                className="ds-modal__close"
                aria-label="Cerrar"
                onClick={onClose}
              >
                ✕
              </button>
            </header>
          )}
          <div className="ds-modal__body">{children}</div>
        </div>
      </div>
    </Portal>
  );
}
