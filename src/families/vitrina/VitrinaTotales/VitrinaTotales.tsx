import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import VitrinaPrecio from "../VitrinaPrecio/VitrinaPrecio";
import "../vitrina.scss";
import "./VitrinaTotales.scss";

export interface VitrinaTotalesProps {
  subtotal: number;
  /** Positivo: se resta y se pinta en verde. */
  descuento?: number;
  descuentoLabel?: string;
  /** Cifra, "gratis" o "pendiente" (todavía no hay dirección). */
  envio: number | "gratis" | "pendiente";
  total: number;
  /** El input de cupón con su botón, encima de la línea del total. */
  cupon?: ReactNode;
  /** Letra chica bajo el total ("IVA incluido"). */
  nota?: ReactNode;
  className?: string;
}

/**
 * Totales VITRINA: la tabla con filetes de la referencia — subtotal,
 * descuento, envío, total. Es un <dl>; el total va grande y es lo único
 * que brilla en la mitad de transacción.
 */
export default function VitrinaTotales({ subtotal, descuento, descuentoLabel = "Descuento", envio, total, cupon, nota, className }: VitrinaTotalesProps) {
  return (
    <div className={cx("vitrina-totales", className)}>
      {cupon && <div className="vitrina-totales__cupon">{cupon}</div>}
      <dl className="vitrina-totales__lista">
        <div className="vitrina-totales__fila">
          <dt>Subtotal</dt>
          <dd>
            <VitrinaPrecio valor={subtotal} tamano="sm" />
          </dd>
        </div>
        {descuento !== undefined && descuento > 0 && (
          <div className="vitrina-totales__fila vitrina-totales__fila--descuento">
            <dt>{descuentoLabel}</dt>
            <dd>
              <span aria-hidden="true">−</span>
              <VitrinaPrecio valor={descuento} tamano="sm" />
            </dd>
          </div>
        )}
        <div className="vitrina-totales__fila">
          <dt>Envío</dt>
          <dd>{envio === "gratis" ? <span className="vitrina-totales__gratis">Gratis</span> : envio === "pendiente" ? <span className="vitrina-totales__pendiente">Se calcula con la dirección</span> : <VitrinaPrecio valor={envio} tamano="sm" />}</dd>
        </div>
        <div className="vitrina-totales__fila vitrina-totales__fila--total">
          <dt>Total</dt>
          <dd>
            <VitrinaPrecio valor={total} tamano="total" />
          </dd>
        </div>
      </dl>
      {nota && <p className="vitrina-totales__nota">{nota}</p>}
    </div>
  );
}
