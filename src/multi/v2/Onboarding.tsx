// =============================================================================
// MULTI V2 — la nave apagada (capa 1 del juego).
//
// Llegas a un puente a oscuras: la AI te guía a encender los sistemas EN
// ORDEN (reactor → escudos → carta estelar). Cada encendido "prende" una
// capa visual (las estrellas suben de brillo por CSS vía data-encendidos).
// Corto a propósito (<1 min) y siempre saltable: el arranque es onboarding,
// no un muro.
// =============================================================================

import DomoButton from "../../families/domo/DomoButton/DomoButton";
import DomoGauge from "../../families/domo/DomoGauge/DomoGauge";
import DomoStatus from "../../families/domo/DomoStatus/DomoStatus";
import DomoToggle from "../../families/domo/DomoToggle/DomoToggle";
import DomoType from "../../families/domo/DomoType/DomoType";
import { SISTEMAS } from "./content";
import { useGame } from "./state";
import Nave from "./Nave";

export default function Onboarding() {
  const { state, dispatch } = useGame();

  const encendidos = SISTEMAS.filter(([id]) => state.sistemas[id]).length;
  const siguiente = SISTEMAS.find(([id]) => !state.sistemas[id]);
  const voz = siguiente ? siguiente[1].voz : "Todos los sistemas nominales.";

  return (
    <div
      className="domo-scope mv2-dark mv2-espacio mv2-arranque"
      data-encendidos={encendidos}
    >
      <span className="mv2-estrellas" aria-hidden="true" />

      <header className="mv2-hud mv2-arranque__hud">
        <span>Nave AEGIS ◇ energía auxiliar</span>
        <DomoButton size="sm" variant="outline" onClick={() => dispatch({ type: "saltar-onboarding" })}>
          Saltar arranque ▸
        </DomoButton>
      </header>

      <main className="mv2-arranque__centro">
        <span className="mv2-arranque__nave">
          <Nave size={130} />
        </span>

        <div className="mv2-glass mv2-arranque__panel">
          <DomoStatus busy={encendidos < SISTEMAS.length}>
            {encendidos < SISTEMAS.length
              ? `Arranque en frío — ${encendidos}/${SISTEMAS.length} sistemas`
              : "Nave encendida"}
          </DomoStatus>

          <DomoType text={voz} speed={14} />

          <div className="mv2-arranque__sistemas">
            {SISTEMAS.map(([id, info], i) => {
              const previoOn = i === 0 || Boolean(state.sistemas[SISTEMAS[i - 1]?.[0] ?? id]);
              const on = state.sistemas[id];
              return (
                <div
                  key={id}
                  className={`mv2-arranque__sistema ${on ? "is-on" : ""} ${
                    !on && previoOn ? "is-siguiente" : ""
                  }`}
                >
                  <span className="mv2-arranque__nombre">
                    {on ? "◆" : "◇"} {info.nombre}
                  </span>
                  <DomoToggle
                    label={info.nombre}
                    checked={on}
                    disabled={on || !previoOn}
                    onChange={(v) => {
                      if (v) dispatch({ type: "encender", sistema: id });
                    }}
                  />
                </div>
              );
            })}
          </div>

          <DomoGauge
            value={(encendidos / SISTEMAS.length) * 100}
            label="arranque de la nave"
            size={56}
          />
        </div>
      </main>
    </div>
  );
}
