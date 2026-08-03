// =============================================================================
// MULTI V3 — el marco de mundo: la ventana de navegador falsa de DomoV2,
// ahora a página completa y con la barra STICKY (la ilusión de «otra web»
// sobrevive al scroll). Debajo, la consola de vuelo mínima: volver al hub,
// saltar al mundo vecino y el contador de hallazgos — pilotaje sin ruido.
// =============================================================================

import type { ReactNode } from "react";
import DomoButton from "../../families/domo/DomoButton/DomoButton";
import { HALLAZGOS, MUNDOS, MUNDO_IDS, type MundoId } from "./content";
import { useHallazgos } from "./state";

export interface MarcoProps {
  mundo: MundoId;
  viajar: (dest: MundoId) => void;
  alHub: () => void;
  children: ReactNode;
}

export default function Marco({ mundo, viajar, alHub, children }: MarcoProps) {
  const hallazgos = useHallazgos();
  const idx = MUNDO_IDS.indexOf(mundo);
  const prev = MUNDO_IDS[(idx - 1 + MUNDO_IDS.length) % MUNDO_IDS.length]!;
  const next = MUNDO_IDS[(idx + 1) % MUNDO_IDS.length]!;

  return (
    <div className="mv3 mv3-mundo">
      <div className="domo-scope mv3-barra">
        <span className="mv3-barra__dots" aria-hidden="true">
          ●●●
        </span>
        <span className="mv3-barra__url">{MUNDOS[mundo].url}</span>
        <span className="mv3-barra__os">vía AEGIS OS</span>
      </div>

      <div className="mv3-mundo__pagina">{children}</div>

      <aside className="domo-scope mv3-consola" aria-label="consola AEGIS">
        <DomoButton size="sm" onClick={alHub}>
          ◆ Hub
        </DomoButton>
        <DomoButton
          size="sm"
          variant="outline"
          onClick={() => viajar(prev)}
          aria-label={`mundo anterior: ${MUNDOS[prev].nombre}`}
        >
          ←
        </DomoButton>
        <DomoButton
          size="sm"
          variant="outline"
          onClick={() => viajar(next)}
          aria-label={`mundo siguiente: ${MUNDOS[next].nombre}`}
        >
          →
        </DomoButton>
        <span
          className="mv3-consola__hallazgos"
          title="hallazgos del multiverso"
          aria-label={`hallazgos: ${hallazgos.lista.length} de ${HALLAZGOS.length}`}
        >
          ✦ {hallazgos.lista.length}/{HALLAZGOS.length}
        </span>
      </aside>
    </div>
  );
}
