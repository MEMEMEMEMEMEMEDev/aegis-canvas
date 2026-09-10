import { cx } from "../../../utils/cx";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaCronologia.scss";

export interface VitrinaHito {
  id: string;
  label: string;
  fecha?: string;
  nota?: string;
  estado: "hecho" | "actual" | "pendiente";
}

export interface VitrinaCronologiaProps {
  hitos: VitrinaHito[];
  /** El pedido terminó mal: el último hito va en rojo y sin latido. */
  cancelado?: boolean;
  className?: string;
}

/**
 * Cronología VITRINA: la línea de tiempo vertical de un pedido. Puntos
 * rellenos hasta el actual (que late), los futuros en filete, y la fecha
 * de cada uno en letra chica. Es un <ol>: el orden ES la información.
 */
export default function VitrinaCronologia({ hitos, cancelado = false, className }: VitrinaCronologiaProps) {
  return (
    <ol className={cx("vitrina-cronologia", cancelado && "is-cancelada", className)}>
      {hitos.map((h) => (
        <li key={h.id} className={cx("vitrina-cronologia__hito", `is-${h.estado}`)} aria-current={h.estado === "actual" ? "step" : undefined}>
          <span className="vitrina-cronologia__punto" aria-hidden="true">
            {h.estado === "hecho" && <VitrinaPicto name="check" size={12} />}
            {h.estado === "actual" && cancelado && <VitrinaPicto name="cerrar" size={12} />}
          </span>
          <span className="vitrina-cronologia__cuerpo">
            <span className="vitrina-cronologia__label">
              {h.label}
              {h.estado === "actual" && <span className="vitrina-cronologia__sr"> (estado actual)</span>}
            </span>
            {h.fecha && <span className="vitrina-cronologia__fecha">{h.fecha}</span>}
            {h.nota && <span className="vitrina-cronologia__nota">{h.nota}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
