// =============================================================================
// El estado de la tienda: solo lo que PERSISTE. La ruta, los cajones y los
// avisos viven en useState de la app. Un reducer + Context; los selectores
// de aquí abajo son funciones puras sobre el estado.
// =============================================================================

import { createContext, useContext, type Dispatch } from "react";
import { PRODUCTO, PREFERENCIAS_INICIALES, nombreVariante, varianteDe } from "./datos";
import type { BorradorCheckout, Cupon, Direccion, LineaCesta, MetodoEnvio, Pedido, Preferencias, Producto, Sesion, Tarjeta, Variante } from "./datos";
import type { Accion } from "./reducer";

export interface EstadoTienda {
  version: 1;
  sesion: Sesion | null;
  invitado: boolean;
  cesta: LineaCesta[];
  guardados: LineaCesta[];
  cupon: Cupon | null;
  favoritos: string[];
  pedidos: Pedido[];
  direcciones: Direccion[];
  tarjetas: Tarjeta[];
  preferencias: Preferencias;
  checkout: BorradorCheckout;
  ultimoPedidoId: string | null;
  /** Correlativo de pedidos creados en esta demo. */
  secuencia: number;
}

export const CHECKOUT_INICIAL: BorradorCheckout = { paso: "datos", email: "", aceptaTerminos: false };

export const ESTADO_INICIAL: EstadoTienda = {
  version: 1,
  sesion: null,
  invitado: false,
  cesta: [],
  guardados: [],
  cupon: null,
  favoritos: [],
  pedidos: [],
  direcciones: [],
  tarjetas: [],
  preferencias: PREFERENCIAS_INICIALES,
  checkout: CHECKOUT_INICIAL,
  ultimoPedidoId: null,
  secuencia: 200,
};

// --- Contexto ---------------------------------------------------------------

export interface TiendaCtx {
  state: EstadoTienda;
  dispatch: Dispatch<Accion>;
}

const Ctx = createContext<TiendaCtx | null>(null);
export const TiendaProvider = Ctx.Provider;

export function useTienda(): TiendaCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTienda debe usarse dentro de <Tienda>");
  return ctx;
}

// --- Reglas de envío ---------------------------------------------------------

export const ENVIO_GRATIS_DESDE = 39990;
export const COSTO_ENVIO: Record<MetodoEnvio, number> = { estandar: 2990, express: 4990, retiro: 0 };
export const ENVIO_LABEL: Record<MetodoEnvio, string> = { estandar: "Envío estándar", express: "Envío express", retiro: "Retiro en tienda" };
export const ENVIO_DIAS: Record<MetodoEnvio, [number, number]> = { estandar: [3, 5], express: [1, 1], retiro: [1, 2] };

// --- Selectores ---------------------------------------------------------------

export interface LineaResuelta {
  linea: LineaCesta;
  producto: Producto;
  variante: Variante | undefined;
  nombreVariante: string | undefined;
}

export function resolver(lineas: LineaCesta[]): LineaResuelta[] {
  const out: LineaResuelta[] = [];
  for (const linea of lineas) {
    const producto = PRODUCTO[linea.productoId];
    if (!producto) continue;
    const variante = varianteDe(producto, linea.varianteId);
    out.push({ linea, producto, variante, nombreVariante: nombreVariante(variante) });
  }
  return out;
}

export const lineasCesta = (s: EstadoTienda): LineaResuelta[] => resolver(s.cesta);
export const lineasGuardadas = (s: EstadoTienda): LineaResuelta[] => resolver(s.guardados);
export const cantidadCesta = (s: EstadoTienda): number => s.cesta.reduce((n, l) => n + l.cantidad, 0);
export const esFavorito = (s: EstadoTienda, id: string): boolean => s.favoritos.includes(id);
export const conSesion = (s: EstadoTienda): boolean => s.sesion !== null;

export interface Totales {
  subtotal: number;
  descuento: number;
  envio: number | "gratis" | "pendiente";
  costoEnvio: number;
  total: number;
  unidades: number;
}

export function totales(s: EstadoTienda, metodo?: MetodoEnvio): Totales {
  const lineas = lineasCesta(s);
  const subtotal = lineas.reduce((n, l) => n + l.producto.precio * l.linea.cantidad, 0);
  const base = s.cupon?.soloCategoria ? lineas.filter((l) => l.producto.categoria === s.cupon?.soloCategoria).reduce((n, l) => n + l.producto.precio * l.linea.cantidad, 0) : subtotal;
  const descuento = s.cupon ? Math.round((base * s.cupon.porcentaje) / 100) : 0;
  const unidades = lineas.reduce((n, l) => n + l.linea.cantidad, 0);

  let envio: Totales["envio"];
  let costoEnvio = 0;
  if (!metodo) {
    envio = subtotal >= ENVIO_GRATIS_DESDE ? "gratis" : "pendiente";
  } else if (metodo === "retiro" || (metodo === "estandar" && subtotal >= ENVIO_GRATIS_DESDE)) {
    envio = "gratis";
  } else {
    costoEnvio = COSTO_ENVIO[metodo];
    envio = costoEnvio;
  }

  return { subtotal, descuento, envio, costoEnvio, total: subtotal - descuento + costoEnvio, unidades };
}

export const direccionPredeterminada = (s: EstadoTienda): Direccion | undefined => s.direcciones.find((d) => d.predeterminada) ?? s.direcciones[0];
export const tarjetaPredeterminada = (s: EstadoTienda): Tarjeta | undefined => s.tarjetas.find((t) => t.predeterminada) ?? s.tarjetas[0];
