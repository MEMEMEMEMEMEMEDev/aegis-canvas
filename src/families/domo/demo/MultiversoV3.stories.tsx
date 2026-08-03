import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState, type ComponentType } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import DomoButton from "../DomoButton/DomoButton";
import DomoCut from "../DomoCut/DomoCut";
import DomoDeck, { DomoSlide } from "../DomoDeck/DomoDeck";
import DomoGauge from "../DomoGauge/DomoGauge";
import DomoGlitch from "../DomoGlitch/DomoGlitch";
import DomoLog from "../DomoLog/DomoLog";
import type { DomoLogItem } from "../DomoLog/DomoLog";
import DomoPrompt from "../DomoPrompt/DomoPrompt";
import DomoReadout from "../DomoReadout/DomoReadout";
import DomoType from "../DomoType/DomoType";
import { MundoCinta, MundoDenki, MundoLab, MundoMeso, MundoObsi, MundoTebeo } from "./mundos-v3";
import "../domo.scss";
import "./multiverso-v3.scss";

const meta: Meta = {
  title: "Families/DomoV3/Multiverso",
  parameters: { layout: "fullscreen" },
};
export default meta;

// =============================================================================
// DOMO OS v3 — "Dársena". Evolución de DomoV2 (que queda intacto):
// - Sin ventana de navegador falsa: los mundos toman el viewport y el OS se
//   repliega a un visor flotante con línea de mundos.
// - La transferencia monta la piel del destino en vivo (tokens, tipografía,
//   componentes) y el handshake tiñe el panel antes del tajo de salida.
// - ASIS, la AI de a bordo: responde y OPERA la UI (los componentes son
//   controlables por props — un intent puede llevarte de mundo).
// - LAB: el planeta de IA con el patrón entrada → proceso → salida.
// =============================================================================

type MundoId = "meso" | "tebeo" | "cinta" | "denki" | "obsi" | "lab";

interface Mundo {
  id: MundoId;
  nombre: string;
  /** Nombre en kana/kanji: sello de llegada y tablero. */
  kana: string;
  url: string;
  familia: string;
  estado: string;
  /** Prefijo real de sus custom properties (meso habla --ds-*). */
  prefijo: string;
  /** Tokens REALES del contrato del destino (los monta el warp). */
  tokens: { nombre: string; hex: string }[];
  fuentes: string;
  /** font-family real para el specimen "Aa" del warp. */
  specimen: string;
  componentes: number;
  /** Color del rombo del tablero y del sello de llegada. */
  acento: string;
  /** Retema del overlay durante el handshake. */
  tinte: { paper: string; well: string; ink: string; soft: string; hairline: string };
}

