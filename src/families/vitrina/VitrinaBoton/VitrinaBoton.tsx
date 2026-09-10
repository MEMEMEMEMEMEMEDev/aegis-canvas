import { forwardRef } from "react";
import type { ReactNode } from "react";
import Button from "../../../primitives/Button/Button";
import type { ButtonProps } from "../../../primitives/Button/Button";
import { cx } from "../../../utils/cx";
import "../vitrina.scss";
import "./VitrinaBoton.scss";

export interface VitrinaBotonProps extends ButtonProps {
  /**
   * Relleno del solid: tinta (default), coral (el de COMPRAR: relleno coral
   * con tinta encima — blanco s/coral no pasa AA) o bloque (el CTA de
   * transacción: negro a todo ancho, mayúsculas pequeñas espaciadas).
   */
  tono?: "tinta" | "coral" | "bloque";
  /** Ocupa todo el ancho disponible. `bloque` lo hace siempre. */
  ancho?: boolean;
  /** Pictograma a la izquierda del rótulo (o solo, con iconOnly). */
  icono?: ReactNode;
}

/**
 * Botón VITRINA: la tecla de una tienda. Radio de etiqueta de precio, 44 px
 * de alto mínimo, y tres rellenos con una regla de contraste cada uno. Al
 * pulsar se aprieta un pelo (vitrina-prensa) y el coral se hunde a
 * coral-hondo con el texto en blanco — el único sitio donde el blanco
 * pisa el naranja, porque ahí ya da 7:1.
 */
const VitrinaBoton = forwardRef<HTMLButtonElement, VitrinaBotonProps>(function VitrinaBoton(
  { className, tono = "tinta", ancho = false, icono, loading, children, ...rest },
  ref,
) {
  return (
    <Button
      ref={ref}
      className={cx(
        "vitrina-boton",
        `vitrina-boton--${tono}`,
        (ancho || tono === "bloque") && "vitrina-boton--ancho",
        Boolean(icono) && "vitrina-boton--con-icono",
        className,
      )}
      loading={loading}
      {...rest}
    >
      {loading ? (
        <span className="vitrina-boton__giro" aria-hidden="true" />
      ) : (
        icono && (
          <span className="vitrina-boton__icono" aria-hidden="true">
            {icono}
          </span>
        )
      )}
      {children && <span className="vitrina-boton__rotulo">{children}</span>}
    </Button>
  );
});

export default VitrinaBoton;
