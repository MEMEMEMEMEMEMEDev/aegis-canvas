// =============================================================================
// MULTI V3 — Radio Cinta: el walkman, ahora con ecualizador vivo (CintaEq,
// componente NUEVO de la familia) y los cassettes en un slider scroll-snap.
// Secreto: encargarle una pista a la AI DJ (hallazgo «dj-a-bordo»).
// =============================================================================

import { useEffect, useState } from "react";
import CintaButton from "../../../families/cinta/CintaButton/CintaButton";
import CintaDisplay from "../../../families/cinta/CintaDisplay/CintaDisplay";
import CintaEq from "../../../families/cinta/CintaEq/CintaEq";
import CintaLabel from "../../../families/cinta/CintaLabel/CintaLabel";
import CintaMarks from "../../../families/cinta/CintaMarks/CintaMarks";
import CintaPanel from "../../../families/cinta/CintaPanel/CintaPanel";
import CintaTag from "../../../families/cinta/CintaTag/CintaTag";
import CintaTape from "../../../families/cinta/CintaTape/CintaTape";
import CintaTransport from "../../../families/cinta/CintaTransport/CintaTransport";
import type { CintaTransportState } from "../../../families/cinta/CintaTransport/CintaTransport";
import { useHallazgos } from "../state";

interface Pista {
  titulo: string;
  meta: string;
  color: "amber" | "coral" | "sky";
  dur: number;
}

const PISTAS_BASE: Pista[] = [
  { titulo: "Órbita 3", meta: "aegis · lado A", color: "amber", dur: 194 },
  { titulo: "Serif Nocturna", meta: "fraunces · lado B", color: "coral", dur: 172 },
  { titulo: "Parallax", meta: "scroll · lado A", color: "sky", dur: 216 },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function MundoCinta() {
  const hallazgos = useHallazgos();
  const [pistas, setPistas] = useState<Pista[]>(PISTAS_BASE);
  const [idx, setIdx] = useState(0);
  const [estado, setEstado] = useState<CintaTransportState>("play");
  const [seg, setSeg] = useState(24);
  const [generando, setGenerando] = useState(false);

  const pista = pistas[idx] ?? PISTAS_BASE[0]!;
  const sonando = estado === "play" && !generando;

  useEffect(() => {
    if (!sonando) return undefined;
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
  }, [sonando, pista.dur, pistas.length]);

  // La AI "compone" (1.4s de suspenso): aquí se enchufa el modelo real.
  useEffect(() => {
    if (!generando) return undefined;
    const id = window.setTimeout(() => {
      const n = pistas.length - PISTAS_BASE.length + 1;
      const colores: Pista["color"][] = ["coral", "sky", "amber"];
      setPistas([
        ...pistas,
        {
          titulo: `AI Mix 0${n}`,
          meta: "generada a bordo",
          color: colores[n % colores.length] ?? "amber",
          dur: 150 + n * 13,
        },
      ]);
      setIdx(pistas.length);
      setSeg(0);
      setEstado("play");
      setGenerando(false);
    }, 1400);
    return () => window.clearTimeout(id);
  }, [generando, pistas]);

  return (
    <div className="cinta-scope mv3c">
      {/* ---- HERO: el reproductor ---- */}
      <section className="mv3c-hero">
        <header className="mv3c-cab">
          <h1 className="mv3c-logo">
            Radio<span style={{ color: "var(--cinta-coral)" }}>⦿</span>Cinta
          </h1>
          <div className="mv3c-cab__tags">
            <CintaTag tone="sky">FM 88.8</CintaTag>
            <CintaTag tone="hazard">AI DJ a bordo</CintaTag>
          </div>
        </header>

        <CintaPanel label="Stereo cassette player" labelEnd={`→ TR 0${idx + 1}`}>
          <CintaDisplay
            title={generando ? "AI componiendo una pista nueva" : `${pista.titulo} — ${pista.meta}`}
            progress={generando ? 0 : (seg / pista.dur) * 100}
            elapsed={generando ? "-:--" : fmt(seg)}
            total={fmt(pista.dur)}
            playing={sonando}
          />
          <div className="mv3c-fila">
            <CintaTransport
              state={estado}
              onChange={(s) => {
                setEstado(s);
                if (s === "stop") setSeg(0);
              }}
            />
            <CintaEq playing={sonando} tone={pista.color} label="ecualizador" />
            <CintaButton
              tone="amber"
              loading={generando}
              onClick={() => {
                setGenerando(true);
                hallazgos.marcar("dj-a-bordo");
              }}
            >
              ⚡ Pídele una pista a la AI
            </CintaButton>
          </div>
        </CintaPanel>
      </section>

      {/* ---- MIXTAPE: cassettes en scroll-snap ---- */}
      <section className="mv3c-seccion mv3-reveal">
        <h2 className="mv3c-titulo">El mixtape</h2>
        <div className="mv3-snap mv3c-tapes">
          {pistas.map((p, i) => (
            <span className="mv3-snap__item" key={p.titulo}>
              <CintaTape
                title={p.titulo}
                meta={p.meta}
                color={p.color}
                side={i % 2 === 0 ? "A" : "B"}
                playing={sonando && i === idx}
                selected={i === idx}
                onClick={() => {
                  setIdx(i);
                  setSeg(0);
                  setEstado("play");
                }}
              />
            </span>
          ))}
        </div>
        <p className="mv3c-hint" aria-hidden="true">
          → desliza e inserta
        </p>
      </section>

      {/* ---- FICHA TÉCNICA ---- */}
      <section className="mv3c-seccion mv3c-ficha">
        <div className="mv3-reveal">
          <CintaLabel
            big={String(idx + 1)}
            heading="Ficha"
            rows={[
              ["Pista", pista.titulo],
              ["Fuente", pista.meta],
              ["Duración", fmt(pista.dur)],
              ["Cassettes", String(pistas.length)],
            ]}
            footer={
              <p className="mv3c-nota">
                Demo: aquí se enchufa el modelo generativo de música real.
              </p>
            }
          />
        </div>
        <div className="mv3-reveal mv3-reveal--2 mv3c-ficha__marks">
          <CintaMarks tone="amber" running={sonando} />
          <CintaMarks direction="down" tone="amber" count={2} running={sonando} />
        </div>
      </section>
    </div>
  );
}
