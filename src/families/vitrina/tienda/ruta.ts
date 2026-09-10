// =============================================================================
// Las rutas de la tienda: una unión discriminada y una pila propia. Sin
// router y sin tocar la URL del navegador — en el portafolio la tienda
// vive como isla dentro de una página, y una isla que reescribe la URL se
// carga la página que la aloja. `onRuta` deja que el anfitrión sincronice
// lo que quiera.
// =============================================================================

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PRODUCTO } from "./datos";
import type { CategoriaId, Filtros, Orden, PasoCheckout } from "./datos";
import type { EstadoTienda } from "./state";

export type SeccionCuenta = "resumen" | "compras" | "perfil" | "direcciones" | "pagos" | "favoritos" | "preferencias";
export type ModoAcceso = "entrar" | "registro" | "recuperar";

export type Ruta =
  | { v: "inicio" }
  | { v: "catalogo"; q?: string; categoria?: CategoriaId; filtros?: Partial<Filtros>; orden?: Orden }
  | { v: "producto"; id: string }
  | { v: "cesta" }
  | { v: "checkout"; paso: PasoCheckout }
  | { v: "confirmacion"; pedidoId: string }
  | { v: "acceso"; modo: ModoAcceso; despues?: Ruta }
  | { v: "cuenta"; seccion: SeccionCuenta }
  | { v: "pedido"; id: string }
  | { v: "no-encontrado"; intento?: string };

export const rutaKey = (r: Ruta): string => JSON.stringify(r);

/** Las guardias: lo que una ruta necesita para dejarte entrar. */
export function resolver(r: Ruta, s: EstadoTienda): Ruta {
  const conSesion = s.sesion !== null;
  switch (r.v) {
    case "checkout":
      if (s.cesta.length === 0) return { v: "cesta" };
      if (!conSesion && !s.invitado) return { v: "acceso", modo: "entrar", despues: r };
      return r;
    case "cuenta":
    case "pedido":
      return conSesion ? r : { v: "acceso", modo: "entrar", despues: r };
    case "producto":
      return PRODUCTO[r.id] ? r : { v: "no-encontrado", intento: r.id };
    default:
      return r;
  }
}

export interface RutaApi {
  ruta: Ruta;
  ir: (r: Ruta) => void;
  volver: () => void;
  reemplazar: (r: Ruta) => void;
  puedeVolver: boolean;
}

const Ctx = createContext<RutaApi | null>(null);
export const RutaProvider = Ctx.Provider;

export function useRuta(): RutaApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRuta debe usarse dentro de <Tienda>");
  return ctx;
}

interface Pila {
  historial: Ruta[];
  indice: number;
}

/**
 * La pila de navegación. `ir` trunca lo que hubiera adelante y apila (como
 * un navegador); `volver` retrocede; `reemplazar` cambia la actual sin
 * apilar (tras entrar: la pantalla de acceso no debe quedar en el historial).
 */
export function usePila(inicial: Ruta, guardia: (r: Ruta) => Ruta, onRuta?: (r: Ruta) => void): RutaApi {
  const [pila, setPila] = useState<Pila>({ historial: [inicial], indice: 0 });

  const aplica = useCallback(
    (fn: (p: Pila) => Pila) => {
      setPila((p) => {
        const next = fn(p);
        const r = next.historial[next.indice];
        if (r && onRuta) onRuta(r);
        return next;
      });
    },
    [onRuta],
  );

  const ir = useCallback(
    (r: Ruta) => {
      const destino = guardia(r);
      aplica((p) => {
        const actual = p.historial[p.indice];
        if (actual && rutaKey(actual) === rutaKey(destino)) return p;
        const historial = [...p.historial.slice(0, p.indice + 1), destino];
        return { historial, indice: historial.length - 1 };
      });
    },
    [aplica, guardia],
  );

  const reemplazar = useCallback(
    (r: Ruta) => {
      const destino = guardia(r);
      aplica((p) => {
        const historial = [...p.historial];
        historial[p.indice] = destino;
        return { ...p, historial };
      });
    },
    [aplica, guardia],
  );

  const volver = useCallback(() => {
    aplica((p) => (p.indice > 0 ? { ...p, indice: p.indice - 1 } : { historial: [{ v: "inicio" }], indice: 0 }));
  }, [aplica]);

  const ruta = pila.historial[pila.indice] ?? inicial;
  return useMemo(() => ({ ruta, ir, volver, reemplazar, puedeVolver: pila.indice > 0 }), [ruta, ir, volver, reemplazar, pila.indice]);
}
