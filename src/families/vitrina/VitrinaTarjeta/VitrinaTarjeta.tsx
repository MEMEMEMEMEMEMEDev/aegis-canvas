import { useRef } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import VitrinaEstrellas from "../VitrinaEstrellas/VitrinaEstrellas";
import VitrinaLamina from "../VitrinaLamina/VitrinaLamina";
import VitrinaPicto from "../VitrinaPicto/VitrinaPicto";
import type { PictoCategoriaName } from "../VitrinaPicto/VitrinaPicto";
import VitrinaPrecio from "../VitrinaPrecio/VitrinaPrecio";
import VitrinaSello from "../VitrinaSello/VitrinaSello";
import type { VitrinaSelloTono } from "../VitrinaSello/VitrinaSello";
import "../vitrina.scss";
import "./VitrinaTarjeta.scss";

/** Lo que una tarjeta necesita saber de un producto — nada más. */
export interface VitrinaTarjetaProducto {
  id: string;
  nombre: string;
  precio: number;
  precioAntes?: number;
  valoracion?: number;
  resenas?: number;
  vendedor?: string;
  /** Texto corto bajo el nombre en la horizontal ("Cancelación de ruido líder"). */
  resumen?: string;
  sellos?: Array<{ tono: VitrinaSelloTono; texto: string }>;
  /** `foto` es opcional: sin ella, la lámina de siempre (picto+color). */
  lamina: { picto: PictoCategoriaName; matiz: string; foto?: string };
  agotado?: boolean;
}

export interface VitrinaTarjetaProps {
  producto: VitrinaTarjetaProducto;
  favorito?: boolean;
  onFavorito?: (id: string) => void;
  /** Recibe el nodo de la lámina: es lo que vuela al carrito. */
  onAgregar?: (id: string, lamina: HTMLElement) => void;
  onAbrir?: (id: string) => void;
  variante?: "vertical" | "horizontal";
  /** Turno de entrada escalonada (--vitrina-i). */
  indice?: number;
  className?: string;
}

/**
 * Tarjeta VITRINA: la pieza que más se repite en una tienda. Lámina con
 * sellos arriba a la izquierda y corazón arriba a la derecha, nombre a dos
 * líneas, vendedor, precio con su oferta, estrellas, y el botón de carrito
 * en la esquina. La vertical es la de la rejilla; la horizontal, la de
 * "más vendidos" con su "Añadir rápido".
 */
export default function VitrinaTarjeta({ producto, favorito = false, onFavorito, onAgregar, onAbrir, variante = "vertical", indice, className }: VitrinaTarjetaProps) {
  const lamina = useRef<HTMLSpanElement>(null);
  const p = producto;
  const agotado = Boolean(p.agotado);

  const agregar = () => {
    if (lamina.current) onAgregar?.(p.id, lamina.current);
  };

  return (
    <article
      className={cx("vitrina-tarjeta", `vitrina-tarjeta--${variante}`, agotado && "is-agotado", indice !== undefined && "vitrina-entra", className)}
      style={indice !== undefined ? ({ "--vitrina-i": Math.min(indice, 12) } as CSSProperties) : undefined}
    >
      <div className="vitrina-tarjeta__visual">
        <button type="button" className="vitrina-tarjeta__abrir" onClick={() => onAbrir?.(p.id)} tabIndex={-1} aria-hidden="true">
          <VitrinaLamina ref={lamina} picto={p.lamina.picto} matiz={p.lamina.matiz} foto={p.lamina.foto} ratio={variante === "horizontal" ? "1" : "4/5"} />
        </button>

        {(p.sellos?.length || agotado) && (
          <div className="vitrina-tarjeta__sellos">
            {agotado ? (
              <VitrinaSello tono="agotado" pequeno>
                Agotado
              </VitrinaSello>
            ) : (
              p.sellos?.map((s) => (
                <VitrinaSello key={s.texto} tono={s.tono} pequeno>
                  {s.texto}
                </VitrinaSello>
              ))
            )}
          </div>
        )}

        {onFavorito && (
          <button
            type="button"
            className={cx("vitrina-tarjeta__corazon", favorito && "is-favorito")}
            onClick={() => onFavorito(p.id)}
            aria-pressed={favorito}
            aria-label={favorito ? `Quitar ${p.nombre} de favoritos` : `Guardar ${p.nombre} en favoritos`}
          >
            <VitrinaPicto name={favorito ? "corazon-lleno" : "corazon"} size={18} />
          </button>
        )}
      </div>

      <div className="vitrina-tarjeta__cuerpo">
        {p.vendedor && <span className="vitrina-tarjeta__vendedor">{p.vendedor}</span>}
        <h3 className="vitrina-tarjeta__nombre">
          <button type="button" className="vitrina-tarjeta__enlace" onClick={() => onAbrir?.(p.id)}>
            {p.nombre}
          </button>
        </h3>
        {variante === "horizontal" && p.resumen && <p className="vitrina-tarjeta__resumen">{p.resumen}</p>}
        <div className="vitrina-tarjeta__precio">
          <VitrinaPrecio valor={p.precio} antes={p.precioAntes} tamano={variante === "horizontal" ? "lg" : "md"} />
        </div>
        {p.valoracion !== undefined && (
          <VitrinaEstrellas valor={p.valoracion} cantidad={p.resenas} tamano="sm" className="vitrina-tarjeta__estrellas" />
        )}

        {onAgregar && variante === "horizontal" && (
          <div className="vitrina-tarjeta__acciones">
            <button type="button" className="vitrina-tarjeta__rapido" onClick={agregar} disabled={agotado}>
              Añadir rápido
            </button>
          </div>
        )}
      </div>

      {onAgregar && variante === "vertical" && (
        <button type="button" className="vitrina-tarjeta__carrito" onClick={agregar} disabled={agotado} aria-label={`Añadir ${p.nombre} a la cesta`}>
          <VitrinaPicto name="carrito" size={18} />
        </button>
      )}
    </article>
  );
}
