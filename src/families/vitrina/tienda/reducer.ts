import { CUPONES, DIRECCIONES_SEMILLA, PRODUCTO, TARJETAS_SEMILLA, USUARIO_DEMO, pedidosSemilla, timelinePara, varianteDe } from "./datos";
import type { BorradorCheckout, Direccion, EstadoPedido, LineaCesta, MetodoEnvio, MetodoPagoTipo, PasoCheckout, Pedido, Preferencias, Tarjeta } from "./datos";
import { CHECKOUT_INICIAL, ESTADO_INICIAL, type EstadoTienda } from "./state";

export type Accion =
  // sesión
  | { type: "entrar"; email: string }
  | { type: "registrar"; nombre: string; apellido: string; email: string }
  | { type: "salir" }
  | { type: "continuar-invitado" }
  // cesta
  | { type: "agregar"; productoId: string; varianteId: string; cantidad?: number }
  | { type: "cantidad"; id: string; cantidad: number }
  | { type: "quitar"; id: string }
  | { type: "guardar"; id: string }
  | { type: "mover-a-cesta"; id: string }
  | { type: "quitar-guardado"; id: string }
  | { type: "vaciar" }
  | { type: "cupon"; codigo: string }
  | { type: "quitar-cupon" }
  // favoritos
  | { type: "favorito"; productoId: string }
  // checkout
  | { type: "checkout"; parcial: Partial<BorradorCheckout> }
  | { type: "checkout-paso"; paso: PasoCheckout }
  | { type: "confirmar-pedido"; pedido: Pedido }
  | { type: "checkout-reset" }
  // pedidos
  | { type: "cancelar-pedido"; id: string }
  | { type: "avanzar-pedido"; id: string }
  | { type: "repetir-pedido"; id: string }
  // direcciones y tarjetas
  | { type: "direccion-guardar"; direccion: Direccion }
  | { type: "direccion-borrar"; id: string }
  | { type: "direccion-predeterminar"; id: string }
  | { type: "tarjeta-guardar"; tarjeta: Tarjeta }
  | { type: "tarjeta-borrar"; id: string }
  | { type: "tarjeta-predeterminar"; id: string }
  // preferencias y perfil
  | { type: "preferencias"; parcial: Partial<Preferencias> }
  | { type: "perfil"; parcial: { nombre?: string; apellido?: string; email?: string; telefono?: string } }
  | { type: "reset" };

const ahora = () => new Date().toISOString();
const tope = (productoId: string, varianteId: string) => varianteDe(PRODUCTO[productoId]!, varianteId)?.stock ?? 0;

function agregarA(lineas: LineaCesta[], productoId: string, varianteId: string, cantidad: number): LineaCesta[] {
  const id = `${productoId}:${varianteId}`;
  const max = tope(productoId, varianteId);
  if (max <= 0 || !PRODUCTO[productoId]) return lineas;
  const existente = lineas.find((l) => l.id === id);
  if (existente) return lineas.map((l) => (l.id === id ? { ...l, cantidad: Math.min(max, l.cantidad + cantidad) } : l));
  return [...lineas, { id, productoId, varianteId, cantidad: Math.min(max, cantidad), agregadoEn: ahora() }];
}

const sinCheckout = (s: EstadoTienda): EstadoTienda => ({ ...s, checkout: CHECKOUT_INICIAL });

/** Al entrar: si es la primera vez, la cuenta viene con su historial. */
function semilla(s: EstadoTienda): Pick<EstadoTienda, "pedidos" | "direcciones" | "tarjetas"> {
  return {
    pedidos: s.pedidos.length ? s.pedidos : pedidosSemilla(),
    direcciones: s.direcciones.length ? s.direcciones : DIRECCIONES_SEMILLA,
    tarjetas: s.tarjetas.length ? s.tarjetas : TARJETAS_SEMILLA,
  };
}

