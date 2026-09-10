// El save de la tienda en localStorage: clave con versión, todo en
// try/catch (modo privado, embeds), y un spread sobre el inicial para que
// los campos nuevos tomen su default.

import { ESTADO_INICIAL, type EstadoTienda } from "./state";

const KEY = "ahroi:vitrina:tienda:v1";

export function cargar(): EstadoTienda {
  if (typeof window === "undefined") return ESTADO_INICIAL;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return ESTADO_INICIAL;
    const save = JSON.parse(raw) as Partial<EstadoTienda>;
    if (save.version !== 1) return ESTADO_INICIAL;
    return { ...ESTADO_INICIAL, ...save, checkout: { ...ESTADO_INICIAL.checkout, ...(save.checkout ?? {}) } };
  } catch {
    return ESTADO_INICIAL;
  }
}

export function guardar(s: EstadoTienda): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* sin save */
  }
}

export function borrar(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* idem */
  }
}
