// =============================================================================
// MULTI V2 — estado del juego.
//
// Solo la PROGRESIÓN vive aquí (y se persiste): fase, sistemas encendidos,
// señales descubiertas, mundos desbloqueados y logros. Lo efímero (mundo
// actual, viaje en curso, texto de la AI) es useState de cada vista.
// =============================================================================

import { createContext, useContext, useEffect, useState, type Dispatch } from "react";
import type { LogroId, MundoId, SistemaId } from "./content";

export type FaseJuego = "arranque" | "puente";

export interface GameState {
  /** Versión del SAVE (no de la demo): cambia el shape → partida nueva. */
  version: 1;
  fase: FaseJuego;
  sistemas: Record<SistemaId, boolean>;
  /** Señales identificadas: el código de salto es visible. */
  descubiertos: MundoId[];
  /** Combo ejecutado al menos una vez: se puede viajar desde la consola. */
  desbloqueados: MundoId[];
  logros: LogroId[];
  /** Rotación de pistas por defecto de la AI (persiste entre preguntas). */
  pistaIdx: number;
  /** Fallos de combo acumulados: al 3º la AI ofrece el salto manual. */
  intentosCombo: number;
}

export const ESTADO_INICIAL: GameState = {
  version: 1,
  fase: "arranque",
  sistemas: { reactor: false, escudos: false, carta: false },
  descubiertos: [],
  desbloqueados: [],
  logros: [],
  pistaIdx: 0,
  intentosCombo: 0,
};

export type Accion =
  | { type: "encender"; sistema: SistemaId }
  | { type: "saltar-onboarding" }
  | { type: "descubrir"; mundo: MundoId }
  | { type: "desbloquear"; mundo: MundoId }
  | { type: "logro"; id: LogroId }
  | { type: "fallo-combo" }
  | { type: "avanzar-pista" }
  | { type: "reset" };

const agrega = <T,>(arr: T[], x: T): T[] => (arr.includes(x) ? arr : [...arr, x]);

export function reducer(s: GameState, a: Accion): GameState {
  switch (a.type) {
    case "encender": {
      const sistemas = { ...s.sistemas, [a.sistema]: true };
      const encendida = sistemas.reactor && sistemas.escudos && sistemas.carta;
      return {
        ...s,
        sistemas,
        fase: encendida ? "puente" : s.fase,
        logros: encendida ? agrega(s.logros, "nave-encendida") : s.logros,
      };
    }
    case "saltar-onboarding":
      return {
        ...s,
        sistemas: { reactor: true, escudos: true, carta: true },
        fase: "puente",
        // Saltarse el arranque no da el logro: esa es la gracia.
      };
    case "descubrir":
      return {
        ...s,
        descubiertos: agrega(s.descubiertos, a.mundo),
        logros: agrega(s.logros, `senal-${a.mundo}` as LogroId),
      };
    case "desbloquear":
      return {
        ...s,
        desbloqueados: agrega(s.desbloqueados, a.mundo),
        logros: agrega(s.logros, `salto-${a.mundo}` as LogroId),
        intentosCombo: 0,
      };
    case "logro":
      return { ...s, logros: agrega(s.logros, a.id) };
    case "fallo-combo":
      return { ...s, intentosCombo: s.intentosCombo + 1 };
    case "avanzar-pista":
      return { ...s, pistaIdx: s.pistaIdx + 1 };
    case "reset":
      return ESTADO_INICIAL;
  }
}

export const tiene = (s: GameState, id: LogroId): boolean => s.logros.includes(id);

// --- Contexto ---------------------------------------------------------------

export interface GameCtx {
  state: GameState;
  dispatch: Dispatch<Accion>;
}

const Ctx = createContext<GameCtx | null>(null);
export const GameProvider = Ctx.Provider;

export function useGame(): GameCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame debe usarse dentro de <GameProvider>");
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
