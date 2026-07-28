import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import CintaButton from "../CintaButton/CintaButton";
import CintaDisplay from "../CintaDisplay/CintaDisplay";
import CintaLabel from "../CintaLabel/CintaLabel";
import CintaMarks from "../CintaMarks/CintaMarks";
import CintaPanel from "../CintaPanel/CintaPanel";
import CintaScale from "../CintaScale/CintaScale";
import CintaTag from "../CintaTag/CintaTag";
import CintaTape from "../CintaTape/CintaTape";
import CintaTransport from "../CintaTransport/CintaTransport";
import type { CintaTransportState } from "../CintaTransport/CintaTransport";
import "../cinta.scss";
import "./walkman.scss";

const meta: Meta = {
  title: "Families/Cinta/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

interface Pista {
  titulo: string;
  meta: string;
  color: "amber" | "coral" | "sky";
  side: "A" | "B";
  dur: number;
  specs: Array<[string, string]>;
}

const PISTAS: Pista[] = [
  {
    titulo: "Reactor",
    meta: "three.js · glsl · 2026",
    color: "amber",
    side: "A",
    dur: 204,
    specs: [
      ["Proyecto", "Reactor"],
      ["Rol", "Dev + Art"],
      ["Stack", "three.js / GLSL"],
      ["Salida", "60 fps"],
    ],
  },
  {
    titulo: "Telar OS",
    meta: "react · una pantalla",
    color: "coral",
    side: "B",
    dur: 187,
    specs: [
      ["Proyecto", "Telar OS"],
      ["Rol", "Diseño + Dev"],
      ["Stack", "React / SCSS"],
      ["Scroll", "Cero"],
    ],
  },
  {
    titulo: "Domo Brief",
    meta: "react · ai ready",
    color: "sky",
    side: "A",
    dur: 226,
    specs: [
      ["Proyecto", "Domo Brief"],
      ["Rol", "UX + Dev"],
      ["Stack", "React + AI"],
      ["Controles", "Todos"],
    ],
  },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * El portafolio como walkman: eliges una cinta (proyecto), suena, giran
 * los carretes y al terminar el lado pasa sola a la siguiente — modo
 * mixtape. Transporte y cintas son controlables desde fuera, así que la
 * AI del multiverso también puede poner play.
 */
function Walkman() {
  const [idx, setIdx] = useState(0);
  const [estado, setEstado] = useState<CintaTransportState>("play");
  const [seg, setSeg] = useState(38);

  const pista = PISTAS[idx] ?? PISTAS[0]!;

  // La cinta corre: al acabar el lado, pasa a la siguiente (mixtape).
  useEffect(() => {
    if (estado !== "play") return undefined;
    const id = window.setInterval(() => {
      setSeg((s) => {
        if (s + 1 >= pista.dur) {
          setIdx((i) => (i + 1) % PISTAS.length);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [estado, pista.dur]);

  const inserta = (i: number) => {
    setIdx(i);
    setSeg(0);
    setEstado("play");
  };

  const transporte = (next: CintaTransportState) => {
    setEstado(next);
    if (next === "stop") setSeg(0);
  };

  return (
    <div className="cinta-scope wk">
      <header className="wk__top">
        <div>
          <h1 className="wk__logo">
            Ahroi<span className="wk__logo-dot">⦿</span>Tape
          </h1>
          <span className="wk__sub">Analog portfolio system</span>
        </div>
        <div className="wk__top-fin">
          <CintaTag tone="sky">Unit 001</CintaTag>
          <CintaMarks count={4} />
        </div>
      </header>

      <main className="wk__main">
        <CintaPanel label="Stereo cassette player" labelEnd={`→ TR 0${idx + 1}`}>
          <CintaDisplay
            title={`${pista.titulo} — ${pista.meta}`}
            progress={(seg / pista.dur) * 100}
            elapsed={fmt(seg)}
            total={fmt(pista.dur)}
            playing={estado === "play"}
          />
          <div className="wk__fila">
            <CintaTransport state={estado} onChange={transporte} />
            <CintaMarks tone="amber" running={estado === "play"} />
          </div>
          <CintaScale
            marks={PISTAS.map((_, i) => `TR 0${i + 1}`)}
            value={((idx + 0.5) / PISTAS.length) * 100}
            label="pista seleccionada"
          />
          <div className="wk__chips">
            <CintaTag>Stereo</CintaTag>
            <CintaTag tone="ink">Frontend-Z system</CintaTag>
            <CintaTag tone="hazard">Alta fidelidad</CintaTag>
          </div>
        </CintaPanel>

        <CintaLabel
          big={String(idx + 1)}
          rows={pista.specs}
          footer={<CintaButton size="sm" tone="amber">Ver caso →</CintaButton>}
        />
      </main>

      <section>
        <div className="wk__shelf-head">
          <span>→ Mixtape 2026 — elige una cinta</span>
          <span>{PISTAS.length} lados grabados</span>
        </div>
        <div className="wk__tapes">
          {PISTAS.map((p, i) => (
            <CintaTape
              key={p.titulo}
              title={p.titulo}
              meta={p.meta}
              color={p.color}
              side={p.side}
              playing={estado === "play" && i === idx}
              selected={i === idx}
              onClick={() => inserta(i)}
            />
          ))}
        </div>
      </section>

      <footer className="wk__banda">
        <div className="wk__banda-col">
          <CintaTag tone="hazard">Ahroi audio sys</CintaTag>
          <p className="wk__banda-txt">
            Sistema de portafolio analógico: webs 3D, shaders e interfaces
            vivas grabadas a mano en cada lado. Rebobinar no es necesario —
            el mixtape avanza solo.
          </p>
        </div>
        <CintaButton size="lg">Contacto →</CintaButton>
      </footer>
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => <Walkman />,
};
