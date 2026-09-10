import type { PictoCategoriaName } from "../../VitrinaPicto/VitrinaPicto";
import type { VitrinaSelloTono } from "../../VitrinaSello/VitrinaSello";
import type { VitrinaTarjetaProducto } from "../../VitrinaTarjeta/VitrinaTarjeta";
import { CATEGORIA, COLORES, VENDEDOR, stockTotal } from "../datos";
import type { ColorId, Producto, Variante } from "../datos";
import { descuento } from "../formato";

export function laminaDe(p: Producto, color?: ColorId): { picto: PictoCategoriaName; matiz: string } {
  const cat = CATEGORIA[p.categoria];
  return { picto: cat.picto, matiz: color ? COLORES[color].hex : cat.matiz };
}

export function sellosDe(p: Producto): Array<{ tono: VitrinaSelloTono; texto: string }> {
  const out: Array<{ tono: VitrinaSelloTono; texto: string }> = [];
  const oferta = p.precioAntes !== undefined && p.precioAntes > p.precio;
  if (p.sellos.includes("flash")) out.push({ tono: "flash", texto: oferta ? `-${descuento(p.precio, p.precioAntes!)}%` : "Flash" });
  else if (oferta) out.push({ tono: "oferta", texto: `-${descuento(p.precio, p.precioAntes!)}%` });
  if (p.sellos.includes("nuevo")) out.push({ tono: "nuevo", texto: "Nuevo" });
  if (p.sellos.includes("mas-vendido")) out.push({ tono: "vendido", texto: "Más vendido" });
  return out.slice(0, 2);
}

export const agotado = (p: Producto): boolean => stockTotal(p) === 0;
export const primeraDisponible = (p: Producto): Variante | undefined => p.variantes.find((v) => v.stock > 0);
/** Hay que elegir talla o color antes de añadir. */
export const necesitaElegir = (p: Producto): boolean => p.variantes.length > 1;

export function aTarjeta(p: Producto): VitrinaTarjetaProducto {
  const v0 = p.variantes[0];
  return {
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    precioAntes: p.precioAntes,
    valoracion: p.valoracion,
    resenas: p.resenas,
    vendedor: VENDEDOR[p.vendedor].nombre,
    resumen: p.descripcion.split(". ")[0],
    sellos: sellosDe(p),
    lamina: laminaDe(p, v0?.color),
    agotado: agotado(p),
  };
}

export const coloresDe = (p: Producto): ColorId[] => Array.from(new Set(p.variantes.map((v) => v.color).filter((c): c is ColorId => Boolean(c))));
export const tallasDe = (p: Producto) => Array.from(new Set(p.variantes.map((v) => v.talla).filter((t): t is NonNullable<typeof t> => Boolean(t) && t !== "unica")));
