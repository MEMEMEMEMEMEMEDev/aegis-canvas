import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaTitular.scss";

export interface VitrinaTitularProps {
  /** Etiqueta semántica. Default: h2 (h1 para "gigante" y "pagina" suele ser lo correcto). */
  as?: ElementType;
  /**
   * Las tres voces:
   *  - seccion: el h2 de una sección del catálogo, con "Ver todo →" a la derecha;
   *  - pagina: el h1 de una pantalla que navega (Onest, pesado, tamaño normal);
   *  - gigante: la palabra que grita en el checkout (Instrument Sans a 75 %).
   */
  tamano?: "seccion" | "pagina" | "gigante";
  /** Kicker en micro encima del titular ("Trending ahora", "Paso 2 de 4"). */
  sobre?: ReactNode;
  /** Solo en seccion: el enlace de la derecha. */
  accion?: { label: string; onClick: () => void };
  /** Color: tinta (default), bloque (blanco, para el footer) o coral (texto en coral-tinta). */
  tono?: "tinta" | "bloque" | "coral";
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Titular VITRINA: la pieza que cambia de voz según la mitad de la tienda
 * en la que estés. En el catálogo es un h2 educado con su "Ver todo"; al
 * pagar es UNA palabra en mayúsculas condensadas que ocupa el ancho — el
 * "CHECKOUT" de la referencia, hecho con un eje de anchura real y no con
 * una transformación.
 */
export default function VitrinaTitular({
  as,
  tamano = "seccion",
  sobre,
  accion,
  tono = "tinta",
  id,
  className,
  children,
}: VitrinaTitularProps) {
  const Tag: ElementType = as ?? (tamano === "seccion" ? "h2" : "h1");
  const titulo = (
    <Tag id={id} className={cx("vitrina-titular__texto", `vitrina-titular__texto--${tamano}`)}>
      {children}
    </Tag>
  );

  return (
    <div className={cx("vitrina-titular", `vitrina-titular--${tamano}`, `vitrina-titular--${tono}`, className)}>
      <div className="vitrina-titular__col">
        {sobre && <span className="vitrina-titular__sobre">{sobre}</span>}
        {titulo}
      </div>
      {tamano === "seccion" && accion && (
        <button type="button" className="vitrina-titular__accion" onClick={accion.onClick}>
          {accion.label}
          <span aria-hidden="true"> →</span>
        </button>
      )}
    </div>
  );
}
