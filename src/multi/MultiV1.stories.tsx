import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
// --- DOMO: los instrumentos de a bordo ---
import DomoButton from "../families/domo/DomoButton/DomoButton";
import DomoCut from "../families/domo/DomoCut/DomoCut";
import DomoGauge from "../families/domo/DomoGauge/DomoGauge";
import DomoGlitch from "../families/domo/DomoGlitch/DomoGlitch";
import DomoPrompt from "../families/domo/DomoPrompt/DomoPrompt";
import DomoReadout from "../families/domo/DomoReadout/DomoReadout";
import DomoStatus from "../families/domo/DomoStatus/DomoStatus";
import DomoType from "../families/domo/DomoType/DomoType";
// --- DENKI: catálogo arcade ---
import DenkiBarcode from "../families/denki/DenkiBarcode/DenkiBarcode";
import DenkiBurst from "../families/denki/DenkiBurst/DenkiBurst";
import DenkiCombo from "../families/denki/DenkiCombo/DenkiCombo";
import DenkiRail from "../families/denki/DenkiRail/DenkiRail";
import DenkiTag from "../families/denki/DenkiTag/DenkiTag";
import DenkiTitle from "../families/denki/DenkiTitle/DenkiTitle";
// --- CINTA: la radio ---
import CintaButton from "../families/cinta/CintaButton/CintaButton";
import CintaDisplay from "../families/cinta/CintaDisplay/CintaDisplay";
import CintaLabel from "../families/cinta/CintaLabel/CintaLabel";
import CintaMarks from "../families/cinta/CintaMarks/CintaMarks";
import CintaPanel from "../families/cinta/CintaPanel/CintaPanel";
import CintaScale from "../families/cinta/CintaScale/CintaScale";
import CintaTag from "../families/cinta/CintaTag/CintaTag";
import CintaTape from "../families/cinta/CintaTape/CintaTape";
import CintaTransport from "../families/cinta/CintaTransport/CintaTransport";
import type { CintaTransportState } from "../families/cinta/CintaTransport/CintaTransport";
// --- TEBEO + TELAR: la gaceta ---
import TebeoButton from "../families/tebeo/TebeoButton/TebeoButton";
import TebeoHeadline from "../families/tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../families/tebeo/TebeoMarquee/TebeoMarquee";
import TebeoSticker from "../families/tebeo/TebeoSticker/TebeoSticker";
import TebeoTag from "../families/tebeo/TebeoTag/TebeoTag";
import TelarPanel from "../families/telar/TelarPanel/TelarPanel";
import TelarTag from "../families/telar/TelarTag/TelarTag";
import TelarTicker from "../families/telar/TelarTicker/TelarTicker";
import TelarType from "../families/telar/TelarType/TelarType";
import "../families/domo/domo.scss";
import "./multi-v1.scss";

