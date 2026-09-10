// =============================================================================
// La "API": latencia simulada para que los esqueletos y la barra de carga
// tengan algo que hacer, y las consultas del catálogo como funciones puras.
// =============================================================================

import { useEffect, useState } from "react";
import { PRODUCTOS } from "./datos";
import type { CategoriaId, Filtros, Orden, Producto } from "./datos";

let LATENCIA_BASE = 320;
/** La app la fija al montar (las stories por pantalla la ponen a 0). */
export const fijarLatencia = (ms: number) => {
  LATENCIA_BASE = ms;
};

export const espera = (ms?: number): Promise<void> => {
  const t = ms ?? (LATENCIA_BASE === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : LATENCIA_BASE + Math.random() * LATENCIA_BASE * 1.2);
  if (t === Number.POSITIVE_INFINITY) return new Promise(() => {});
  if (t <= 0) return Promise.resolve();
  return new Promise((r) => window.setTimeout(r, t));
};

export interface Carga<T> {
  datos: T | null;
  cargando: boolean;
  error: string | null;
}

/**
 * Carga algo con latencia; se reinicia al cambiar `clave` y descarta la
 * respuesta de una carga que ya no interesa (cambiaste de pantalla antes de
 * que llegara).
 */
export function useCarga<T>(fn: () => Promise<T>, clave: string): Carga<T> {
  const [estado, setEstado] = useState<Carga<T>>({ datos: null, cargando: true, error: null });

  useEffect(() => {
    let vivo = true;
    setEstado((e) => ({ ...e, cargando: true, error: null }));
    fn().then(
      (datos) => {
        if (vivo) setEstado({ datos, cargando: false, error: null });
      },
      (err: unknown) => {
        if (vivo) setEstado({ datos: null, cargando: false, error: err instanceof Error ? err.message : "Algo falló" });
      },
    );
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  return estado;
}

// --- Consultas del catálogo ---------------------------------------------------

export interface Consulta {
  q?: string;
  categoria?: CategoriaId;
  filtros?: Partial<Filtros>;
  orden?: Orden;
}

const normaliza = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function buscar(c: Consulta): Producto[] {
  const q = c.q ? normaliza(c.q).split(/\s+/).filter(Boolean) : [];
  const f = c.filtros ?? {};
  const cats = new Set([...(c.categoria ? [c.categoria] : []), ...(f.categorias ?? [])]);

  let lista = PRODUCTOS.filter((p) => {
    if (cats.size && !cats.has(p.categoria)) return false;
    if (f.vendedores?.length && !f.vendedores.includes(p.vendedor)) return false;
    if (f.precioMax !== undefined && p.precio > f.precioMax) return false;
    if (f.soloOferta && !(p.precioAntes && p.precioAntes > p.precio)) return false;
    if (f.envioGratis && !p.envio.gratis) return false;
    if (f.valoracionMin !== undefined && p.valoracion < f.valoracionMin) return false;
    if (q.length) {
      const pajar = normaliza(`${p.nombre} ${p.categoria} ${p.descripcion}`);
      if (!q.every((w) => pajar.includes(w))) return false;
    }
    return true;
  });

  const orden = c.orden ?? "relevancia";
  const peso = (p: Producto) => (p.sellos.includes("mas-vendido") ? 2 : 0) + (p.sellos.includes("flash") ? 1 : 0) + p.valoracion * 0.1 + Math.log10(p.resenas + 1) * 0.3;
  const cmp: Record<Orden, (a: Producto, b: Producto) => number> = {
    relevancia: (a, b) => peso(b) - peso(a),
    "precio-asc": (a, b) => a.precio - b.precio,
    "precio-desc": (a, b) => b.precio - a.precio,
    valoracion: (a, b) => b.valoracion - a.valoracion || b.resenas - a.resenas,
    nuevo: (a, b) => Number(b.sellos.includes("nuevo")) - Number(a.sellos.includes("nuevo")) || peso(b) - peso(a),
  };
  lista = [...lista].sort(cmp[orden]);
  return lista;
}

export const relacionados = (p: Producto, n = 4): Producto[] => PRODUCTOS.filter((x) => x.id !== p.id && x.categoria === p.categoria).slice(0, n);
export const novedades = (n = 8): Producto[] => buscar({ orden: "nuevo" }).slice(0, n);
export const masVendidos = (n = 6): Producto[] => PRODUCTOS.filter((p) => p.sellos.includes("mas-vendido")).slice(0, n);
export const enFlash = (): Producto[] => PRODUCTOS.filter((p) => p.sellos.includes("flash") && p.flashHasta);
