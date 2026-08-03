// =============================================================================
// MULTI V2 — el orquestador: la experiencia completa.
//
// Routing por estado (sin router): fase arranque → Onboarding; fase puente
// → Puente / mundos / Cubierta. El warp reusa la idea de V1 (viajar =
// deployar: el pipeline real como secuencia de salto a pantalla completa).
// La consola flotante suma el registro de descubrimientos y «nueva
// partida»; el atajo «Canal directo ▸» vive fijo en TODAS las fases y no
// depende del save — el juego jamás bloquea al recruiter.
// =============================================================================

import { useEffect, useReducer, useState } from "react";
import DenkiCombo from "../../families/denki/DenkiCombo/DenkiCombo";
import DomoButton from "../../families/domo/DomoButton/DomoButton";
import DomoGauge from "../../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../../families/domo/DomoGlitch/DomoGlitch";
import DomoStatus from "../../families/domo/DomoStatus/DomoStatus";
import { useDisclosure } from "../../behaviors/useDisclosure";
import { LOGROS, MUNDOS, PIPELINE, type MundoId } from "./content";
import Cubierta from "./Cubierta";
import MundoCinta from "./mundos/MundoCinta";
import MundoFusion from "./mundos/MundoFusion";
import MundoGaceta from "./mundos/MundoGaceta";
import Nave from "./Nave";
import Onboarding from "./Onboarding";
import { borrar, cargar, guardar } from "./persistence";
import Puente from "./Puente";
import {
  GameProvider,
  reducer,
  usePrefiereReposo,
  type GameState,
  type Accion,
} from "./state";

type Vista = "aegis" | MundoId | "cubierta";

// =============================================================================
// SECUENCIA DE SALTO — pantalla completa: la página ES la carga (como V1).
// =============================================================================
function Viaje({ dest, etapa }: { dest: MundoId; etapa: number }) {
  const d = MUNDOS[dest];
  return (
    <div className="domo-scope mv2-dark mv2-espacio mv2-viaje" role="status">
      <span className="mv2-estrellas" aria-hidden="true" />
      <Nave viajando size={170} />
      <div className="mv2-glass mv2-viaje__panel">
        <DomoGlitch intense text={`AEGIS → ${d.nombre}`} className="mv2-viaje__ruta" />
        <DenkiCombo label="Código de salto" sequence={d.combo} speed={300} />
        <div className="mv2-pipeline">
          {PIPELINE.map(([nombre, cmd], i) => (
            <div
              key={nombre}
              className={`mv2-paso ${
                i < etapa ? "is-lista" : i === etapa ? "is-actual" : "is-pendiente"
              }`}
            >
              <span className="mv2-paso__icono" aria-hidden="true">
                {i < etapa ? "✓" : i === etapa ? "▸" : "·"}
              </span>
              <span>{nombre}</span>
              <span className="mv2-paso__cmd">{cmd}</span>
            </div>
          ))}
        </div>
        <DomoGauge
          value={Math.min(100, (etapa / PIPELINE.length) * 100)}
          label="progreso del salto"
          size={64}
        />
        <DomoStatus busy>Deployando al mundo destino</DomoStatus>
      </div>
    </div>
  );
}