export function reducer(s: EstadoTienda, a: Accion): EstadoTienda {
  switch (a.type) {
    // --- Sesión ---
    case "entrar":
      return { ...s, sesion: { ...USUARIO_DEMO, email: a.email || USUARIO_DEMO.email }, invitado: false, ...semilla(s), checkout: { ...s.checkout, email: a.email || USUARIO_DEMO.email } };
    case "registrar":
      return { ...s, sesion: { ...USUARIO_DEMO, id: `u-${Date.now()}`, nombre: a.nombre, apellido: a.apellido, email: a.email, desde: ahora() }, invitado: false, direcciones: s.direcciones, tarjetas: s.tarjetas, checkout: { ...s.checkout, email: a.email } };
    case "salir":
      // Un marketplace conserva la cesta y los favoritos: son del navegador, no de la cuenta.
      return { ...s, sesion: null, invitado: false, checkout: CHECKOUT_INICIAL };
    case "continuar-invitado":
      return { ...s, invitado: true };

    // --- Cesta ---
    case "agregar":
      return { ...s, cesta: agregarA(s.cesta, a.productoId, a.varianteId, a.cantidad ?? 1) };
    case "cantidad":
      return { ...s, cesta: s.cesta.map((l) => (l.id === a.id ? { ...l, cantidad: Math.max(1, Math.min(tope(l.productoId, l.varianteId) || 1, a.cantidad)) } : l)) };
    case "quitar":
      return { ...s, cesta: s.cesta.filter((l) => l.id !== a.id) };
    case "guardar": {
      const l = s.cesta.find((x) => x.id === a.id);
      if (!l) return s;
      return { ...s, cesta: s.cesta.filter((x) => x.id !== a.id), guardados: s.guardados.some((g) => g.id === a.id) ? s.guardados : [...s.guardados, l] };
    }
    case "mover-a-cesta": {
      const g = s.guardados.find((x) => x.id === a.id);
      if (!g) return s;
      return { ...s, guardados: s.guardados.filter((x) => x.id !== a.id), cesta: agregarA(s.cesta, g.productoId, g.varianteId, g.cantidad) };
    }
    case "quitar-guardado":
      return { ...s, guardados: s.guardados.filter((x) => x.id !== a.id) };
    case "vaciar":
      return { ...s, cesta: [], cupon: null };
    case "cupon": {
      const c = CUPONES[a.codigo.trim().toUpperCase()];
      return c ? { ...s, cupon: c } : s;
    }
    case "quitar-cupon":
      return { ...s, cupon: null };

    // --- Favoritos ---
    case "favorito":
      return { ...s, favoritos: s.favoritos.includes(a.productoId) ? s.favoritos.filter((x) => x !== a.productoId) : [...s.favoritos, a.productoId] };

    // --- Checkout ---
    case "checkout":
      return { ...s, checkout: { ...s.checkout, ...a.parcial } };
    case "checkout-paso":
      return { ...s, checkout: { ...s.checkout, paso: a.paso } };
    case "confirmar-pedido":
      return { ...sinCheckout(s), pedidos: [a.pedido, ...s.pedidos], cesta: [], cupon: null, ultimoPedidoId: a.pedido.id, secuencia: s.secuencia + 1 };
    case "checkout-reset":
      return sinCheckout(s);

    // --- Pedidos ---
    case "cancelar-pedido":
      return {
        ...s,
        pedidos: s.pedidos.map((p) => (p.id === a.id && p.estado !== "entregado" && p.estado !== "cancelado" ? { ...p, estado: "cancelado", timeline: [...p.timeline, { estado: "cancelado", fecha: ahora(), nota: "Reembolso emitido al mismo medio de pago" }] } : p)),
      };
    case "avanzar-pedido":
      return {
        ...s,
        pedidos: s.pedidos.map((p) => {
          if (p.id !== a.id) return p;
          const camino: EstadoPedido[] = ["recibido", "pagado", "preparando", "despachado", "en-camino", "entregado"];
          const i = camino.indexOf(p.estado);
          const sig = camino[i + 1];
          if (!sig) return p;
          return { ...p, estado: sig, timeline: timelinePara(sig, p.creadoEn) };
        }),
      };
    case "repetir-pedido": {
      const p = s.pedidos.find((x) => x.id === a.id);
      if (!p) return s;
      let cesta = s.cesta;
      for (const l of p.lineas) cesta = agregarA(cesta, l.productoId, l.varianteId, l.cantidad);
      return { ...s, cesta };
    }

    // --- Direcciones / tarjetas ---
    case "direccion-guardar": {
      const existe = s.direcciones.some((d) => d.id === a.direccion.id);
      let lista = existe ? s.direcciones.map((d) => (d.id === a.direccion.id ? a.direccion : d)) : [...s.direcciones, a.direccion];
      if (a.direccion.predeterminada || lista.length === 1) lista = lista.map((d) => ({ ...d, predeterminada: d.id === a.direccion.id }));
      return { ...s, direcciones: lista };
    }
    case "direccion-borrar": {
      const lista = s.direcciones.filter((d) => d.id !== a.id);
      if (lista.length && !lista.some((d) => d.predeterminada)) lista[0] = { ...lista[0]!, predeterminada: true };
      return { ...s, direcciones: lista };
    }
    case "direccion-predeterminar":
      return { ...s, direcciones: s.direcciones.map((d) => ({ ...d, predeterminada: d.id === a.id })) };
    case "tarjeta-guardar": {
      const existe = s.tarjetas.some((t) => t.id === a.tarjeta.id);
      let lista = existe ? s.tarjetas.map((t) => (t.id === a.tarjeta.id ? a.tarjeta : t)) : [...s.tarjetas, a.tarjeta];
      if (a.tarjeta.predeterminada || lista.length === 1) lista = lista.map((t) => ({ ...t, predeterminada: t.id === a.tarjeta.id }));
      return { ...s, tarjetas: lista };
    }
    case "tarjeta-borrar": {
      const lista = s.tarjetas.filter((t) => t.id !== a.id);
      if (lista.length && !lista.some((t) => t.predeterminada)) lista[0] = { ...lista[0]!, predeterminada: true };
      return { ...s, tarjetas: lista };
    }
    case "tarjeta-predeterminar":
      return { ...s, tarjetas: s.tarjetas.map((t) => ({ ...t, predeterminada: t.id === a.id })) };

    // --- Preferencias / perfil ---
    case "preferencias":
      return { ...s, preferencias: { ...s.preferencias, ...a.parcial, notificaciones: { ...s.preferencias.notificaciones, ...(a.parcial.notificaciones ?? {}) } } };
    case "perfil":
      return s.sesion ? { ...s, sesion: { ...s.sesion, ...a.parcial } } : s;

    case "reset":
      return ESTADO_INICIAL;
  }
}

// Tipos que el checkout necesita a mano.
export type { MetodoEnvio, MetodoPagoTipo };
