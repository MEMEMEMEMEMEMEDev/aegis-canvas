import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import Portal from "../../../overlay/Portal";
import { useDismiss } from "../../../behaviors/useDismiss";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoSheet.scss";

export interface DomoSheetProps {
  open: boolean;
  onClose: () => void;
  /** Rótulo del diálogo (mayúsculas de instrumento). */
  title: string;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Sheet DOMO: el modal de la familia — hoja que sube desde abajo en móvil
 * y diálogo centrado en desktop. Escape / clic fuera cierran (useDismiss),
 * el foco entra al panel al abrir. Es la pieza que permite formularios de
 * UNA sola vista: lo secundario vive aquí, no scroll abajo.
 */
export default function DomoSheet({
  open,
  onClose,
  title,
  footer,
  className,
  children,
}: DomoSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useDismiss({
    active: open,
    refs: [panelRef],
    onDismiss: () => onClose(),
  });

  // Al abrir: foco al panel y scroll de fondo congelado.
  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <div className="domo-sheet">
        <div className="domo-sheet__backdrop" aria-hidden="true" />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cx("domo-scope", "domo-sheet__panel", className)}
        >
          <header className="domo-sheet__head">
            <h2 className="domo-sheet__title" id={titleId}>
              {title}
            </h2>
            <button
              type="button"
              className="domo-sheet__close"
              aria-label="Cerrar"
              onClick={onClose}
            >
              ✕
            </button>
          </header>
          <div className="domo-sheet__body">{children}</div>
          {footer && <footer className="domo-sheet__foot">{footer}</footer>}
        </div>
      </div>
    </Portal>
  );
}
