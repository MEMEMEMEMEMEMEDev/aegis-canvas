// =============================================================================
// MULTI V3 — el orquestador: hub ⇄ mundos, con el warp exprés entre medio.
//
// El warp funde lo mejor de dos épocas: la brevedad del overlay de DomoV2
// (~1.3s) con el pipeline real de V1 (las cinco etapas pasan como chips).
// prefers-reduced-motion = aterrizaje instantáneo. El scroll se resetea al
// aterrizar (cada mundo empieza por su portada).
// =============================================================================

import { useEffect, useState, type ComponentType } from "react";
import DomoCut from "../../families/domo/DomoCut/DomoCut";
import DomoGauge from "../../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../../families/domo/DomoGlitch/DomoGlitch";
import DomoType from "../../families/domo/DomoType/DomoType";
import { MUNDOS, PIPELINE, type MundoId } from "./content";
import Hub from "./Hub";
import Marco from "./Marco";
import MundoCinta from "./mundos/MundoCinta";
import MundoFusion from "./mundos/MundoFusion";
import MundoGaceta from "./mundos/MundoGaceta";
import MundoKoi from "./mundos/MundoKoi";
import MundoTebeo from "./mundos/MundoTebeo";
import { HallazgosProvider, useHallazgosState, usePrefiereReposo } from "./state";

const VISTAS: Record<MundoId, ComponentType> = {
  koi: MundoKoi,
  tebeo: MundoTebeo,
  cinta: MundoCinta,
  fusion: MundoFusion,
  gaceta: MundoGaceta,
};

function Warp({ dest, etapa }: { dest: MundoId; etapa: number }) {
  const d = MUNDOS[dest];
  return (
    <div className="mv3 mv3-warp" role="status">
      <DomoCut cut="blade" title="Transferencia" status={d.url.replace("https://", "")} className="mv3-warp__panel">
        <DomoGlitch intense text={`AEGIS → ${d.nombre}`} className="mv3-warp__ruta" />
        <DomoType text={`Ruta establecida. Deployando entorno ${d.familia}…`} speed={10} />
        <div className="mv3-warp__pipeline" aria-hidden="true">
          {PIPELINE.map(([nombre], i) => (
            <span
              key={nombre}
              className={`mv3-warp__chip ${i < etapa ? "is-lista" : i === etapa ? "is-actual" : ""}`}
            >
              {i < etapa ? "✓ " : ""}
              {nombre}
            </span>
          ))}
        </div>
        <DomoGauge value={Math.min(100, (etapa / PIPELINE.length) * 100)} label="transferencia" size={64} />
      </DomoCut>
    </div>
  );
}

export default function MultiV3() {
  const hallazgos = useHallazgosState();
  const reposo = usePrefiereReposo();
  const [vista, setVista] = useState<"hub" | MundoId>("hub");
  const [warp, setWarp] = useState<MundoId | null>(null);
  const [etapa, setEtapa] = useState(0);

  const aterrizar = (dest: "hub" | MundoId) => {
    setVista(dest);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const viajar = (dest: MundoId) => {
    if (dest === vista) return;
    if (reposo) {
      aterrizar(dest);
      return;
    }
    setEtapa(0);
    setWarp(dest);
  };

  // Warp exprés: 5 etapas × 260ms ≈ 1.3s (la brevedad de DomoV2).
  useEffect(() => {
    if (!warp) return undefined;
    const id = window.setInterval(() => {
      setEtapa((e) => {
        if (e + 1 > PIPELINE.length) {
          window.clearInterval(id);
          aterrizar(warp);
          setWarp(null);
          return 0;
        }
        return e + 1;
      });
    }, 260);
    return () => window.clearInterval(id);
  }, [warp]);

  const Mundo = vista === "hub" ? null : VISTAS[vista];

  return (
    <HallazgosProvider value={hallazgos}>
      {vista === "hub" ? (
        <Hub viajar={viajar} />
      ) : (
        <Marco mundo={vista} viajar={viajar} alHub={() => aterrizar("hub")}>
          {Mundo && <Mundo />}
        </Marco>
      )}
      {warp && <Warp dest={warp} etapa={etapa} />}
    </HallazgosProvider>
  );
}
