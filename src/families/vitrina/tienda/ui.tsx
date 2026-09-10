import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

// Lo efímero de la interfaz que varias pantallas necesitan tocar: el cajón
// de la cesta y el menú del teléfono. No se persiste.
interface UiApi {
  cestaAbierta: boolean;
  abrirCesta: () => void;
  cerrarCesta: () => void;
  menuAbierto: boolean;
  abrirMenu: () => void;
  cerrarMenu: () => void;
}

const Ctx = createContext<UiApi | null>(null);

export function useUi(): UiApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUi debe usarse dentro de <Tienda>");
  return ctx;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [cestaAbierta, setCesta] = useState(false);
  const [menuAbierto, setMenu] = useState(false);
  const api = useMemo<UiApi>(
    () => ({
      cestaAbierta,
      abrirCesta: () => setCesta(true),
      cerrarCesta: () => setCesta(false),
      menuAbierto,
      abrirMenu: () => setMenu(true),
      cerrarMenu: () => setMenu(false),
    }),
    [cestaAbierta, menuAbierto],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
