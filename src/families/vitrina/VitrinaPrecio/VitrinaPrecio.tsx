import { cx } from "../../../utils/cx";
import { clp, clpTexto, descuento } from "./formato";
import "../vitrina.scss";
import "./VitrinaPrecio.scss";

export interface VitrinaPrecioProps {
  /** CLP, entero. */
  valor: number;
  /** El precio anterior: tachado, y el porcentaje al lado. */
  antes?: number;
  tamano?: "sm" | "md" | "lg" | "total";
  /** Color del valor: tinta (default) o coral-tinta (el total que brilla). */
  tono?: "tinta" | "coral";
  className?: string;
}

/**
 * Precio VITRINA: cifras de tabla, punto de miles, y si hay oferta el
 * precio anterior tachado en suave con el porcentaje en coral de texto. El
 * lector de pantalla oye "12.990 pesos, antes 15.990, 19 % de descuento" y
 * no una sopa de símbolos.
 */
export default function VitrinaPrecio({ valor, antes, tamano = "md", tono = "tinta", className }: VitrinaPrecioProps) {
  const oferta = antes !== undefined && antes > valor;
  const sr = oferta
    ? `${clpTexto(valor)}, antes ${clpTexto(antes)}, ${descuento(valor, antes)} % de descuento`
    : clpTexto(valor);

  return (
    <span className={cx("vitrina-precio", `vitrina-precio--${tamano}`, `vitrina-precio--${tono}`, className)}>
      <span className="vitrina-precio__sr">{sr}</span>
      <span className="vitrina-precio__valor" aria-hidden="true">
        {clp(valor)}
      </span>
      {oferta && (
        <>
          <s className="vitrina-precio__antes" aria-hidden="true">
            {clp(antes)}
          </s>
          <span className="vitrina-precio__desc" aria-hidden="true">
            -{descuento(valor, antes)}%
          </span>
        </>
      )}
    </span>
  );
}
