// =============================================================================
// MULTI V3 — el hub: la entrada simple que ganó (herencia directa de DomoV2).
//
// Deck de cuatro slides, cero scroll, cero fricción: Portada (la AI te
// recibe), Portales (los cinco mundos a un clic), Sistema (cómo está hecho
// + hallazgos) y Contacto (recruiter-friendly, links de verdad). La AI
// puede pilotear el deck y también viajar por ti.
// =============================================================================

import { useState } from "react";
import DomoButton from "../../families/domo/DomoButton/DomoButton";
import DomoCut from "../../families/domo/DomoCut/DomoCut";
import DomoDeck, { DomoSlide } from "../../families/domo/DomoDeck/DomoDeck";
import DomoGauge from "../../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../../families/domo/DomoGlitch/DomoGlitch";
import DomoPrompt from "../../families/domo/DomoPrompt/DomoPrompt";
import DomoReadout from "../../families/domo/DomoReadout/DomoReadout";
import DomoStatus from "../../families/domo/DomoStatus/DomoStatus";
import DomoType from "../../families/domo/DomoType/DomoType";
import { responder } from "./ai";
import { CONTACTO, EXPEDIENTE, HALLAZGOS, MUNDOS, MUNDO_IDS, type MundoId } from "./content";
import { useHallazgos } from "./state";

const VOZ_INICIAL =
  "Bienvenido al multiverso, tercera órbita. Cinco mundos, cinco pieles, una sola aplicación. Navega con las flechas, o dime a dónde quieres ir — yo piloteo.";

