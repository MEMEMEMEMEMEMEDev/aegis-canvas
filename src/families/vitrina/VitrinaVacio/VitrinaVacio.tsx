import { cx } from "../../../utils/cx";
import VitrinaBoton from "../VitrinaBoton/VitrinaBoton";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { VitrinaPictoName } from "../VitrinaPicto/VitrinaPicto";
import "../vitrina.scss";
import "./VitrinaVacio.scss";

export interface VitrinaVacioProps {
  picto?: VitrinaPictoName;
  titulo: string;
  texto?: string;
  accion?: { label: string; onClick: () => void };
  secundaria?: { label: string; onClick: () => void };
  /** vacio (una lista sin nada), 404 (no existe) o error (algo falló). */
  tono?: "vacio" | "404" | "error";
  /** Ocupa la pantalla entera (404) o solo su sitio (una lista vacía). */
  alto?: "pantalla" | "bloque";
  className?: string;
}

/**
 * Vacío VITRINA: lo que se ve cuando no hay nada que ver — la cesta vacía,
 * una búsqueda sin resultados, una ruta que no existe. Pictograma grande
 * sobre placa, titular, una frase y el botón que te saca de ahí.
 */
export default function VitrinaVacio({ picto = "bolsa", titulo, texto, accion, secundaria, tono = "vacio", alto = "bloque", className }: VitrinaVacioProps) {
  return (
    <div className={cx("vitrina-vacio", `vitrina-vacio--${tono}`, `vitrina-vacio--${alto}`, className)} role={tono === "error" ? "alert" : undefined}>
      <span className="vitrina-vacio__placa" aria-hidden="true">
        {tono === "404" ? <span className="vitrina-vacio__404">404</span> : <VitrinaPicto name={picto} size={48} />}
      </span>
      <h2 className="vitrina-vacio__titulo">{titulo}</h2>
      {texto && <p className="vitrina-vacio__texto">{texto}</p>}
      {(accion || secundaria) && (
        <div className="vitrina-vacio__acciones">
          {accion && (
            <VitrinaBoton tono="coral" onClick={accion.onClick}>
              {accion.label}
            </VitrinaBoton>
          )}
          {secundaria && (
            <VitrinaBoton variant="outline" onClick={secundaria.onClick}>
              {secundaria.label}
            </VitrinaBoton>
          )}
        </div>
      )}
    </div>
  );
}