const MUNDOS: Record<MundoId, Mundo> = {
  meso: {
    id: "meso",
    nombre: "MESOSOICOS",
    kana: "化石",
    url: "registro.meso",
    familia: "Mesosoicos",
    estado: "Excavando",
    prefijo: "--ds-",
    tokens: [
      { nombre: "surface-base", hex: "#10141a" },
      { nombre: "surface-sunken", hex: "#0b0e11" },
      { nombre: "text", hex: "#f2eee4" },
      { nombre: "accent", hex: "#f2a33c" },
      { nombre: "oxide", hex: "#e4573d" },
      { nombre: "sky", hex: "#5b9bd5" },
    ],
    fuentes: "Fuentes de marca (--ds-font-*)",
    specimen: "var(--ds-font-display)",
    componentes: 7,
    acento: "#f2a33c",
    tinte: {
      paper: "#10141a",
      well: "#0b0e11",
      ink: "#f2eee4",
      soft: "rgb(242 238 228 / 0.55)",
      hairline: "rgb(242 238 228 / 0.18)",
    },
  },
  tebeo: {
    id: "tebeo",
    nombre: "TEBEO",
    kana: "テベオ",
    url: "tebeo.press",
    familia: "Tebeo",
    estado: "En órbita",
    prefijo: "--tebeo-",
    tokens: [
      { nombre: "paper", hex: "#e9e5d8" },
      { nombre: "card", hex: "#f6f3e8" },
      { nombre: "ink", hex: "#131311" },
      { nombre: "ink-soft", hex: "#4a4a42" },
      { nombre: "sun", hex: "#f2d43d" },
      { nombre: "sun-deep", hex: "#e0be1d" },
    ],
    fuentes: "Archivo Black · Space Grotesk",
    specimen: '"Archivo Black", sans-serif',
    componentes: 11,
    acento: "#131311",
    tinte: {
      paper: "#e9e5d8",
      well: "#f6f3e8",
      ink: "#131311",
      soft: "#4a4a42",
      hairline: "rgb(19 19 17 / 0.22)",
    },
  },
  cinta: {
    id: "cinta",
    nombre: "CINTA",
    kana: "シンタ",
    url: "radio.cinta.fm",
    familia: "Cinta",
    estado: "Al aire",
    prefijo: "--cinta-",
    tokens: [
      { nombre: "sand", hex: "#e9dcb4" },
      { nombre: "cream", hex: "#f5efdc" },
      { nombre: "amber", hex: "#f0b12e" },
      { nombre: "coral", hex: "#ef8578" },
      { nombre: "sky", hex: "#7fa9d9" },
      { nombre: "ink", hex: "#2b251a" },
    ],
    fuentes: "Audiowide · Space Mono",
    specimen: '"Audiowide", sans-serif',
    componentes: 10,
    acento: "#ef8578",
    tinte: {
      paper: "#e9dcb4",
      well: "#f5efdc",
      ink: "#2b251a",
      soft: "#7a7057",
      hairline: "rgb(43 37 26 / 0.25)",
    },
  },
  denki: {
    id: "denki",
    nombre: "DENKI",
    kana: "電気",
    url: "denki.works",
    familia: "Denki + KOI",
    estado: "Nuevo",
    prefijo: "--denki-",
    tokens: [
      { nombre: "paper", hex: "#e9d8b8" },
      { nombre: "panel", hex: "#1b1611" },
      { nombre: "cream", hex: "#f2e4c6" },
      { nombre: "ink", hex: "#221b12" },
      { nombre: "red", hex: "#d13a1e" },
      { nombre: "red-deep", hex: "#a92c14" },
    ],
    fuentes: "Anton · IBM Plex Mono",
    specimen: '"Anton", sans-serif',
    componentes: 9,
    acento: "#d13a1e",
    tinte: {
      paper: "#e9d8b8",
      well: "#ddc79f",
      ink: "#221b12",
      soft: "rgb(34 27 18 / 0.65)",
      hairline: "rgb(34 27 18 / 0.25)",
    },
  },
  obsi: {
    id: "obsi",
    nombre: "OBSIDIANA",
    kana: "黒曜石",
    url: "galeria.obsidiana",
    familia: "Obsidiana",
    estado: "Exponiendo",
    prefijo: "--obsi-",
    tokens: [
      { nombre: "void", hex: "#10141b" },
      { nombre: "carbon", hex: "#191f28" },
      { nombre: "carbon-raised", hex: "#212935" },
      { nombre: "blanco", hex: "#eef3f9" },
      { nombre: "cian", hex: "#35b6ff" },
      { nombre: "line", hex: "#2a3341" },
    ],
    fuentes: "Space Grotesk · Spline Sans Mono",
    specimen: '"Space Grotesk", sans-serif',
    componentes: 6,
    acento: "#35b6ff",
    tinte: {
      paper: "#10141b",
      well: "#191f28",
      ink: "#eef3f9",
      soft: "rgb(238 243 249 / 0.58)",
      hairline: "#2a3341",
    },
  },
  lab: {
    id: "lab",
    nombre: "LAB ASIS",
    kana: "実験室",
    url: "lab.asis.ai",
    familia: "Domo (retema)",
    estado: "Experimental",
    prefijo: "--domo-",
    tokens: [
      { nombre: "paper", hex: "#141712" },
      { nombre: "well", hex: "#1b1f1a" },
      { nombre: "ink", hex: "#e8ede2" },
      { nombre: "ink-soft", hex: "#99a191" },
      { nombre: "alert", hex: "#b8452b" },
      { nombre: "hairline", hex: "#3a4038" },
    ],
    fuentes: "Chivo Mono",
    specimen: '"Chivo Mono", monospace',
    componentes: 18,
    acento: "#e8ede2",
    tinte: {
      paper: "#141712",
      well: "#1b1f1a",
      ink: "#e8ede2",
      soft: "rgb(232 237 226 / 0.55)",
      hairline: "rgb(232 237 226 / 0.2)",
    },
  },
};

