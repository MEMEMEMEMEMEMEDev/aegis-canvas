import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import VitrinaAviso, { VitrinaAvisoPila } from "../VitrinaAviso/VitrinaAviso";

export type TonoAviso = "ok" | "aviso" | "error" | "neutro";

export interface Aviso {
  id: number;
  tono: TonoAviso;
  texto: ReactNode;
  accion?: { label: string; onClick: () => void };
}

interface AvisosApi {
  avisar: (tono: TonoAviso, texto: ReactNode, accion?: Aviso["accion"]) => void;
  quitar: (id: number) => void;
}

const Ctx = createContext<AvisosApi | null>(null);

export function useAvisos(): AvisosApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAvisos debe usarse dentro de <AvisosProvider>");
  return ctx;
}

/** La cola de toasts: como mucho tres a la vez; el más viejo se va. */
export function AvisosProvider({ children }: { children: ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  const quitar = useCallback((id: number) => setAvisos((a) => a.filter((x) => x.id !== id)), []);
  const avisar = useCallback<AvisosApi["avisar"]>((tono, texto, accion) => {
    const id = Date.now() + Math.random();
    setAvisos((a) => [...a.slice(-2), { id, tono, texto, accion }]);
  }, []);

  const api = useMemo(() => ({ avisar, quitar }), [avisar, quitar]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <VitrinaAvisoPila>
        {avisos.map((a) => (
          <VitrinaAviso
            key={a.id}
            tono={a.tono}
            texto={a.texto}
            onCerrar={() => quitar(a.id)}
            accion={
              a.accion
                ? {
                    label: a.accion.label,
                    onClick: () => {
                      a.accion?.onClick();
                      quitar(a.id);
                    },
                  }
                : undefined
            }
          />
        ))}
      </VitrinaAvisoPila>
    </Ctx.Provider>
  );
}
