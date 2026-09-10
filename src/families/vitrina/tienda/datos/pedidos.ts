import type { VitrinaSelloTono } from "../../VitrinaSello/VitrinaSello";
import type { EstadoPedido, HitoPedido, Pedido } from "./tipos";
import { DIRECCIONES_SEMILLA } from "./usuario";

export const ESTADO_LABEL: Record<EstadoPedido, string> = {
  recibido: "Recibido",
  pagado: "Pago confirmado",
  preparando: "En preparación",
  despachado: "Despachado",
  "en-camino": "En camino",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const ESTADO_TONO: Record<EstadoPedido, VitrinaSelloTono> = {
  recibido: "neutro",
  pagado: "neutro",
  preparando: "aviso",
  despachado: "aviso",
  "en-camino": "aviso",
  entregado: "ok",
  cancelado: "error",
};

/** El camino feliz, en orden. */
export const CAMINO: EstadoPedido[] = ["recibido", "pagado", "preparando", "despachado", "en-camino", "entregado"];

/** ¿Se puede cancelar todavía? Hasta que sale del almacén. */
export const cancelable = (e: EstadoPedido) => e === "recibido" || e === "pagado" || e === "preparando";

const NOTAS: Partial<Record<EstadoPedido, string>> = {
  preparando: "El vendedor está armando tu pedido",
  "en-camino": "Sale a reparto hoy",
  entregado: "Firmado en conserjería",
  cancelado: "Reembolso emitido al mismo medio de pago",
};

const horas = (iso: string, h: number) => new Date(new Date(iso).getTime() + h * 3600 * 1000).toISOString();

/**
 * Los hitos hasta `estado`, con fechas escalonadas desde `creadoEn`. Un
 * pedido cancelado lleva el camino hasta donde llegó y el hito rojo al
 * final.
 */
export function timelinePara(estado: EstadoPedido, creadoEn: string, hastaAntes: EstadoPedido = "preparando"): HitoPedido[] {
  const saltos = [0, 0.05, 20, 44, 62, 80];
  const hasta = estado === "cancelado" ? CAMINO.indexOf(hastaAntes) : CAMINO.indexOf(estado);
  const hitos: HitoPedido[] = CAMINO.slice(0, hasta + 1).map((e, i) => ({ estado: e, fecha: horas(creadoEn, saltos[i] ?? 0), nota: NOTAS[e] }));
  if (estado === "cancelado") hitos.push({ estado: "cancelado", fecha: horas(creadoEn, (saltos[hasta] ?? 0) + 6), nota: NOTAS.cancelado });
  return hitos;
}

const dias = (n: number) => new Date(Date.now() - n * 86400 * 1000).toISOString();
const masDias = (iso: string, n: number) => new Date(new Date(iso).getTime() + n * 86400 * 1000).toISOString();

/** Los cuatro pedidos históricos de Camila. Fechas relativas: se calculan al cargar. */
export function pedidosSemilla(): Pedido[] {
  const casa = DIRECCIONES_SEMILLA[0]!;
  const oficina = DIRECCIONES_SEMILLA[1] ?? casa;
  const base = (id: string, numero: string, creadoEn: string, estado: EstadoPedido, lineas: Pedido["lineas"], envio: Pedido["envio"], extra: Partial<Pedido> = {}): Pedido => {
    const subtotal = lineas.reduce((s, l) => s + l.precioUnitario * l.cantidad, 0);
    const costoEnvio = envio === "express" ? 4990 : envio === "retiro" || subtotal >= 39990 ? 0 : 2990;
    const descuento = extra.descuento ?? 0;
    return {
      id,
      numero,
      creadoEn,
      estado,
      timeline: timelinePara(estado, creadoEn, "pagado"),
      lineas,
      direccion: casa,
      envio,
      pago: { tipo: "tarjeta", etiqueta: "Visa ···· 4242" },
      subtotal,
      descuento,
      costoEnvio,
      total: subtotal - descuento + costoEnvio,
      entregaEstimada: masDias(creadoEn, envio === "express" ? 1 : 4),
      ...extra,
    };
  };

  return [
    base("p-162", "VT-2026-000162", dias(1), "preparando", [
      { id: "taladro-20v:rojo", productoId: "taladro-20v", varianteId: "rojo", nombre: "Taladro percutor inalámbrico 20 V con 2 baterías", variante: "Rojo", categoria: "ferreteria", vendedor: "Ferretería Lautaro", precioUnitario: 89990, cantidad: 1 },
      { id: "set-brocas-42:unica", productoId: "set-brocas-42", varianteId: "unica", nombre: "Set de 42 brocas y puntas", categoria: "ferreteria", vendedor: "Ferretería Lautaro", precioUnitario: 12490, cantidad: 1 },
    ], "estandar", { descuento: 15372, cupon: "FERRETERIA15" }),
    base("p-158", "VT-2026-000158", dias(3), "en-camino", [
      { id: "audifonos-anc:negro", productoId: "audifonos-anc", varianteId: "negro", nombre: "Audífonos inalámbricos con cancelación de ruido", variante: "Negro", categoria: "tecnologia", vendedor: "TecnoAustral", precioUnitario: 59990, cantidad: 1 },
    ], "express", { direccion: oficina }),
    base("p-131", "VT-2026-000131", dias(41), "entregado", [
      { id: "poleron-esencial:arena-M", productoId: "poleron-esencial", varianteId: "arena-M", nombre: "Polerón esencial con capucha", variante: "Arena · M", categoria: "moda", vendedor: "Tienda Cauquén", precioUnitario: 24990, cantidad: 2 },
      { id: "gorro-lana:coral", productoId: "gorro-lana", varianteId: "coral", nombre: "Gorro de lana tejido", variante: "Coral", categoria: "moda", vendedor: "Tienda Cauquén", precioUnitario: 9990, cantidad: 1 },
    ], "estandar"),
    base("p-097", "VT-2025-000097", dias(280), "cancelado", [
      { id: "silla-escritorio:gris", productoId: "silla-escritorio", varianteId: "gris", nombre: "Silla de escritorio ergonómica", variante: "Gris", categoria: "libreria", vendedor: "Papelera Bosque", precioUnitario: 129990, cantidad: 1 },
    ], "estandar"),
  ];
}