const MUNDO_IDS = Object.keys(MUNDOS) as MundoId[];

const VISTAS: Record<MundoId, ComponentType> = {
  meso: MundoMeso,
  tebeo: MundoTebeo,
  cinta: MundoCinta,
  denki: MundoDenki,
  obsi: MundoObsi,
  lab: MundoLab,
};

// Guion del warp: cinco etapas con su duración — el log las narra, el rack
// de tokens, el specimen y el contador se encienden en la suya.
const guionDe = (m: Mundo): DomoLogItem[] => [
  { texto: "Resolviendo ruta", detalle: m.url },
  { texto: "Montando contrato", detalle: `${m.prefijo}* × ${m.tokens.length}` },
  { texto: "Cargando tipografía", detalle: "woff2 self-hosted" },
  { texto: "Vistiendo componentes", detalle: `${m.componentes} núcleos headless` },
  { texto: "Handshake de piel", detalle: "transfiriendo control" },
];
const DURACIONES = [600, 1200, 800, 700, 900];
const WARP_TOTAL = DURACIONES.reduce((a, b) => a + b, 0);
const FASES = DURACIONES.length;

// --- ASIS: intents de la AI de a bordo (respuesta + destino opcional) ---
interface Intent {
  patron: RegExp;
  texto: string;
  destino?: MundoId;
}

const INTENTS: Intent[] = [
  {
    patron: /quien|quién|marcelo|autor|eres|sobre/,
    texto:
      "Marcelo Huenchupan: front-end y design systems. Construye pieles que comparten un solo esqueleto — todo lo que ves aquí sale de un contrato de tokens. Pídeme un destino y te llevo.",
  },
  {
    patron: /\bia\b|\bai\b|voz|lab|tradu|c[aá]mara|modelo|intelig/,
    texto:
      "Los experimentos de IA viven en el laboratorio: texto a voz, transcripción, traducción y cámara. Abróchate — te llevo.",
    destino: "lab",
  },
  {
    patron: /recomiend|mejor|empez|empieza|galer|caso/,
    texto:
      "Empieza por la galería OBSIDIANA: los casos reales, con problema, proceso y resultado. Saltando…",
    destino: "obsi",
  },
  { patron: /denki|japo|p[oó]ster|torii/, texto: "Rumbo al planeta japonés. 行きましょう.", destino: "denki" },
  { patron: /cinta|m[uú]sica|radio|dj/, texto: "Sintonizando Radio CINTA. Sube el volumen.", destino: "cinta" },
  { patron: /tebeo|c[oó]mic|sticker/, texto: "A la imprenta que grita. ¡Extra, extra!", destino: "tebeo" },
  { patron: /meso|f[oó]sil|origen|primer/, texto: "Bajando al primer estrato del sistema.", destino: "meso" },
  {
    patron: /contact|correo|mail|hablemos/,
    texto: "Directo: marccelohuenchupan@gmail.com — o revisa la bitácora del deck para ver tu viaje.",
  },
];

const ASIS_SALUDO =
  "Soy ASIS, la AI de a bordo. Pregunta por Marcelo, pide una recomendación o dime a qué mundo quieres ir.";

