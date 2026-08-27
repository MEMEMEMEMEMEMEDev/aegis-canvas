import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import type { CalcoTono } from "../CalcoLienzo/CalcoLienzo";
import "../calco.scss";
import "./CalcoHoja.scss";

export interface CalcoHojaProps {
  abierta: boolean;
  onCerrar: () => void;
  titulo: ReactNode;
  kana?: string;
  tono?: CalcoTono;
  /** Hasta dónde sube: media pantalla o casi entera. */
  alto?: "medio" | "alto";
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * La hoja: el panel que sube desde el borde de abajo, el gesto más de app
 * que existe. En un teléfono es donde se abre lo que no cabe en la
 * pantalla de inicio; en escritorio es lo mismo, más estrecho y centrado.
 *
 * Es un <dialog> de verdad y se abre con showModal(): el foco atrapado, el
 * fondo inerte y Escape para cerrar vienen de serie, y ninguna de las tres
 * cosas suele estar bien hecha cuando se escribe a mano. Pulsar el telón
 * cierra; el asa de arriba es dibujo, no un control.
 */
export default function CalcoHoja({
  abierta,
  onCerrar,
  titulo,
  kana,
  tono = "crema",
  alto = "medio",
  id,
  className,
  children,
}: CalcoHojaProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (abierta && !dialogo.open) dialogo.showModal();
    if (!abierta && dialogo.open) dialogo.close();
  }, [abierta]);

  // El clic en el telón cae en el propio <dialog> (el ::backdrop no recibe
  // eventos); un clic dentro de la hoja cae en un hijo. Con eso basta.
  function telon(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === ref.current) onCerrar();
  }

  return (
    <dialog
      ref={ref}
      id={id}
      className={cx("calco-hoja", `calco-hoja--${tono}`, `calco-hoja--${alto}`, className)}
      onClose={onCerrar}
      onClick={telon}
      aria-labelledby={id ? `${id}-titulo` : undefined}
    >
      <div className="calco-hoja__panel">
        <span className="calco-hoja__asa" aria-hidden="true" />

        <div className="calco-hoja__barra">
          <span className="calco-hoja__puntos" aria-hidden="true" />
          <h2 className="calco-hoja__titulo" id={id ? `${id}-titulo` : undefined}>
            {titulo}
          </h2>
          {kana && (
            <span className="calco-hoja__kana" aria-hidden="true">
              {kana}
            </span>
          )}
          <button type="button" className="calco-hoja__cerrar" onClick={onCerrar} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="calco-hoja__cuerpo">{children}</div>
      </div>
    </dialog>
  );
}
