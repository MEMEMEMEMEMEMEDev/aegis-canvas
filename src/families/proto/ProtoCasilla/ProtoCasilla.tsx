import { useId, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import { IconoCheck } from "../iconos";
import "../proto.scss";
import "./ProtoCasilla.scss";

export interface ProtoCasillaProps {
  marcada: boolean;
  onCambio: (marcada: boolean) => void;
  children: ReactNode;
  /** Letra chica bajo la etiqueta: para qué se usa lo que se acepta. */
  detalle?: ReactNode;
  requerida?: boolean;
  className?: string;
}

/**
 * Una casilla de verdad (input checkbox). Para el consentimiento: cada uso
 * de los datos es una casilla aparte y ninguna viene marcada (Ley 21.719:
 * el consentimiento es libre, específico e informado).
 */
export default function ProtoCasilla({ marcada, onCambio, children, detalle, requerida = false, className }: ProtoCasillaProps) {
  const id = useId();
  return (
    <div className={cx("proto-casilla", className)}>
      <input
        id={id}
        type="checkbox"
        className="proto-casilla__input"
        checked={marcada}
        required={requerida}
        aria-describedby={detalle ? `${id}-detalle` : undefined}
        onChange={(e) => onCambio(e.target.checked)}
      />
      <span className="proto-casilla__caja" aria-hidden="true">{marcada && <IconoCheck tamano={16} />}</span>
      <div className="proto-casilla__texto">
        <label htmlFor={id} className="proto-casilla__etiqueta">{children}</label>
        {detalle && <p id={`${id}-detalle`} className="proto-casilla__detalle">{detalle}</p>}
      </div>
    </div>
  );
}