function Multiverso() {
  const [vista, setVista] = useState<"os" | MundoId>("os");
  const [slide, setSlide] = useState(0);
  const [warp, setWarp] = useState<MundoId | null>(null);
  const [fase, setFase] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  const [viajes, setViajes] = useState(0);
  const [bitacora, setBitacora] = useState<DomoLogItem[]>([
    { texto: "Dársena iniciada", detalle: "domo.os v3" },
  ]);
  const [hora, setHora] = useState("--:--:--");
  const [respuesta, setRespuesta] = useState(ASIS_SALUDO);
  const [rumboAsis, setRumboAsis] = useState<MundoId | null>(null);

  const anota = (texto: string, detalle?: string) =>
    setBitacora((b) => [...b, detalle ? { texto, detalle } : { texto }]);

  const aterrizar = (dest: MundoId) => {
    setVista(dest);
    setViajes((v) => v + 1);
    const m = MUNDOS[dest];
    anota(`Piel ${m.nombre} montada`, `${m.componentes} componentes · ${m.url}`);
  };

  const viaja = (dest: MundoId) => {
    if (dest === vista || warp) return;
    const m = MUNDOS[dest];
    anota(`Salto a ${m.nombre} iniciado`, m.url);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      aterrizar(dest);
      return;
    }
    setFase(0);
    setWarp(dest);
  };

  const volver = () => {
    setVista("os");
    anota("Regreso a la dársena", "domo.os");
  };

  // ASIS entiende la pregunta, responde tecleando y — si hay destino — viaja.
  const pregunta = (texto: string) => {
    if (!texto.trim()) return;
    const t = texto.toLowerCase();
    const intent = INTENTS.find((i) => i.patron.test(t));
    anota("ASIS: consulta", texto.length > 34 ? `${texto.slice(0, 34)}…` : texto);
    if (!intent) {
      setRespuesta(
        `No tengo ruta para «${texto}». Prueba: «muéstrame la IA», «recomiéndame algo» o el nombre de un mundo.`,
      );
      return;
    }
    setRespuesta(intent.texto);
    if (intent.destino && intent.destino !== vista) setRumboAsis(intent.destino);
  };

  // El viaje ordenado por ASIS espera a que termine de "hablar".
  useEffect(() => {
    if (!rumboAsis) return undefined;
    const id = window.setTimeout(() => {
      viaja(rumboAsis);
      setRumboAsis(null);
    }, 1700);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rumboAsis]);

  // El guion avanza etapa a etapa; al agotarse aterriza y sale con el tajo.
  useEffect(() => {
    if (!warp || saliendo) return undefined;
    if (fase >= FASES) {
      aterrizar(warp);
      setSaliendo(true);
      return undefined;
    }
    const id = window.setTimeout(() => setFase((f) => f + 1), DURACIONES[fase] ?? 600);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warp, fase, saliendo]);

  useEffect(() => {
    if (!saliendo) return undefined;
    const id = window.setTimeout(() => {
      setWarp(null);
      setSaliendo(false);
      setFase(0);
    }, 520);
    return () => window.clearTimeout(id);
  }, [saliendo]);

  // Reloj de instrumento del HUD.
  useEffect(() => {
    const tick = () => setHora(new Date().toLocaleTimeString("es-CL", { hour12: false }));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mundoActual = vista === "os" ? null : MUNDOS[vista];
  const Mundo = vista === "os" ? null : VISTAS[vista];
  const warpMundo = warp ? MUNDOS[warp] : null;

  return (
    <div className="domo-scope dv3">
      {vista === "os" && (
        <div className="dv3__os">
          <header className="dv3__hud">
            <span>
              Domo OS v3<span className="dv3__hud-sep">◆</span>Dársena
            </span>
            <span className="dv3__hud-datos">
              <span>Mundos ◆ {String(MUNDO_IDS.length).padStart(2, "0")}</span>
              <span>Saltos ◆ {String(viajes).padStart(2, "0")}</span>
              <span className="dv3__hora">{hora}</span>
            </span>
          </header>

          <DomoDeck label="domo os" index={slide} onIndexChange={setSlide}>
            {/* ---- 01 · DÁRSENA: tablero de salidas + ASIS ---- */}
            <DomoSlide title="Dársena">
              <div className="dv3-hub">
                <div className="dv3-hub__cabecera">
                  <span className="dv3-hub__kicker">◇ Dársena de mundos</span>
                  <h1 className="dv3-hub__title">
                    <DomoGlitch text="Multiverso." />
                  </h1>
                  <DomoType
                    text="Cada proyecto es una web con su propia piel. Elige salida en el tablero — o pídeselo a ASIS y deja que pilotee."
                    speed={16}
                  />
                </div>

                <div className="dv3-hub__zona">
                  <div className="dv3-tablero" role="group" aria-label="tablero de salidas">
                    <div className="dv3-tablero__cab" aria-hidden="true">
                      <span>Destino</span>
                      <span>Familia</span>
                      <span>Paleta</span>
                      <span>Ruta</span>
                      <span>Estado</span>
                      <span />
                    </div>
                    {MUNDO_IDS.map((id) => {
                      const m = MUNDOS[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          className="dv3-tablero__fila"
                          onClick={() => viaja(id)}
                        >
                          <span className="dv3-tablero__destino">
                            <i className="dv3-tablero__rombo" style={{ color: m.acento }} aria-hidden="true">
                              ◆
                            </i>
                            <b>{m.nombre}</b>
                            <span className="dv3-tablero__kana" lang="ja">
                              {m.kana}
                            </span>
                          </span>
                          <span className="dv3-tablero__familia">{m.familia}</span>
                          <span className="dv3-tablero__paleta" aria-hidden="true">
                            {m.tokens.slice(0, 4).map((t) => (
                              <i key={t.nombre} style={{ background: t.hex }} />
                            ))}
                          </span>
                          <span className="dv3-tablero__url">{m.url}</span>
                          <span className="dv3-tablero__estado">{m.estado}</span>
                          <span className="dv3-tablero__ir" aria-hidden="true">
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <DomoCut cut="notch" tone="ink" title="ASIS // AI de a bordo" status="v0.3" className="dv3-asis">
                    <p className="dv3-asis__voz">
                      <DomoType text={respuesta} speed={18} />
                    </p>
                    <div className="dv3-asis__chips">
                      {["¿Quién es Marcelo?", "Recomiéndame algo", "Muéstrame la IA"].map((chip) => (
                        <DomoButton key={chip} size="sm" variant="ghost" onClick={() => pregunta(chip)}>
                          {chip}
                        </DomoButton>
                      ))}
                    </div>
                    <DomoPrompt
                      label="preguntar a ASIS"
                      placeholder="Pregunta, o pide un destino…"
                      onSubmit={pregunta}
                    />
                  </DomoCut>
                </div>
              </div>
            </DomoSlide>

            {/* ---- 02 · BITÁCORA (se escribe sola al viajar) ---- */}
            <DomoSlide title="Bitácora">
              <div className="dv3-fin">
                <DomoCut
                  cut="blade"
                  title="Bitácora de viaje"
                  status={`${String(viajes).padStart(2, "0")} saltos`}
                  className="dv3-fin__panel"
                >
                  <div className="dv3-fin__datos">
                    <DomoReadout label="Mundos" value={String(MUNDO_IDS.length).padStart(2, "0")} />
                    <DomoReadout label="Familias" value={String(MUNDO_IDS.length + 1).padStart(2, "0")} />
                    <DomoReadout label="Apps" value="01" size="lg" />
                  </div>
                  <DomoLog label="bitácora de viaje" items={bitacora} className="dv3-fin__log" />
                  <DomoType
                    text="Todo esto es una sola aplicación: una dársena, siete pieles, cero iframes. Viajar es retematizar."
                    speed={16}
                  />
                </DomoCut>
              </div>
            </DomoSlide>
          </DomoDeck>
        </div>
      )}

      {/* ---- MUNDO ACTIVO: viewport completo, sin marcos ---- */}
      {Mundo && <Mundo />}

      {/* ---- SELLO DE LLEGADA: se estampa y se disuelve (guiño hanko) ---- */}
      {mundoActual && !warp && (
        <div
          key={`${vista}-${viajes}`}
          className="dv3-sello"
          aria-hidden="true"
          style={{ "--dv3-acento": mundoActual.acento } as CSSProperties}
        >
          <b>{mundoActual.nombre}</b>
          <span lang="ja">{mundoActual.kana}</span>
        </div>
      )}

      {/* ---- VISOR: DOMO OS replegado, con línea de mundos ---- */}
      {mundoActual && (
        <aside className="domo-scope dv3-visor" aria-label="visor DOMO OS">
          <span className="dv3-visor__marca">◆ Domo OS</span>
          <DomoButton size="sm" onClick={volver}>
            Dársena
          </DomoButton>
          <span className="dv3-visor__linea" role="group" aria-label="línea de mundos">
            {MUNDO_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={cx("dv3-visor__punto", id === vista && "is-aqui")}
                aria-label={id === vista ? `${MUNDOS[id].nombre} (aquí)` : `ir a ${MUNDOS[id].nombre}`}
                aria-current={id === vista ? "location" : undefined}
                title={MUNDOS[id].nombre}
                onClick={() => viaja(id)}
              >
                {id === vista ? "◆" : "◇"}
              </button>
            ))}
          </span>
          <span className="dv3-visor__ruta">https://{mundoActual.url}</span>
        </aside>
      )}

      {/* ---- EL WARP: la transferencia monta la piel del destino ---- */}
      {warpMundo && (
        <div
          className={cx("dv3-warp", fase >= FASES - 1 && "is-tinte", saliendo && "is-salida")}
          role="status"
          style={
            {
              "--dv3-paper": warpMundo.tinte.paper,
              "--dv3-well": warpMundo.tinte.well,
              "--dv3-ink": warpMundo.tinte.ink,
              "--dv3-soft": warpMundo.tinte.soft,
              "--dv3-hairline": warpMundo.tinte.hairline,
            } as CSSProperties
          }
        >
          <div className="dv3-warp__esc">
            <div className="dv3-warp__ruta-rail" aria-hidden="true">
              <span>DOMO</span>
              <span className="dv3-warp__rail">
                <span className="dv3-warp__nave" style={{ animationDuration: `${WARP_TOTAL}ms` }}>
                  ◆
                </span>
              </span>
              <span>{warpMundo.nombre}</span>
            </div>

            <DomoCut
              cut="blade"
              title="Transferencia de piel"
              status={warpMundo.url}
              className="dv3-warp__panel"
            >
              <DomoGlitch intense text={`DOMO → ${warpMundo.nombre}`} className="dv3-warp__titulo" />

              <div className="dv3-warp__cols">
                <DomoLog label="transferencia" items={guionDe(warpMundo)} paso={fase} />

                <div className="dv3-warp__carga">
                  <div className={cx("dv3-warp__rack", fase >= 1 && "is-on")} aria-hidden="true">
                    {warpMundo.tokens.map((t, i) => (
                      <span
                        key={t.nombre}
                        className="dv3-warp__token"
                        style={{ "--dv3-sw": t.hex, transitionDelay: `${i * 110}ms` } as CSSProperties}
                      >
                        <i />
                        <b>
                          {warpMundo.prefijo}
                          {t.nombre}
                        </b>
                        <em>{t.hex}</em>
                      </span>
                    ))}
                  </div>

                  <div className={cx("dv3-warp__specimen", fase >= 2 && "is-on")}>
                    <span className="dv3-warp__aa" style={{ fontFamily: warpMundo.specimen }}>
                      Aa
                    </span>
                    <span className="dv3-warp__fuentes">
                      {warpMundo.fuentes}
                      <br />
                      self-hosted · OFL / Apache
                    </span>
                  </div>
                </div>
              </div>

              <footer className="dv3-warp__pie">
                <DomoGauge value={(fase / FASES) * 100} label="transferencia" size={56} />
                <div className={cx("dv3-warp__piezas", fase >= 3 && "is-on")}>
                  <DomoReadout
                    label="Componentes"
                    value={String(warpMundo.componentes).padStart(2, "0")}
                  />
                </div>
                <DomoButton variant="ghost" size="sm" onClick={() => setFase(FASES)}>
                  Saltar ▸
                </DomoButton>
              </footer>
            </DomoCut>
          </div>
        </div>
      )}
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => <Multiverso />,
};
