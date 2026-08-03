// =============================================================================
// MULTI V2 — persistencia del save en localStorage.
//
// La clave lleva la versión: si el shape cambia, cambia la clave y el save
// viejo simplemente se ignora (partida nueva, sin migraciones). Todo acceso
// a storage va con try/catch: modo privado, embeds y test-runner no rompen.
// =============================================================================

import { ESTADO_INICIAL, type GameState } from "./state";

const KEY = "ahroi:mv2:save:v1";

/** Init lazy del reducer: useReducer(reducer, undefined, cargar). */
export function cargar(): GameState {
  if (typeof window === "undefined") return ESTADO_INICIAL;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return ESTADO_INICIAL;
    const save = JSON.parse(raw) as Partial<GameState>;
    if (save.version !== 1) return ESTADO_INICIAL;
    // Spread sobre el inicial: campos nuevos toman su default.
    return { ...ESTADO_INICIAL, ...save };
  } catch {
    return ESTADO_INICIAL;
  }
}

export function guardar(s: GameState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* modo privado / storage bloqueado: se juega sin save */
  }
}

export function borrar(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* idem */
  }
}
