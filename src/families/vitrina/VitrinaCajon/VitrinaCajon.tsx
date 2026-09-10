import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCajon.scss";

export interface VitrinaCajonProps {
  abierto: boolean;
  onCerrar: () => void;
  titulo: ReactNode;
  /** Por dónde entra en escritorio; en el teléfono siempre sube desde abajo. */
  lado?: "der" | "abajo";
  /** Lo que va fijo al pie: el total y el botón de pagar. */
  pie?: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Cajón VITRINA: el panel que se abre desde el borde — la cesta en
 * escritorio, los filtros o la cesta en el teléfono. Es un <dialog> de
 * verdad abierto con showModal(): foco atrapado, fondo inerte, Escape y
 * el retorno del foco al botón que lo abrió vienen de serie. Cabecera
 * fija, cuerpo con su propio scroll, pie fijo. Pulsar el telón cierra.
 */
export default function VitrinaCajon({ abierto, onCerrar, titulo, lado = "der", pie, id, className, children }: VitrinaCajonProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  function telon(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) onCerrar();
  }

  const tituloId = id ? `${id}-titulo` : undefined;

  return (
    <dialog ref={ref} id={id} className={cx("vitrina-scope", "vitrina-cajon", `vitrina-cajon--${lado}`, className)} onClose={onCerrar} onClick={telon} aria-labelledby={tituloId}>
      <div className="vitrina-cajon__panel">
        <div className="vitrina-cajon__cabecera">
          <span className="vitrina-cajon__asa" aria-hidden="true" />
          <h2 className="vitrina-cajon__titulo" id={tituloId}>
            {titulo}
          </h2>
          <button type="button" className="vitrina-cajon__cerrar" onClick={onCerrar} aria-label="Cerrar">
            <VitrinaPicto name="cerrar" />
          </button>
        </div>
        <div className="vitrina-cajon__cuerpo">{children}</div>
        {pie && <div className="vitrina-cajon__pie">{pie}</div>}
      </div>
    </dialog>
  );
}
