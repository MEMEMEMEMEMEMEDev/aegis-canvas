import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaBoton from "../VitrinaBoton/VitrinaBoton";
import "../vitrina.scss";
import "./VitrinaDialogo.scss";

export interface VitrinaDialogoProps {
  abierto: boolean;
  titulo: ReactNode;
  detalle?: ReactNode;
  confirmar?: string;
  cancelar?: string;
  /** La acción destruye algo: el botón de confirmar va en rojo. */
  peligro?: boolean;
  cargando?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
  id?: string;
  className?: string;
}

/**
 * Diálogo VITRINA: la pregunta antes de hacer algo que no se deshace —
 * quitar una dirección, cancelar un pedido, cerrar sesión. Un <dialog>
 * con showModal(); el foco arranca en Cancelar (la opción segura) y
 * Escape equivale a cancelar.
 */
export default function VitrinaDialogo({ abierto, titulo, detalle, confirmar = "Confirmar", cancelar = "Cancelar", peligro = false, cargando = false, onConfirmar, onCancelar, id, className }: VitrinaDialogoProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  function telon(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current && !cargando) onCancelar();
  }

  const tituloId = id ? `${id}-titulo` : undefined;

  return (
    <dialog ref={ref} id={id} className={cx("vitrina-scope", "vitrina-dialogo", className)} onClose={onCancelar} onClick={telon} aria-labelledby={tituloId}>
      <div className="vitrina-dialogo__panel">
        <h2 className="vitrina-dialogo__titulo" id={tituloId}>
          {titulo}
        </h2>
        {detalle && <p className="vitrina-dialogo__detalle">{detalle}</p>}
        <div className="vitrina-dialogo__acciones">
          <VitrinaBoton variant="outline" onClick={onCancelar} disabled={cargando} autoFocus>
            {cancelar}
          </VitrinaBoton>
          <VitrinaBoton variant={peligro ? "danger" : "solid"} tono="tinta" onClick={onConfirmar} loading={cargando}>
            {confirmar}
          </VitrinaBoton>
        </div>
      </div>
    </dialog>
  );
}
