// =============================================================================
// MULTI V3 — estado ligero.
//
// V3 no tiene fases ni bloqueos: lo único que persiste son los hallazgos
// opcionales (localStorage, best-effort). Un hook chico en vez del reducer
// grande de V2 — el juego aquí es condimento, no plato.
// =============================================================================

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HALLAZGOS, type HallazgoId } from "./content";

const KEY = "ahroi:mv3:hallazgos:v1";

function cargar(): HallazgoId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw) as unknown;
    if (!Array.isArray(ids)) return [];
    const validos = new Set(HALLAZGOS.map(([id]) => id));
    return ids.filter((x): x is HallazgoId => typeof x === "string" && validos.has(x as HallazgoId));
  } catch {
    return [];
  }
}

export interface HallazgosApi {
  lista: HallazgoId[];
  tiene: (id: HallazgoId) => boolean;
  /** Marca un hallazgo (idempotente). Devuelve true si es nuevo. */
  marcar: (id: HallazgoId) => boolean;
  reiniciar: () => void;
}

export function useHallazgosState(): HallazgosApi {
  const [lista, setLista] = useState<HallazgoId[]>(cargar);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lista));
    } catch {
      /* modo privado: se juega sin memoria */
    }
  }, [lista]);

  const tiene = useCallback((id: HallazgoId) => lista.includes(id), [lista]);

  const marcar = useCallback(
    (id: HallazgoId) => {
      let nuevo = false;
      setLista((prev) => {
        if (prev.includes(id)) return prev;
        nuevo = true;
        return [...prev, id];
      });
      return nuevo;
    },
    [],
  );

  const reiniciar = useCallback(() => setLista([]), []);

  return { lista, tiene, marcar, reiniciar };
}

// --- Contexto (los mundos marcan hallazgos sin prop-drilling) ---------------

const Ctx = createContext<HallazgosApi | null>(null);
export const HallazgosProvider = Ctx.Provider;

export function useHallazgos(): HallazgosApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHallazgos debe usarse dentro de <HallazgosProvider>");
  return ctx;
}

// --- prefers-reduced-motion, SSR-safe ----------------------------------------

export function usePrefiereReposo(): boolean {
  const [reposo, setReposo] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReposo(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reposo;
}
