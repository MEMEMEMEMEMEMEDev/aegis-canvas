import { cx } from "../../../utils/cx";
import "../pliego.scss";
import "./PliegoCanto.scss";

export interface PliegoCantoProps {
  /** Las líneas del canto, de abajo arriba. */
  lineas: string[];
  lado?: "izq" | "der";
  /** La cadena de asteriscos que corre junto al texto. */
  cadena?: boolean;
  className?: string;
}

/**
 * El canto del pliego: el riel del borde con el texto girado y la cadena de
 * asteriscos — los créditos de imprenta de la referencia.
 *
 * Va `aria-hidden`: son créditos decorativos y, girados, un lector de
 * pantalla los leería igual de corrido pero fuera de todo contexto. Lo que
 * diga el canto tiene que estar escrito también en la página; si no lo está,
 * no era decoración.
 *
 * Se dibuja con `writing-mode` y no con `rotate`: rotar saca a la pieza del
 * flujo y deja al padre reservando el ancho equivocado — el texto vertical
 * es un modo de escritura de verdad, no un giro.
 */
export default function PliegoCanto({
  lineas,
  lado = "izq",
  cadena = true,
  className,
}: PliegoCantoProps) {
  return (
    <div className={cx("pliego-canto", `pliego-canto--${lado}`, className)} aria-hidden="true">
      {cadena && <span className="pliego-canto__cadena" />}
      <div className="pliego-canto__texto">
        {lineas.map((linea, i) => (
          <span className="pliego-canto__linea" key={i}>
            {linea}
          </span>
        ))}
      </div>
      {cadena && <span className="pliego-canto__cadena" />}
    </div>
  );
}