// =============================================================================
// CONSOLA FLOTANTE V2 — panel de viaje + registro de descubrimientos.
// =============================================================================
function Consola({
  state,
  dispatch,
  vista,
  onIr,
}: {
  state: GameState;
  dispatch: (a: Accion) => void;
  vista: Vista;
  onIr: (v: Vista) => void;
}) {
  const registro = useDisclosure();
  const [confirmaReset, setConfirmaReset] = useState(false);

  const total = LOGROS.length;
  const ganados = LOGROS.filter(([id]) => state.logros.includes(id)).length;

  const reset = () => {
    if (!confirmaReset) {
      setConfirmaReset(true);
      window.setTimeout(() => setConfirmaReset(false), 3000);
      return;
    }
    borrar();
    dispatch({ type: "reset" });
    setConfirmaReset(false);
    onIr("aegis");
  };

  return (
    <aside className="domo-scope mv2-dark mv2-glass mv2-consola" aria-label="consola AEGIS">
      <div className="mv2-consola__cab">
        <span>Aegis ◆ en órbita</span>
        <DomoGauge value={100} label="integridad del casco" size={40} />
      </div>

      <button
        type="button"
        className="mv2-consola__registro"
        aria-expanded={registro.isOpen}
        onClick={registro.toggle}
      >
        ☰ Registro de descubrimientos — {ganados}/{total}
      </button>

      {registro.isOpen && (
        <ul className="mv2-consola__logros">
          {LOGROS.map(([id, info]) => {
            const ganado = state.logros.includes(id);
            return (
              <li key={id} className={ganado ? "is-ganado" : ""}>
                <span aria-hidden="true">{ganado ? "✓" : "·"}</span>{" "}
                {ganado || !info.secreto ? info.titulo : "? ? ?"}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mv2-consola__botones">
        {vista !== "aegis" && (
          <DomoButton size="sm" onClick={() => onIr("aegis")}>
            ← Puente
          </DomoButton>
        )}
        {state.desbloqueados
          .filter((k) => k !== vista)
          .map((k) => (
            <DomoButton key={k} size="sm" variant="outline" onClick={() => onIr(k)}>
              {MUNDOS[k].nombre} →
            </DomoButton>
          ))}
        <DomoButton size="sm" variant={confirmaReset ? "danger" : "ghost"} onClick={reset}>
          {confirmaReset ? "¿Seguro? Toca otra vez" : "⟲ Nueva partida"}
        </DomoButton>
      </div>
    </aside>
  );
}

// =============================================================================
// LA EXPERIENCIA COMPLETA
// =============================================================================
export default function MultiV2() {
  const [state, dispatch] = useReducer(reducer, undefined, cargar);
  const [vista, setVista] = useState<Vista>("aegis");
  const [retorno, setRetorno] = useState<Vista>("aegis");
  const [viaje, setViaje] = useState<MundoId | null>(null);
  const [etapa, setEtapa] = useState(0);
  const reposo = usePrefiereReposo();

  useEffect(() => {
    guardar(state);
  }, [state]);

  const warp = (dest: MundoId) => {
    if (reposo) {
      setVista(dest);
      return;
    }
    setEtapa(0);
    setViaje(dest);
  };

  // El salto avanza etapa a etapa por el pipeline; al completarlo, aterriza.
  useEffect(() => {
    if (!viaje) return undefined;
    const id = window.setInterval(() => {
      setEtapa((e) => {
        if (e + 1 > PIPELINE.length) {
          window.clearInterval(id);
          setVista(viaje);
          setViaje(null);
          return 0;
        }
        return e + 1;
      });
    }, 620);
    return () => window.clearInterval(id);
  }, [viaje]);

  const abrirCubierta = () => {
    setRetorno(vista);
    setVista("cubierta");
  };

  if (viaje) {
    return (
      <GameProvider value={{ state, dispatch }}>
        <Viaje dest={viaje} etapa={etapa} />
      </GameProvider>
    );
  }

  const enCubierta = vista === "cubierta";
  const enArranque = state.fase === "arranque" && !enCubierta;

  return (
    <GameProvider value={{ state, dispatch }}>
      {/* Canal directo: el atajo recruiter-friendly, visible SIEMPRE. */}
      {!enCubierta && (
        <button type="button" className="mv2-canal-directo" onClick={abrirCubierta}>
          Canal directo ▸
        </button>
      )}

      {enArranque && <Onboarding />}
      {!enArranque && vista === "aegis" && (
        <Puente onWarp={warp} onAbrirCubierta={abrirCubierta} />
      )}
      {vista === "cinta" && <MundoCinta />}
      {vista === "fusion" && <MundoFusion />}
      {vista === "gaceta" && <MundoGaceta />}
      {enCubierta && (
        <Cubierta
          onVolver={() => setVista(state.fase === "arranque" ? "aegis" : retorno)}
        />
      )}

      {state.fase === "puente" && (
        <Consola state={state} dispatch={dispatch} vista={vista} onIr={setVista} />
      )}
    </GameProvider>
  );
}
