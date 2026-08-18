import type { ReactNode } from "react";
import PliegoBoton from "../PliegoBoton/PliegoBoton";
import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoAviso.scss";

export interface PliegoAvisoProps {
  /** La pregunta, grande. */
  pregunta: string;
  /** La letra pequeña de debajo. */
  detalle?: ReactNode;
  /** Rótulo del botón que confirma. */
  confirmar?: string;
  /** Rótulo del botón que cancela. Sin él, el aviso solo confirma. */
  cancelar?: string;
  /** Si confirmar navega, su URL — y entonces se pinta como enlace. */
  href?: string;
  /** Abre en otra pestaña. Solo tiene sentido con `href`. */
  externo?: boolean;
  onConfirmar?: () => void;
  onCancelar?: () => void;
  className?: string;
}

/**
 * La placa de confirmación: la pregunta a pantalla partida con sus dos teclas
 * — el gesto que cualquiera reconoce de un menú de juego.
 *
 * NO es un `<dialog>` ni atrapa el foco: es una PLACA, y quien la use decide
 * si va suelta en la página o dentro de un modal de verdad. Meterle
 * comportamiento de diálogo obligaría a que cada sitio que solo quiere la
 * pinta se trague también la trampa de foco.
 */
export default function PliegoAviso({
  pregunta,
  detalle,
  confirmar = "Sí",
  cancelar,
  href,
  externo = false,
  onConfirmar,
  onCancelar,
  className,
}: PliegoAvisoProps) {
  return (
    <div className={cx("pliego-aviso", className)}>
      <p className="pliego-aviso__pregunta">{pregunta}</p>

      {detalle && <div className="pliego-aviso__detalle">{detalle}</div>}

      <div className="pliego-aviso__teclas">
        {href ? (
          <a
            className="pliego-aviso__enlace"
            href={href}
            target={externo ? "_blank" : undefined}
            rel={externo ? "noopener noreferrer" : undefined}
            onClick={onConfirmar}
          >
            <span className="pliego-aviso__cursor" aria-hidden="true">
              ▶
            </span>
            {confirmar}
            {externo && (
              <span className="pliego-aviso__externo" aria-hidden="true">
                ↗
              </span>
            )}
          </a>
        ) : (
          <PliegoBoton tone="rosa" cursor onClick={onConfirmar}>
            {confirmar}
          </PliegoBoton>
        )}

        {cancelar && (
          <PliegoBoton variant="outline" cursor onClick={onCancelar}>
            {cancelar}
          </PliegoBoton>
        )}
      </div>
    </div>
  );
}
