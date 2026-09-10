import VitrinaTarjeta from "../../VitrinaTarjeta/VitrinaTarjeta";
import { PRODUCTO } from "../datos";
import type { Producto } from "../datos";
import { useRuta } from "../ruta";
import { esFavorito, useTienda } from "../state";
import { aTarjeta, necesitaElegir, primeraDisponible } from "./utiles";
import { useAgregar } from "./useAgregar";

/**
 * La tarjeta de la tienda: VitrinaTarjeta ya cableada a favoritos, cesta,
 * vuelo y navegación. Si el producto tiene variantes, "añadir" abre la
 * ficha para elegir; si no, va directo a la cesta.
 */
export default function TarjetaProducto({ producto, variante = "vertical", indice }: { producto: Producto; variante?: "vertical" | "horizontal"; indice?: number }) {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const agregar = useAgregar();

  return (
    <VitrinaTarjeta
      producto={aTarjeta(producto)}
      variante={variante}
      indice={indice}
      favorito={esFavorito(state, producto.id)}
      onFavorito={(id) => dispatch({ type: "favorito", productoId: id })}
      onAbrir={(id) => ir({ v: "producto", id })}
      onAgregar={(id, lamina) => {
        const p = PRODUCTO[id];
        if (!p) return;
        if (necesitaElegir(p)) {
          ir({ v: "producto", id });
          return;
        }
        const v = primeraDisponible(p);
        if (v) agregar(p, v.id, 1, lamina);
      }}
    />
  );
}
