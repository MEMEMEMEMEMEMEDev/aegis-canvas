// =============================================================================
// MULTI V2 — el puente de mando (fase "puente").
//
// Aquí vive el corazón del juego: la AI de vuelo (con motor de reglas de
// verdad), la carta estelar con señales sin identificar, el radiotelescopio,
// la sala de máquinas con el recorte interceptado, y la puerta a la
// Cubierta de registros. Armar un código de salto monta el ComboPad; el
// combo ejecutado desbloquea el mundo Y viaja (viajar = deployar).
// =============================================================================

import { useState } from "react";
import DenkiBarcode from "../../families/denki/DenkiBarcode/DenkiBarcode";
import DenkiCombo from "../../families/denki/DenkiCombo/DenkiCombo";
import DenkiTag from "../../families/denki/DenkiTag/DenkiTag";
import DomoButton from "../../families/domo/DomoButton/DomoButton";
import DomoCut from "../../families/domo/DomoCut/DomoCut";
import DomoGauge from "../../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../../families/domo/DomoGlitch/DomoGlitch";
import DomoPrompt from "../../families/domo/DomoPrompt/DomoPrompt";
import DomoReadout from "../../families/domo/DomoReadout/DomoReadout";
import DomoStatus from "../../families/domo/DomoStatus/DomoStatus";
import DomoType from "../../families/domo/DomoType/DomoType";
import { responder } from "./ai";
import ComboPad from "./ComboPad";
import { MUNDOS, MUNDO_IDS, VOZ_NAVE_LISTA, type MundoId } from "./content";
import Nave from "./Nave";
import { tiene, useGame } from "./state";
import { RadioTelescopio, RecorteGaceta } from "./Unlocks";

const QUEJAS_COMBO = [
  "Casi. El hipermotor es quisquilloso con el orden.",
  "Secuencia rechazada. Respira, tripulante: el ritmo importa más que la prisa.",
  "Tercera ley del salto: equivocarse también es navegar. Pero si quieres, te abro la puerta manual.",
];

const QUEJA_CASCO =
  "…¿acabas de tocarme el casco tres veces? Registrado como «manos en el casco». El seguro no cubre huellas.";

export interface PuenteProps {
  onWarp: (dest: MundoId) => void;
  onAbrirCubierta: () => void;
}