const meta: Meta = {
  title: "Multiverso/Multi V1",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Mundo = "aegis" | "cinta" | "fusion" | "gaceta";

const DESTINOS: Record<
  Exclude<Mundo, "aegis">,
  { nombre: string; sub: string; desc: string; combo: string[] }
> = {
  cinta: {
    nombre: "Radio Cinta",
    sub: "FM 88.8 — música",
    desc: "Walkman del multiverso. Aquí se enchufa la AI generadora de música: pides una pista y aparece una cinta nueva.",
    combo: ["▶", "A", "▶"],
  },
  fusion: {
    nombre: "Sector 電気-OS",
    sub: "Domo × Denki",
    desc: "NieR pero expresivo: instrumentos DOMO vestidos con la paleta DENKI. Mismo contrato de tokens, otra piel.",
    combo: ["←", "↓", "→", "◆"],
  },
  gaceta: {
    nombre: "La Gaceta Estelar",
    sub: "Tebeo × Telar",
    desc: "Periódico interestelar: titulares que gritan, columnas de papel y un teletipo andino insertado entre avisos.",
    combo: ["✦", "↑", "✦"],
  },
};

// Viajar = deployar: el pipeline CI/CD real del repo, como secuencia de salto.
const PIPELINE: Array<[string, string]> = [
  ["Reactor de tipos", "npm run typecheck"],
  ["Escudos de estilo", "sass --check src/families"],
  ["Hangar de vistas", "npm run build-storybook"],
  ["Telemetría", "a11y + revisión visual"],
  ["Salto de órbita", "deploy → mundo destino"],
];

/** La nave AEGIS, dibujada a mano en SVG (la llama tiembla de verdad). */
function Nave({ size = 150, viajando = false }: { size?: number; viajando?: boolean }) {
  return (
    <svg
      viewBox="0 0 130 60"
      width={size}
      className={viajando ? "mv1-nave mv1-nave--viajando" : "mv1-nave"}
      aria-hidden="true"
    >
      <polygon
        className="mv1-nave__flama"
        points="16,30 -6,22 2,30 -6,38"
        fill="#d13a1e"
      />
      <polygon
        points="14,30 74,10 122,30 74,50"
        fill="#e7e4d8"
        stroke="#0a0c11"
        strokeWidth="2.5"
      />
      <circle cx="80" cy="30" r="6.5" fill="#12151c" />
      <polygon points="42,19 58,14 58,24" fill="#12151c" opacity="0.35" />
      <polygon points="42,41 58,46 58,36" fill="#12151c" opacity="0.35" />
    </svg>
  );
}

// =============================================================================
// PUENTE DE MANDO — te recibe la AI, eliges destino, y la sala de máquinas
// documenta el CI/CD real de este repo (así se construye todo esto).
// =============================================================================
function Puente({ onWarp }: { onWarp: (dest: Exclude<Mundo, "aegis">) => void }) {
  const [voz, setVoz] = useState(
    "Bienvenido a bordo del AEGIS. Soy la AI de vuelo: cada mundo de esta carta es un proyecto con su propia piel, y cada viaje ejecuta el pipeline real del repo. Fija un rumbo.",
  );
  const [n, setN] = useState(0);
  const RESPUESTAS = [
    "Todo lo que ves sale de @ahroi/foundation: tokens → primitivos headless → familias. La sala de máquinas de abajo lo documenta.",
    "El modo de navegar es raro a propósito: sin navbar. Solo esta consola, códigos de salto y órbitas.",
    "Anotado en el registro de vuelo. Ahora elige un mundo — recomiendo la Gaceta si vienes de reclutar.",
  ];

  return (
    <div className="domo-scope mv1-dark mv1-espacio mv1-puente">
      <span className="mv1-estrellas" aria-hidden="true" />

      <header className="mv1-hud">
        <span>Nave AEGIS ◆ Puente de mando</span>
        <span className="mv1-hud__cicd">CI/CD en línea</span>
      </header>

      <section className="mv1-hero">
        <Nave />
        <div className="mv1-hero__col">
          <span className="mv1-kicker">◇ Registro de vuelo — aegis-canvas@0.2.0</span>
          <h1 className="mv1-titulo">Multi V1.</h1>
          <DomoType text={voz} speed={14} />
          <DomoPrompt
            label="hablar con la AI de vuelo"
            placeholder="Pregúntale a la nave…"
            onSubmit={() => {
              setVoz(RESPUESTAS[n % RESPUESTAS.length] ?? RESPUESTAS[0]!);
              setN((x) => x + 1);
            }}
          />
        </div>
      </section>

      <section className="mv1-seccion">
        <h2 className="mv1-seccion__titulo">Carta estelar — fija un rumbo</h2>
        <div className="mv1-destinos">
          {(Object.keys(DESTINOS) as Array<Exclude<Mundo, "aegis">>).map((key) => {
            const d = DESTINOS[key];
            return (
              <article className="mv1-glass mv1-destino" key={key}>
                <DenkiTag>{d.sub}</DenkiTag>
                <h3 className={`mv1-destino__nombre mv1-destino__nombre--${key}`}>
                  {d.nombre}
                </h3>
                <p className="mv1-destino__desc">{d.desc}</p>
                <DenkiCombo label="Código de salto" sequence={d.combo} speed={520} />
                <DomoButton onClick={() => onWarp(key)}>Fijar rumbo →</DomoButton>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mv1-seccion">
        <h2 className="mv1-seccion__titulo">Sala de máquinas — así se construye esto</h2>
        <DomoType
          speed={8}
          text="Documentación viva: cada sistema de la nave es una etapa real del pipeline de este repo. Cuando viajas, la secuencia de salto que ves es exactamente lo que corre antes de cada release."
        />
        <div className="mv1-maquinas">
          <DomoCut cut="chamfer" title="Reactor" status="tsc">
            <div className="mv1-maquina__fila">
              <DomoReadout label="Tipos" value="100%" />
              <DomoGauge value={100} label="typecheck" size={56} />
            </div>
            <p className="mv1-cmd">npm run typecheck — cero errores o no hay salto.</p>
          </DomoCut>
          <DomoCut cut="blade" title="Escudos" status="sass">
            <div className="mv1-maquina__fila">
              <DomoReadout label="Familias" value="06" />
              <DomoGauge value={100} label="estilos" size={56} />
            </div>
            <p className="mv1-cmd">Cada .scss compila solo: tokens → contrato --ds-*.</p>
          </DomoCut>
          <DomoCut cut="notch" title="Hangar" status="storybook">
            <div className="mv1-maquina__fila">
              <DomoReadout label="Vistas" value="14+" />
              <DomoGauge value={100} label="build" size={56} />
            </div>
            <p className="mv1-cmd">build-storybook empaqueta todos los mundos.</p>
          </DomoCut>
          <DomoCut cut="chamfer" title="Salto" status="deploy">
            <DomoStatus busy>Cada push publica una órbita nueva</DomoStatus>
            <p className="mv1-cmd">git push → pipeline → el multiverso en producción.</p>
          </DomoCut>
        </div>
      </section>

      <footer className="mv1-pie">
        <DenkiBarcode code="4 202600 000001" />
        <DomoStatus>Sistemas nominales · 3 mundos en órbita ◆</DomoStatus>
      </footer>
    </div>
  );
}

// =============================================================================
// SECUENCIA DE SALTO — pantalla completa: la página ES la carga.
// =============================================================================
function Viaje({ dest, etapa }: { dest: Exclude<Mundo, "aegis">; etapa: number }) {
  const d = DESTINOS[dest];
  return (
    <div className="domo-scope mv1-dark mv1-espacio mv1-viaje" role="status">
      <span className="mv1-estrellas" aria-hidden="true" />
      <Nave viajando size={170} />
      <div className="mv1-glass mv1-viaje__panel">
        <DomoGlitch intense text={`AEGIS → ${d.nombre}`} className="mv1-viaje__ruta" />
        <DenkiCombo label="Código de salto" sequence={d.combo} speed={300} />
        <div className="mv1-pipeline">
          {PIPELINE.map(([nombre, cmd], i) => (
            <div
              key={nombre}
              className={`mv1-paso ${
                i < etapa ? "is-lista" : i === etapa ? "is-actual" : "is-pendiente"
              }`}
            >
              <span className="mv1-paso__icono" aria-hidden="true">
                {i < etapa ? "✓" : i === etapa ? "▸" : "·"}
              </span>
              <span>{nombre}</span>
              <span className="mv1-paso__cmd">{cmd}</span>
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
// CONSOLA FLOTANTE — media transparente, media panel de control del viaje.
// =============================================================================
function Consola({
  mundo,
  onWarp,
  onPuente,
}: {
  mundo: Exclude<Mundo, "aegis">;
  onWarp: (dest: Exclude<Mundo, "aegis">) => void;
  onPuente: () => void;
}) {
  const otros = (Object.keys(DESTINOS) as Array<Exclude<Mundo, "aegis">>).filter(
    (k) => k !== mundo,
  );
  return (
    <aside className="domo-scope mv1-dark mv1-glass mv1-consola" aria-label="consola AEGIS">
      <div className="mv1-consola__cab">
        <span>Aegis ◆ en órbita</span>
        <DomoGauge value={100} label="integridad del casco" size={40} />
      </div>
      <DomoStatus>Mundo actual: {DESTINOS[mundo].nombre}</DomoStatus>
      <div className="mv1-consola__botones">
        <DomoButton size="sm" onClick={onPuente}>
          ← Puente
        </DomoButton>
        {otros.map((k) => (
          <DomoButton key={k} size="sm" variant="outline" onClick={() => onWarp(k)}>
            {DESTINOS[k].nombre} →
          </DomoButton>
        ))}
      </div>
    </aside>
  );
}

// =============================================================================
// MUNDO CINTA — la radio del multiverso, con AI DJ (demo enchufable).
// =============================================================================
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

function MundoCinta() {
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

  return (
    <div className="cinta-scope mv1-radio">
      <header className="mv1-radio__cab">
        <div>
          <h1 className="mv1-radio__logo">
            Radio<span style={{ color: "var(--cinta-coral)" }}>⦿</span>Multiverso
          </h1>
          <CintaMarks tone="amber" running={estado === "play"} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <CintaTag tone="sky">FM 88.8</CintaTag>
          <CintaTag tone="hazard">AI DJ a bordo</CintaTag>
        </div>
      </header>

      <main className="mv1-radio__main">
        <CintaPanel label="Stereo cassette player" labelEnd={`→ TR 0${idx + 1}`}>
          <CintaDisplay
            title={generando ? "AI componiendo una pista nueva" : `${pista.titulo} — ${pista.meta}`}
            progress={generando ? 0 : (seg / pista.dur) * 100}
            elapsed={generando ? "-:--" : fmt(seg)}
            total={fmt(pista.dur)}
            playing={estado === "play" && !generando}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <CintaTransport state={estado} onChange={(s) => { setEstado(s); if (s === "stop") setSeg(0); }} />
            <CintaButton tone="amber" loading={generando} onClick={() => setGenerando(true)}>
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
          footer={<p className="mv1-radio__nota">Demo: aquí se enchufa el modelo generativo de música real.</p>}
        />
      </main>

      <section>
        <div className="mv1-radio__tapes">
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

// =============================================================================
// MUNDO FUSIÓN — Domo × Denki: NieR expresivo. Los componentes DOMO leen
// la paleta DENKI vía overrides del contrato (.mv1-fusion).
// =============================================================================
function MundoFusion() {
  return (
    <div className="denki-scope domo-scope mv1-fusion">
      <header className="mv1-fusion__hud">
        <DenkiTag tone="red">Sector 電気-OS</DenkiTag>
        <DenkiCombo label="acceso" sequence={["←", "↓", "→", "◆"]} speed={520} />
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
        <DenkiTitle latin="Unidad Creativa" kana="クリエイティブ" sub="Domo × Denki — build 02" crown />
        <h2 className="mv1-fusion__grito">
          <DomoGlitch text="Expresión / Sistema" />
        </h2>
        <DomoType
          speed={12}
          text="Mismos instrumentos, otra sangre: este mundo entero es el contrato --domo-* retematizado con la paleta DENKI. NieR sin miedo a gritar."
        />
      </section>

      <section className="mv1-fusion__grid">
        <DomoCut cut="blade" title="Sincronía" status="98%">
          <div className="mv1-fusion__fila">
            <DomoGauge value={98} label="sincronía" size={72} />
            <DomoReadout label="Vínculo" value="Estable" />
          </div>
          <DomoStatus busy>Tokens compartidos entre familias</DomoStatus>
        </DomoCut>
        <DomoCut cut="notch" title="Arsenal" status="equipado">
          <DomoReadout label="Cortes" value="03" />
          <DenkiCombo label="Combo firma" sequence={["↓", "↘", "→", "GLSL"]} />
        </DomoCut>
        <DomoCut cut="chamfer" tone="ink" title="Memoria" status="expresiva">
          <DomoReadout label="Glitch" value="ON" size="lg" />
          <DomoStatus>El sistema también siente ◆</DomoStatus>
        </DomoCut>
      </section>

      <div className="mv1-fusion__fila" style={{ justifyContent: "space-between" }}>
        <DenkiBurst tone="red" size={130}>
          Más allá
        </DenkiBurst>
        <DomoButton size="lg">Iniciar protocolo →</DomoButton>
      </div>

      <DenkiRail items={["電気", "Domo OS", "Glitch", "Semitono", "クリエイティブ"]} tone="red" />
    </div>
  );
}

// =============================================================================
// MUNDO GACETA — Tebeo × Telar (+ sello Denki): periódico interestelar.
// =============================================================================
function MundoGaceta() {
  return (
    <div className="tebeo-scope mv1-gaceta">
      <div className="mv1-gaceta__cabecera">
        <span>Edición 402 — Sistema Aegis</span>
        <span>Mar 28 · Jul 2026</span>
        <span>Clima estelar: despejado ✦</span>
      </div>

      <div className="mv1-gaceta__masthead">
        <TebeoHeadline as="h1" size="hero">
          La Gaceta Estelar<em>.</em>
        </TebeoHeadline>
        <DenkiBurst size={110} tilt={7}>
          5¢
        </DenkiBurst>
      </div>

      <TebeoMarquee
        items={["Última hora", "Nave AEGIS avistada", "6 familias vivas", "El multiverso crece"]}
      />

      <div className="mv1-gaceta__cuerpo">
        <article className="mv1-gaceta__articulo">
          <TebeoHeadline as="h2" size="section">
            Desarrollador abre portal entre mundos<em>!</em>
          </TebeoHeadline>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <TebeoTag tone="sun">Exclusiva</TebeoTag>
            <TebeoTag>Corresponsalía en órbita</TebeoTag>
          </div>
          <div className="mv1-gaceta__cols">
            <p>
              SISTEMA AEGIS — Testigos confirman que un solo design system
              sostiene seis mundos completos. "Cada familia emite su propio
              contrato de variables; por eso ningún mundo se parece a otro",
              declaró la AI de vuelo a esta redacción.
            </p>
            <p>
              La nave AEGIS, avistada entre órbitas, ejecutaría un ritual
              llamado "pipeline" antes de cada salto: tipos, estilos, vistas
              y despliegue. Los expertos lo describen como "CI/CD, pero con
              más estilo del razonable".
            </p>
            <p>
              Fuentes cercanas al hangar aseguran que la radio del sector
              CINTA ya emite pistas compuestas por una AI de a bordo, y que
              el sector 電気-OS "grita, pero con elegancia". Seguiremos
              informando.
            </p>
          </div>
          <TebeoButton>Seguir leyendo en el puente →</TebeoButton>
        </article>

        <aside className="mv1-gaceta__lateral">
          <div className="telar-scope mv1-gaceta__aviso">
            <TelarPanel title="Teletipo andino" tone="fucsia" weave>
              <TelarType
                words={["tejiendo titulares…", "6 mundos en órbita", "señal estable ◆"]}
              />
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
                <TelarTag>En vivo</TelarTag>
                <TelarTag tone="verde">Señal SCL</TelarTag>
              </div>
            </TelarPanel>
            <TelarTicker items={["Aviso: se buscan proyectos con ganas de ser mundos", "El telar no para"]} />
          </div>
          <TebeoSticker ring="GACETA ESTELAR • EDICIÓN 402 • " size={140}>
            ¡SÍ!
          </TebeoSticker>
        </aside>
      </div>

      <footer className="mv1-gaceta__pie">
        <span className="denki-scope mv1-gaceta__sello">
          <DenkiBarcode code="4 202600 000402" />
          <DenkiTag>Distribución interplanetaria</DenkiTag>
        </span>
        <TebeoTag tone="ink">Imprenta: @ahroi/foundation</TebeoTag>
      </footer>
    </div>
  );
}

// =============================================================================
// LA EXPERIENCIA COMPLETA
// =============================================================================
function MultiV1() {
  const [mundo, setMundo] = useState<Mundo>("aegis");
  const [viaje, setViaje] = useState<Exclude<Mundo, "aegis"> | null>(null);
  const [etapa, setEtapa] = useState(0);

  const warp = (dest: Exclude<Mundo, "aegis">) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMundo(dest);
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
          setMundo(viaje);
          setViaje(null);
          return 0;
        }
        return e + 1;
      });
    }, 620);
    return () => window.clearInterval(id);
  }, [viaje]);

  if (viaje) return <Viaje dest={viaje} etapa={etapa} />;

  return (
    <>
      {mundo === "aegis" && <Puente onWarp={warp} />}
      {mundo === "cinta" && <MundoCinta />}
      {mundo === "fusion" && <MundoFusion />}
      {mundo === "gaceta" && <MundoGaceta />}
      {mundo !== "aegis" && (
        <Consola mundo={mundo} onWarp={warp} onPuente={() => setMundo("aegis")} />
      )}
    </>
  );
}

export const Completo: StoryObj = {
  render: () => <MultiV1 />,
};
