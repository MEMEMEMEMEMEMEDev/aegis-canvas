import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../calco.scss";
import "./CalcoCabecera.scss";

export interface CalcoCabeceraProps {
  /** La marca, a la izquierda. Corta: "AAROI·DEV". */
  marca?: ReactNode;
  /** El nombre de la pantalla, al centro. */
  titulo: ReactNode;
  /** Kanji al lado del título. Decorativo. */
  kana?: string;
  /** Lo que va a la derecha: estado, chapas, un semáforo. */
  derecha?: ReactNode;
  className?: string;
}

/**
 * La barra de arriba de la app: marca, nombre de la pantalla y estado. Es
 * la barra de estado de un teléfono, pero con lo de la casa — nada de hora
 * ni batería inventadas: lo que va aquí es lo que el sitio sabe de verdad.
 *
 * Se dibuja como un bloque CALCO más, con su borde y su sombra, y eso es
 * a propósito: en la referencia 1 la barra de navegación es una tira con
 * el mismo contorno que todo lo demás, no un cromo aparte.
 */
export default function CalcoCabecera({ marca, titulo, kana, derecha, className }: CalcoCabeceraProps) {
  return (
    <header className={cx("calco-cabecera", className)}>
      {marca && <div className="calco-cabecera__marca">{marca}</div>}

      <div className="calco-cabecera__titulo">
        <span className="calco-cabecera__nombre">{titulo}</span>
        {kana && (
          <span className="calco-cabecera__kana" aria-hidden="true">
            {kana}
          </span>
        )}
      </div>

      {derecha && <div className="calco-cabecera__derecha">{derecha}</div>}
    </header>
  );
}