export default function Puente({ onWarp, onAbrirCubierta }: PuenteProps) {
  const { state, dispatch } = useGame();

  const [voz, setVoz] = useState(() =>
    state.desbloqueados.length > 0
      ? "De vuelta en el puente. La carta estelar sigue donde la dejaste — y yo sigo aquí, orbitando con estilo."
      : VOZ_NAVE_LISTA,
  );
  const [armado, setArmado] = useState<MundoId | null>(null);
  const [toques, setToques] = useState(0);
  const [molesta, setMolesta] = useState(false);

  const hallazgo = (texto: string) => setVoz(texto);

  const tocarCasco = () => {
    setMolesta(true);
    window.setTimeout(() => setMolesta(false), 700);
    const n = toques + 1;
    setToques(n);
    if (n >= 3 && !tiene(state, "manos-en-el-casco")) {
      dispatch({ type: "logro", id: "manos-en-el-casco" });
      setVoz(QUEJA_CASCO);
    }
  };

  const preguntar = (texto: string) => {
    if (!tiene(state, "primer-contacto")) dispatch({ type: "logro", id: "primer-contacto" });
    const res = responder(texto, state);
    setVoz(res.texto);
    if (res.accion) dispatch(res.accion);
    if (res.ui === "abrir-cubierta") onAbrirCubierta();
  };

  const ejecutado = (mundo: MundoId) => {
    dispatch({ type: "desbloquear", mundo });
    setArmado(null);
    onWarp(mundo);
  };

  const falloCombo = () => {
    dispatch({ type: "fallo-combo" });
    const queja = QUEJAS_COMBO[Math.min(state.intentosCombo, QUEJAS_COMBO.length - 1)];
    if (queja) setVoz(queja);
  };

  const abrirPuerta = () => {
    if (!tiene(state, "canal-directo")) dispatch({ type: "logro", id: "canal-directo" });
    onAbrirCubierta();
  };

  return (
    <div className="domo-scope mv2-dark mv2-espacio mv2-puente">
      <span className="mv2-estrellas" aria-hidden="true" />

      <header className="mv2-hud">
        <span>Nave AEGIS ◆ Puente de mando</span>
        <span className="mv2-hud__cicd">CI/CD en línea</span>
      </header>

      <section className="mv2-hero">
        <Nave molesta={molesta} onClick={tocarCasco} />
        <div className="mv2-hero__col">
          <span className="mv2-kicker">◇ Registro de vuelo — aegis-canvas@0.2.0</span>
          <h1 className="mv2-titulo">Multi V2.</h1>
          <DomoType text={voz} speed={14} />
          <DomoPrompt
            label="hablar con la AI de vuelo"
            placeholder="Pregúntale a la nave… (di «ayuda» si te pierdes)"
            onSubmit={preguntar}
          />
        </div>
      </section>

      <section className="mv2-seccion">
        <h2 className="mv2-seccion__titulo">Carta estelar — tres señales sin identificar</h2>
        <div className="mv2-destinos">
          {MUNDO_IDS.map((key, idx) => {
            const d = MUNDOS[key];
            const descubierto = state.descubiertos.includes(key);
            const desbloqueado = state.desbloqueados.includes(key);

            if (!descubierto) {
              return (
                <article className="mv2-glass mv2-destino mv2-destino--incognita" key={key}>
                  <DenkiTag>{d.senal}</DenkiTag>
                  <h3 className="mv2-destino__nombre">
                    <DomoGlitch text="? ? ?" />
                  </h3>
                  <p className="mv2-destino__desc">{d.comoSeDescubre}</p>
                  <DomoReadout label="Estado" value="Sin identificar" />
                </article>
              );
            }

            return (
              <article className="mv2-glass mv2-destino" key={key}>
                <DenkiTag>{d.sub}</DenkiTag>
                <h3 className={`mv2-destino__nombre mv2-destino__nombre--${key}`}>{d.nombre}</h3>
                <p className="mv2-destino__desc">{d.desc}</p>

                {desbloqueado ? (
                  <>
                    <DomoStatus>Rumbo en memoria — salto directo disponible</DomoStatus>
                    <DomoButton onClick={() => onWarp(key)}>Fijar rumbo →</DomoButton>
                  </>
                ) : armado === key ? (
                  <>
                    <ComboPad
                      sequence={d.combo}
                      label={`código de salto a ${d.nombre}`}
                      onSuccess={() => ejecutado(key)}
                      onFail={falloCombo}
                    />
                    <div className="mv2-destino__acciones">
                      <DomoButton size="sm" variant="outline" onClick={() => setArmado(null)}>
                        Cancelar
                      </DomoButton>
                      {state.intentosCombo >= 3 && (
                        <DomoButton size="sm" onClick={() => ejecutado(key)}>
                          Autorizar salto manual →
                        </DomoButton>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <DenkiCombo label="Código de salto" sequence={d.combo} speed={520} />
                    <DomoButton onClick={() => setArmado(key)}>
                      Armar secuencia {`0${idx + 1}`} →
                    </DomoButton>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mv2-seccion">
        <h2 className="mv2-seccion__titulo">Radiotelescopio — banda FM</h2>
        <RadioTelescopio onHallazgo={hallazgo} />
      </section>

      <section className="mv2-seccion">
        <h2 className="mv2-seccion__titulo">Sala de máquinas — así se construye esto</h2>
        <DomoType
          speed={8}
          text="Documentación viva: cada sistema es una etapa real del pipeline de este repo. Y ojo con lo que hay clavado entre las máquinas — no todo llegó aquí por accidente."
        />
        <div className="mv2-maquinas">
          <DomoCut cut="chamfer" title="Reactor" status="tsc">
            <div className="mv2-maquina__fila">
              <DomoReadout label="Tipos" value="100%" />
              <DomoGauge value={100} label="typecheck" size={56} />
            </div>
            <p className="mv2-cmd">npm run typecheck — cero errores o no hay salto.</p>
          </DomoCut>
          <DomoCut cut="blade" title="Escudos" status="sass">
            <div className="mv2-maquina__fila">
              <DomoReadout label="Familias" value="07" />
              <DomoGauge value={100} label="estilos" size={56} />
            </div>
            <p className="mv2-cmd">Cada .scss compila solo: tokens → contrato --ds-*.</p>
          </DomoCut>
          <DomoCut cut="notch" title="Hangar" status="storybook">
            <div className="mv2-maquina__fila">
              <DomoReadout label="Vistas" value="16+" />
              <DomoGauge value={100} label="build" size={56} />
            </div>
            <p className="mv2-cmd">build-storybook empaqueta todos los mundos.</p>
          </DomoCut>
          <DomoCut cut="chamfer" title="Salto" status="deploy">
            <DomoStatus busy>Cada push publica una órbita nueva</DomoStatus>
            <p className="mv2-cmd">git push → pipeline → el multiverso en producción.</p>
          </DomoCut>
        </div>
        <RecorteGaceta onHallazgo={hallazgo} />
      </section>

      <section className="mv2-seccion">
        <h2 className="mv2-seccion__titulo">Cubierta de registros</h2>
        <div className="mv2-glass mv2-puerta">
          <div className="mv2-puerta__col">
            <DomoReadout label="Sección" value="Bitácora · Expediente · Comunicaciones" />
            <p className="mv2-destino__desc">
              La parte de la nave donde vive un humano normal: blog, quién soy y cómo
              contactarme. Sin combos, sin warp — palabra de AI.
            </p>
          </div>
          <DomoButton onClick={abrirPuerta}>Abrir cubierta →</DomoButton>
        </div>
      </section>

      <footer className="mv2-pie">
        <DenkiBarcode code="4 202600 000002" />
        <DomoStatus>
          Sistemas nominales · {state.desbloqueados.length}/3 rumbos en memoria ◆
        </DomoStatus>
      </footer>
    </div>
  );
}
