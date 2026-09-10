import { cx } from "../../../utils/cx";
import VitrinaCantidad from "../VitrinaCantidad/VitrinaCantidad";
import VitrinaLamina from "../VitrinaLamina/VitrinaLamina";
import type { PictoCategoriaName } from "../VitrinaPicto/VitrinaPicto";
import VitrinaPrecio from "../VitrinaPrecio/VitrinaPrecio";
import VitrinaSello from "../VitrinaSello/VitrinaSello";
import "../vitrina.scss";
import "./VitrinaLinea.scss";

export interface VitrinaLineaDatos {
  id: string;
  nombre: string;
  /** "Talla M · Negro". */
  variante?: string;
  vendedor?: string;
  precioUnitario: number;
  cantidad: number;
  lamina: { picto: PictoCategoriaName; matiz: string };
  /** Stock: tope de la cantidad. */
  max?: number;
  agotado?: boolean;
}

export interface VitrinaLineaProps {
  linea: VitrinaLineaDatos;
  /** editable (la cesta), compacta (el resumen del checkout) o lectura (un pedido). */
  modo?: "editable" | "compacta" | "lectura";
  onCantidad?: (id: string, n: number) => void;
  onQuitar?: (id: string) => void;
  /** "Guardar para después" en la cesta; "Mover a la cesta" en guardados. */
  onGuardar?: (id: string) => void;
  guardarLabel?: string;
  onAbrir?: (id: string) => void;
  className?: string;
}

/**
 * Línea VITRINA: un artículo dentro de la cesta, del resumen o de un pedido.
 * Lámina mini, nombre, variante, la cantidad (control en la cesta, "×2"
 * en el resto) y el precio de línea a la derecha. Las acciones son texto
 * subrayado, como en la referencia: quitar, guardar para después.
 */
export default function VitrinaLinea({ linea, modo = "editable", onCantidad, onQuitar, onGuardar, guardarLabel = "Guardar para después", onAbrir, className }: VitrinaLineaProps) {
  const l = linea;
  const total = l.precioUnitario * l.cantidad;

  return (
    <div className={cx("vitrina-linea", `vitrina-linea--${modo}`, l.agotado && "is-agotada", className)}>
      <button type="button" className="vitrina-linea__lamina" onClick={() => onAbrir?.(l.id)} tabIndex={onAbrir ? 0 : -1} aria-label={onAbrir ? `Ver ${l.nombre}` : undefined} aria-hidden={onAbrir ? undefined : true}>
        <VitrinaLamina picto={l.lamina.picto} matiz={l.lamina.matiz} tamano="mini" />
      </button>

      <div className="vitrina-linea__cuerpo">
        <span className="vitrina-linea__nombre">{l.nombre}</span>
        {(l.variante || l.vendedor) && (
          <span className="vitrina-linea__meta">
            {l.variante}
            {l.variante && l.vendedor && " · "}
            {l.vendedor}
          </span>
        )}
        {l.agotado && (
          <VitrinaSello tono="agotado" pequeno>
            Sin stock
          </VitrinaSello>
        )}

        {modo === "editable" ? (
          <div className="vitrina-linea__controles">
            {onCantidad && <VitrinaCantidad tamano="sm" label={`Cantidad de ${l.nombre}`} value={l.cantidad} min={1} max={l.max} onChange={(n) => onCantidad(l.id, n)} disabled={l.agotado} />}
            {onGuardar && (
              <button type="button" className="vitrina-linea__accion" onClick={() => onGuardar(l.id)}>
                {guardarLabel}
              </button>
            )}
            {onQuitar && (
              <button type="button" className="vitrina-linea__accion" onClick={() => onQuitar(l.id)}>
                Quitar
              </button>
            )}
          </div>
        ) : (
          <span className="vitrina-linea__cantidad">
            {l.cantidad} × <VitrinaPrecio valor={l.precioUnitario} tamano="sm" />
          </span>
        )}
      </div>

      <div className="vitrina-linea__precio">
        <VitrinaPrecio valor={total} tamano={modo === "compacta" ? "sm" : "md"} />
      </div>
    </div>
  );
}
