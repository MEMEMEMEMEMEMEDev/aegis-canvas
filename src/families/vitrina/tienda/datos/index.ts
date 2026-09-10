export * from "./tipos";
export { CATEGORIAS, CATEGORIA } from "./categorias";
export { COLORES, COLOR_MUESTRA } from "./colores";
export { VENDEDORES, VENDEDOR } from "./vendedores";
export { PRODUCTOS, PRODUCTO } from "./productos";
export { ESTADO_LABEL, ESTADO_TONO, CAMINO, cancelable, timelinePara, pedidosSemilla } from "./pedidos";
export { USUARIO_DEMO, DIRECCIONES_SEMILLA, TARJETAS_SEMILLA, PREFERENCIAS_INICIALES, CUPONES, REGIONES } from "./usuario";

import { COLORES } from "./colores";
import type { Producto, Variante } from "./tipos";

/** "Talla M · Negro" (o lo que tenga la variante). */
export function nombreVariante(v: Variante | undefined): string | undefined {
  if (!v) return undefined;
  const partes: string[] = [];
  if (v.talla && v.talla !== "unica") partes.push(`Talla ${v.talla}`);
  if (v.color) partes.push(COLORES[v.color].nombre);
  return partes.length ? partes.join(" · ") : undefined;
}

export const varianteDe = (p: Producto, id: string): Variante | undefined => p.variantes.find((v) => v.id === id);
export const stockTotal = (p: Producto): number => p.variantes.reduce((s, v) => s + v.stock, 0);