export default function Hub({ viajar }: { viajar: (dest: MundoId) => void }) {
  const hallazgos = useHallazgos();
  const [slide, setSlide] = useState(0);
  const [voz, setVoz] = useState(VOZ_INICIAL);

  const preguntar = (texto: string) => {
    const res = responder(texto, hallazgos.lista);
    setVoz(res.texto);
    if (res.slide === "portales") setSlide(1);
    if (res.slide === "contacto") setSlide(3);
    if (res.viajar) window.setTimeout(() => viajar(res.viajar!), 900);
  };

  const tocarPunto = () => {
    if (hallazgos.marcar("wonk"))
      setVoz(
        "…tocaste el punto final. Es Fraunces, la primera serif del sistema — tiene un eje de torcedura que se llama WONK, en serio. Hallazgo anotado.",
      );
  };

  return (
    <div className="domo-scope mv3 mv3-hub">
      <header className="mv3-hud">
        <span>
          AEGIS OS v3<span className="mv3-hud__sep">◆</span>Multiverso
        </span>
        <span className="mv3-hud__ruta">
          {["Portada", "Portales", "Sistema", "Contacto"][slide] ?? "Portada"} · {slide + 1}/4
        </span>
      </header>

      <DomoDeck label="multiverso v3" index={slide} onIndexChange={setSlide}>
        {/* ---- 01 · PORTADA ---- */}
        <DomoSlide title="Portada">
          <div className="mv3-portada">
            <span className="mv3-kicker">◇ aegis-canvas — tercera órbita</span>
            <h1 className="mv3-titulo">
              Multiverso
              <button
                type="button"
                className="mv3-titulo__punto"
                aria-label="punto final (parece decorativo)"
                onClick={tocarPunto}
              >
                .
              </button>
            </h1>
            <DomoType text={voz} speed={15} />
            <DomoPrompt
              label="hablar con la AI de ruta"
              placeholder="«llévame a la radio», «contacto», «ayuda»…"
              onSubmit={preguntar}
            />
            <p className="mv3-portada__hint">→ navega el deck con las flechas del teclado</p>
          </div>
        </DomoSlide>

        {/* ---- 02 · PORTALES ---- */}
        <DomoSlide title="Portales">
          <div className="mv3-portales">
            <h2 className="mv3-subtitulo">Cinco mundos, un clic</h2>
            <div className="mv3-portales__grid">
              {MUNDO_IDS.map((id, i) => {
                const m = MUNDOS[id];
                return (
                  <DomoCut
                    key={id}
                    cut={m.cut}
                    title={m.nombre}
                    status={`Portal 0${i + 1}`}
                    className="mv3-portal"
                  >
                    <p className="mv3-portal__desc">{m.desc}</p>
                    <div className="mv3-portal__pie">
                      <span className="mv3-portal__url">{m.url.replace("https://", "")}</span>
                      <DomoButton size="sm" onClick={() => viajar(id)}>
                        Viajar →
                      </DomoButton>
                    </div>
                  </DomoCut>
                );
              })}
            </div>
          </div>
        </DomoSlide>

        {/* ---- 03 · SISTEMA ---- */}
        <DomoSlide title="Sistema">
          <div className="mv3-sistema">
            <h2 className="mv3-subtitulo">Cómo está hecho</h2>
            <div className="mv3-sistema__grid">
              <DomoCut cut="blade" title="Fundación" status="@ahroi">
                <div className="mv3-sistema__fila">
                  <DomoReadout label="Mundos" value="05" />
                  <DomoReadout label="Familias" value="07" />
                  <DomoGauge value={100} label="tokens" size={56} />
                </div>
                <p className="mv3-cmd">tokens → primitivos headless → familias que visten.</p>
              </DomoCut>
              <DomoCut cut="notch" title="Voz nueva" status="serif">
                <p className="mv3-sistema__fraunces">Fraunces</p>
                <p className="mv3-cmd">
                  La primera serif del sistema (display del OS) + Spline Sans Mono en consola.
                  Ambas OFL, self-hosted.
                </p>
              </DomoCut>
              <DomoCut cut="chamfer" tone="ink" title="Hallazgos" status={`${hallazgos.lista.length}/4`}>
                <ul className="mv3-sistema__hallazgos">
                  {HALLAZGOS.map(([id, titulo]) => (
                    <li key={id} className={hallazgos.tiene(id) ? "is-ganado" : ""}>
                      {hallazgos.tiene(id) ? `✦ ${titulo}` : "✧ ? ? ?"}
                    </li>
                  ))}
                </ul>
                <DomoStatus busy={hallazgos.lista.length < 4}>
                  {hallazgos.lista.length < 4
                    ? "Toca lo que parezca decorativo"
                    : "Multiverso al 100%"}
                </DomoStatus>
                {hallazgos.lista.length > 0 && (
                  <DomoButton size="sm" variant="ghost" onClick={hallazgos.reiniciar}>
                    ⟲ Olvidar hallazgos
                  </DomoButton>
                )}
              </DomoCut>
            </div>
          </div>
        </DomoSlide>

        {/* ---- 04 · CONTACTO ---- */}
        <DomoSlide title="Contacto">
          <div className="mv3-contacto">
            <DomoCut cut="blade" title="Expediente" status="humano" className="mv3-contacto__panel">
              <h2 className="mv3-contacto__nombre">{EXPEDIENTE.nombre}</h2>
              <DomoReadout label="Rol" value={EXPEDIENTE.rol} />
              <p className="mv3-contacto__bio">{EXPEDIENTE.bio}</p>
              <div className="mv3-contacto__links">
                <a className="mv3-link" href={`mailto:${CONTACTO.email}`}>
                  ✉ {CONTACTO.email}
                </a>
                <a className="mv3-link" href={CONTACTO.github} target="_blank" rel="noreferrer">
                  ◆ GitHub
                </a>
                <a className="mv3-link" href={CONTACTO.linkedin} target="_blank" rel="noreferrer">
                  ◆ LinkedIn
                </a>
              </div>
              <DomoStatus busy>Se responde en horario terrestre</DomoStatus>
            </DomoCut>
            <div className="mv3-contacto__glitch">
              <DomoGlitch text="Gracias por viajar ◆" />
            </div>
          </div>
        </DomoSlide>
      </DomoDeck>
    </div>
  );
}
