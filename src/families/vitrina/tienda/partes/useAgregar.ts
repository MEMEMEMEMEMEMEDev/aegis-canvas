import { useCallback } from "react";
import { useVueloAlCarrito } from "../../useVueloAlCarrito";
import { useAvisos } from "../avisos";
import type { Producto } from "../datos";
import { useTienda } from "../state";
import { useUi } from "../ui";

/**
 * Añadir a la cesta, con todo lo que pasa alrededor: el dispatch, el vuelo
 * de la lámina, el aviso con "Ver cesta". Una sola función para las cinco
 * pantallas que añaden cosas.
 */
export function useAgregar() {
  const { dispatch } = useTienda();
  const { avisar } = useAvisos();
  const { abrirCesta } = useUi();
  const volar = useVueloAlCarrito();

  return useCallback(
    (p: Producto, varianteId: string, cantidad = 1, lamina?: HTMLElement | null) => {
      dispatch({ type: "agregar", productoId: p.id, varianteId, cantidad });
      if (lamina) volar(lamina);
      avisar("ok", `${p.nombre} añadido a la cesta`, { label: "Ver cesta", onClick: abrirCesta });
    },
    [dispatch, volar, avisar, abrirCesta],
  );
}
