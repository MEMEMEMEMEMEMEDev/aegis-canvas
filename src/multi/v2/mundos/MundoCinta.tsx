// =============================================================================
// MULTI V2 — Radio Cinta (adaptado de V1 + secreto: pedirle una pista a la
// AI DJ marca el hallazgo "dj-a-bordo" en el registro).
// Aquí se enchufa la AI generadora de música real.
// =============================================================================

import { useEffect, useState } from "react";
import CintaButton from "../../../families/cinta/CintaButton/CintaButton";
import CintaDisplay from "../../../families/cinta/CintaDisplay/CintaDisplay";
import CintaLabel from "../../../families/cinta/CintaLabel/CintaLabel";
import CintaMarks from "../../../families/cinta/CintaMarks/CintaMarks";
import CintaPanel from "../../../families/cinta/CintaPanel/CintaPanel";
import CintaScale from "../../../families/cinta/CintaScale/CintaScale";
import CintaTag from "../../../families/cinta/CintaTag/CintaTag";
import CintaTape from "../../../families/cinta/CintaTape/CintaTape";
import CintaTransport from "../../../families/cinta/CintaTransport/CintaTransport";
import type { CintaTransportState } from "../../../families/cinta/CintaTransport/CintaTransport";
import { tiene, useGame } from "../state";

interface Pista {
  titulo: string;
  meta: string;
  color: "amber" | "coral" | "sky";
  dur: number;
}

const PISTAS_BASE: Pista[] = [
  { titulo: "Reactor", meta: "three.js · lado A", color: "amber", dur: 204 },
  { titulo: "Telar OS", meta: "react · lado B", color: "coral", dur: 187 },
  { titulo: "Domo Brief", meta: "ai ready · lado A", color: "sky", dur: 226 },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function MundoCinta() {
  const { state, dispatch } = useGame();
  const [pistas, setPistas] = useState<Pista[]>(PISTAS_BASE);
  const [idx, setIdx] = useState(0);
  const [estado, setEstado] = useState<CintaTransportState>("play");
  const [seg, setSeg] = useState(31);
  const [generando, setGenerando] = useState(false);

  const pista = pistas[idx] ?? PISTAS_BASE[0]!;

  useEffect(() => {
    if (estado !== "play" || generando) return undefined;
    const id = window.setInterval(() => {
      setSeg((s) => {
        if (s + 1 >= pista.dur) {
          setIdx((i) => (i + 1) % pistas.length);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [estado, generando, pista.dur, pistas.length]);

  // La AI "compone" (1.4s de suspenso): aquí se conectaría el modelo
  // generativo real. La cinta nueva se inserta y suena de inmediato.
  useEffect(() => {
    if (!generando) return undefined;
    const id = window.setTimeout(() => {
      const n = pistas.length - PISTAS_BASE.length + 1;
      const colores: Pista["color"][] = ["coral", "sky", "amber"];
      const nueva: Pista = {
        titulo: `AI Mix 0${n}`,
        meta: "generada a bordo",
        color: colores[n % colores.length] ?? "amber",
        dur: 140 + n * 17,
      };
      setPistas([...pistas, nueva]);
      setIdx(pistas.length);
      setSeg(0);
      setEstado("play");
      setGenerando(false);
    }, 1400);
    return () => window.clearTimeout(id);
  }, [generando, pistas]);

  const pedirALaAI = () => {
    setGenerando(true);
    // Secreto in-world: la primera pista encargada a la AI DJ queda en el registro.
    if (!tiene(state, "dj-a-bordo")) dispatch({ type: "logro", id: "dj-a-bordo" });
  };

  return (
    <div className="cinta-scope mv2-radio">
      <header className="mv2-radio__cab">
        <div>
          <h1 className="mv2-radio__logo">
            Radio<span style={{ color: "var(--cinta-coral)" }}>⦿</span>Multiverso
          </h1>
          <CintaMarks tone="amber" running={estado === "play"} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <CintaTag tone="sky">FM 88.8</CintaTag>
          <CintaTag tone="hazard">AI DJ a bordo</CintaTag>
        </div>
      </header>

      <main className="mv2-radio__main">
        <CintaPanel label="Stereo cassette player" labelEnd={`→ TR 0${idx + 1}`}>
          <CintaDisplay
            title={
              generando ? "AI componiendo una pista nueva" : `${pista.titulo} — ${pista.meta}`
            }
            progress={generando ? 0 : (seg / pista.dur) * 100}
            elapsed={generando ? "-:--" : fmt(seg)}
            total={fmt(pista.dur)}
            playing={estado === "play" && !generando}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <CintaTransport
              state={estado}
              onChange={(s) => {
                setEstado(s);
                if (s === "stop") setSeg(0);
              }}
            />
            <CintaButton tone="amber" loading={generando} onClick={pedirALaAI}>
              ⚡ Pídele una pista a la AI
            </CintaButton>
          </div>
          <CintaScale
            marks={pistas.map((_, i) => `TR 0${i + 1}`)}
            value={((idx + 0.5) / pistas.length) * 100}
            label="pista seleccionada"
          />
        </CintaPanel>

        <CintaLabel
          big={String(idx + 1)}
          heading="Ficha"
          rows={[
            ["Pista", pista.titulo],
            ["Fuente", pista.meta],
            ["Duración", fmt(pista.dur)],
          ]}
          footer={
            <p className="mv2-radio__nota">
              Demo: aquí se enchufa el modelo generativo de música real.
            </p>
          }
        />
      </main>

      <section>
        <div className="mv2-radio__tapes">
          {pistas.map((p, i) => (
            <CintaTape
              key={p.titulo}
              title={p.titulo}
              meta={p.meta}
              color={p.color}
              side={i % 2 === 0 ? "A" : "B"}
              playing={estado === "play" && i === idx && !generando}
              selected={i === idx}
              onClick={() => {
                setIdx(i);
                setSeg(0);
                setEstado("play");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
