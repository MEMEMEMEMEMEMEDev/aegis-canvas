// =============================================================================
// MULTI V2 — las mini-interacciones de descubrimiento.
//
// Cada señal se descubre DISTINTO y con la estética de su mundo:
//   · CINTA  → RadioTelescopio: sintonizar FM 88.8 a mano (isla cinta-scope)
//   · GACETA → RecorteGaceta: encontrar la errata en un recorte de prensa
//              (isla tebeo-scope clavada en la sala de máquinas)
//   · FUSIÓN → se descubre hablándole a la AI (vive en ai.ts, no aquí)
//
// Ambos componentes avisan al puente por onHallazgo(texto): la AI comenta
// el descubrimiento con su propia voz.
// =============================================================================

import { useState } from "react";
import CintaButton from "../../families/cinta/CintaButton/CintaButton";
import CintaDisplay from "../../families/cinta/CintaDisplay/CintaDisplay";
import CintaMarks from "../../families/cinta/CintaMarks/CintaMarks";
import CintaPanel from "../../families/cinta/CintaPanel/CintaPanel";
import CintaScale from "../../families/cinta/CintaScale/CintaScale";
import CintaTag from "../../families/cinta/CintaTag/CintaTag";
import KoiHanko from "../../families/koi/KoiHanko/KoiHanko";
import TebeoHeadline from "../../families/tebeo/TebeoHeadline/TebeoHeadline";
import TebeoTag from "../../families/tebeo/TebeoTag/TebeoTag";
import {
  ERRATA_REVELACION,
  FM_FANTASMA,
  FM_INICIO,
  FM_MAX,
  FM_MIN,
  FM_OBJETIVO,
  FM_PASO,
  FM_PASO_GRUESO,
  RECORTE,
} from "./content";
import { tiene, useGame } from "./state";

const cerca = (a: number, b: number) => Math.abs(a - b) < 0.05;

// --- Radiotelescopio: el desbloqueo de CINTA ---------------------------------

export function RadioTelescopio({ onHallazgo }: { onHallazgo: (texto: string) => void }) {
  const { state, dispatch } = useGame();
  const descubierta = state.descubiertos.includes("cinta");
  const [fm, setFm] = useState(descubierta ? FM_OBJETIVO : FM_INICIO);

  const sintonizada = descubierta || cerca(fm, FM_OBJETIVO);

  const mover = (delta: number) => {
    if (descubierta) return;
    const next = Math.round(Math.min(FM_MAX, Math.max(FM_MIN, fm + delta)) * 10) / 10;
    setFm(next);
    if (cerca(next, FM_OBJETIVO)) {
      dispatch({ type: "descubrir", mundo: "cinta" });
      onHallazgo(
        "¡Señal clara en FM 88.8! Es Radio Cinta — el walkman del multiverso. Código de salto anotado en la carta estelar.",
      );
    } else if (cerca(next, FM_FANTASMA) && !tiene(state, "frecuencia-fantasma")) {
      dispatch({ type: "logro", id: "frecuencia-fantasma" });
      onHallazgo(
        "…eso que acabas de sintonizar no figura en ningún catálogo. FM 107.9 no emite. NADIE emite ahí. Lo anoto como «frecuencia fantasma» y no volvemos a hablar de esto.",
      );
    }
  };

  return (
    <div className="cinta-scope mv2-telescopio">
      <CintaPanel label="Radiotelescopio AEGIS" labelEnd={sintonizada ? "◆ FIJADA" : "→ BARRIDO"}>
        <CintaDisplay
          title={
            sintonizada
              ? "SEÑAL CLARA — Radio Cinta · FM 88.8"
              : `FM ${fm.toFixed(1)} — estática…`
          }
          progress={sintonizada ? 100 : Math.max(0, 100 - Math.abs(fm - FM_OBJETIVO) * 9)}
          elapsed={sintonizada ? "88.8" : fm.toFixed(1)}
          total="MHz"
          playing={sintonizada}
        />
        <CintaScale
          marks={["87", "92", "97", "102", "108"]}
          value={((fm - FM_MIN) / (FM_MAX - FM_MIN)) * 100}
          label="frecuencia sintonizada"
        />
        <div className="mv2-telescopio__mandos">
          <CintaButton size="sm" onClick={() => mover(-FM_PASO_GRUESO)} disabled={descubierta}>
            ◀◀
          </CintaButton>
          <CintaButton size="sm" onClick={() => mover(-FM_PASO)} disabled={descubierta}>
            ◀
          </CintaButton>
          <CintaButton size="sm" onClick={() => mover(FM_PASO)} disabled={descubierta}>
            ▶
          </CintaButton>
          <CintaButton size="sm" onClick={() => mover(FM_PASO_GRUESO)} disabled={descubierta}>
            ▶▶
          </CintaButton>
          {sintonizada ? (
            <CintaTag tone="hazard">SEÑAL 01 IDENTIFICADA</CintaTag>
          ) : (
            <CintaTag tone="sky">barre la banda</CintaTag>
          )}
        </div>
        <CintaMarks tone="amber" running={sintonizada} />
      </CintaPanel>
    </div>
  );
}

// --- El recorte interceptado: el desbloqueo de GACETA -------------------------

export function RecorteGaceta({ onHallazgo }: { onHallazgo: (texto: string) => void }) {
  const { state, dispatch } = useGame();
  const resuelto = state.descubiertos.includes("gaceta");

  const elegir = (i: number) => {
    if (resuelto) return;
    const palabra = RECORTE.palabras[i];
    if (!palabra) return;
    if (palabra.correcta) {
      dispatch({ type: "descubrir", mundo: "gaceta" });
      onHallazgo(ERRATA_REVELACION);
    } else if (palabra.burla) {
      onHallazgo(palabra.burla);
    }
  };

  return (
    <div className="tebeo-scope mv2-recorte">
      <div className="mv2-recorte__papel">
        <TebeoHeadline as="h3" size="section">
          Recorte interceptado<em>!</em>
        </TebeoHeadline>
        <p className="mv2-recorte__texto">
          {RECORTE.antes}{" "}
          {RECORTE.palabras.map((p, i) => (
            <span key={p.texto}>
              <button
                type="button"
                className="mv2-recorte__palabra"
                onClick={() => elegir(i)}
                disabled={resuelto}
              >
                <TebeoTag {...(resuelto && p.correcta ? { tone: "sun" as const } : {})}>
                  {p.texto}
                </TebeoTag>
              </button>{" "}
            </span>
          ))}
          {RECORTE.despues}
        </p>
        <p className="mv2-recorte__nota">
          {resuelto
            ? "Errata confirmada por la AI de vuelo — rumbo revelado."
            : "La AI jura que UNA de las palabras marcadas miente. Tócala."}
        </p>
        {resuelto && (
          <span className="koi-scope mv2-recorte__sello">
            <KoiHanko char="正" size={64} label="errata verificada" />
          </span>
        )}
      </div>
    </div>
  );
}
