import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { cx } from "../../../utils/cx";
import { IconoCerrar } from "../iconos";
import "../baliza.scss";
import "./BalizaDialogo.scss";

export interface BalizaDialogoProps {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  /** Una línea bajo el título. */
  sub?: ReactNode;
  children: ReactNode;
  /** Botones del pie. */
  acciones?: ReactNode;
  /** `sos` pinta el borde rojo: el diálogo trata una emergencia en curso. */
  tono?: "normal" | "sos";
  className?: string;
}

/**
 * Diálogo modal sobre <dialog> nativo + showModal(): foco atrapado, Escape,
 * capa superior y el resto de la página inerte, sin reimplementar nada.
 * Controlado: lo abre y lo cierra quien lo usa.
 */
export default function BalizaDialogo({ abierto, onCerrar, titulo, sub, children, acciones, tono = "normal", className }: BalizaDialogoProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  return (
    <dialog
      ref={ref}
      className={cx("baliza-dialogo", `baliza-dialogo--${tono}`, className)}
      aria-labelledby={`${id}-t`}
      onCancel={(e) => { e.preventDefault(); onCerrar(); }}
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
    >
      <div className="baliza-dialogo__caja">
        <header className="baliza-dialogo__cabeza">
          <h2 id={`${id}-t`} className="baliza-dialogo__titulo">{titulo}</h2>
          {sub && <p className="baliza-dialogo__sub">{sub}</p>}
        </header>
        <div className="baliza-dialogo__cuerpo">{children}</div>
        {acciones && <footer className="baliza-dialogo__pie">{acciones}</footer>}
        {/* La X va ÚLTIMA en el DOM (arriba a la derecha por CSS): showModal()
            enfoca lo primero enfocable, y quien abre un diálogo quiere
            escribir o decidir, no cerrar. */}
        <button type="button" className="baliza-dialogo__cerrar" onClick={onCerrar} aria-label="Cerrar">
          <IconoCerrar />
        </button>
      </div>
    </dialog>
  );
}
