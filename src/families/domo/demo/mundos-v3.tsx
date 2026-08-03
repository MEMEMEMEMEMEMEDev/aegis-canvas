import { useState } from "react";
import type { ReactNode } from "react";
import DomoCut from "../DomoCut/DomoCut";
import DomoGlitch from "../DomoGlitch/DomoGlitch";
import DomoReadout from "../DomoReadout/DomoReadout";
import DomoStatus from "../DomoStatus/DomoStatus";
import DomoType from "../DomoType/DomoType";
import CintaButton from "../../cinta/CintaButton/CintaButton";
import CintaDisplay from "../../cinta/CintaDisplay/CintaDisplay";
import CintaEq from "../../cinta/CintaEq/CintaEq";
import CintaLabel from "../../cinta/CintaLabel/CintaLabel";
import CintaMarks from "../../cinta/CintaMarks/CintaMarks";
import CintaPanel from "../../cinta/CintaPanel/CintaPanel";
import CintaTag from "../../cinta/CintaTag/CintaTag";
import CintaTransport from "../../cinta/CintaTransport/CintaTransport";
import type { CintaTransportState } from "../../cinta/CintaTransport/CintaTransport";
import DenkiButton from "../../denki/DenkiButton/DenkiButton";
import DenkiBurst from "../../denki/DenkiBurst/DenkiBurst";
import DenkiRail from "../../denki/DenkiRail/DenkiRail";
import DenkiTag from "../../denki/DenkiTag/DenkiTag";
import DenkiTitle from "../../denki/DenkiTitle/DenkiTitle";
import KoiHanko from "../../koi/KoiHanko/KoiHanko";
import KoiTorii from "../../koi/KoiTorii/KoiTorii";
import MesoButton from "../../mesosoicos/MesoButton/MesoButton";
import MesoPanel from "../../mesosoicos/MesoPanel/MesoPanel";
import MesoStat from "../../mesosoicos/MesoStat/MesoStat";
import MesoTag from "../../mesosoicos/MesoTag/MesoTag";
import MesoTicker from "../../mesosoicos/MesoTicker/MesoTicker";
import ObsiBoton from "../../obsidiana/ObsiBoton/ObsiBoton";
import ObsiDato from "../../obsidiana/ObsiDato/ObsiDato";
import ObsiMuro, { ObsiEsquirla } from "../../obsidiana/ObsiMuro/ObsiMuro";
import ObsiPlaca from "../../obsidiana/ObsiPlaca/ObsiPlaca";
import TebeoButton from "../../tebeo/TebeoButton/TebeoButton";
import TebeoHeadline from "../../tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../../tebeo/TebeoMarquee/TebeoMarquee";
import TebeoSticker from "../../tebeo/TebeoSticker/TebeoSticker";
import TebeoTag from "../../tebeo/TebeoTag/TebeoTag";

// =============================================================================
// Los mundos de DOMO OS v3 — cada uno es "otra web" a viewport completo, sin
// marcos. KOI y TELAR no viajan solos: lo más japonés de KOI (torii, hanko)
// emigra como huésped al planeta DENKI. LAB es el planeta de IA: mismo DOMO,
// retematizado a oscuro, con el patrón entrada → proceso → salida.
// =============================================================================

// --- MESOSOICOS: el primer estrato (habla el contrato --ds-* de la marca) ---
export function MundoMeso() {
  return (
    <div className="dv3-mundo dv3-meso" aria-label="mundo MESOSOICOS">
      <div className="dv3-mundo__contenido dv3-stagger">
        <div className="dv3-mundo__chips">
          <MesoTag tone="accent">Registro fósil</MesoTag>
          <MesoTag>Era: 2026</MesoTag>
        </div>
        <h2 className="dv3-meso__titulo">El primer estrato.</h2>
        <p className="dv3-meso__sub">
          MESOSOICOS fue la primera familia del sistema: habla directamente el
          contrato <code>--ds-*</code> de la marca, sin isla propia. Todas las
          demás pieles evolucionaron desde esta capa.
        </p>
        <MesoPanel label="Excavación 07" meta="ACTIVA" className="dv3-meso__panel">
          <div className="dv3-meso__stats">
            <MesoStat value="12" label="estratos" />
            <MesoStat value="98.2" suffix="%" label="integridad" />
            <MesoStat value="8" label="familias derivadas" />
          </div>
        </MesoPanel>
        <div className="dv3-mundo__acciones">
          <MesoButton>Iniciar misión</MesoButton>
          <MesoButton variant="outline">Ver registro</MesoButton>
        </div>
      </div>
      {/* Marca de era: fósil tipográfico enterrado en el estrato derecho. */}
      <span className="dv3-meso__era" aria-hidden="true">
        66<i>Ma</i>
      </span>
      <div className="dv3-meso__ticker">
        <MesoTicker items={["Basalto", "Hueso", "Ámbar", "Tokens", "SCSS", "Fallas diagonales", "66 Ma"]} />
      </div>
    </div>
  );
}

// --- TEBEO: la imprenta que grita ---
export function MundoTebeo() {
  return (
    <div className="dv3-mundo tebeo-scope dv3-tebeo" aria-label="mundo TEBEO">
      <div className="dv3-tebeo__fila">
        <div className="dv3-mundo__contenido dv3-stagger">
          <div className="dv3-mundo__chips">
            <TebeoTag tone="sun">¡Extra!</TebeoTag>
            <TebeoTag>Edición 04</TebeoTag>
          </div>
          <TebeoHeadline as="h2" size="section">
            ¡A toda página, sin marcos<em>!</em>
          </TebeoHeadline>
          <p style={{ margin: 0, maxWidth: "26rem" }}>
            La imprenta ya no cabe en una ventanita: ocupa el viewport entero.
            El OS te espera replegado ahí abajo.
          </p>
          <div className="dv3-mundo__acciones">
            <TebeoButton>Leer la portada</TebeoButton>
            <TebeoButton variant="outline">Archivo</TebeoButton>
          </div>
        </div>
        <TebeoSticker
          className="dv3-tebeo__sticker"
          ring="TEBEO PRESS • OTRO MUNDO • TEBEO PRESS • "
          size={150}
        >
          GO!
        </TebeoSticker>
      </div>
      <div className="dv3-tebeo__marquee">
        <TebeoMarquee items={["Stickers", "Tinta", "Papel", "Bordes gordos"]} />
      </div>
    </div>
  );
}

// --- CINTA: la radio analógica (transporte y EQ de verdad operables) ---
export function MundoCinta() {
  const [estado, setEstado] = useState<CintaTransportState>("play");
  return (
    <div className="dv3-mundo cinta-scope dv3-cinta" aria-label="mundo CINTA">
      <header className="dv3-cinta__top">
        <h2 className="dv3-cinta__logo">
          Radio<span className="dv3-cinta__logo-dot">⦿</span>Cinta
        </h2>
        <div className="dv3-cinta__top-fin">
          <CintaTag tone="sky">Unit 002</CintaTag>
          <CintaMarks count={4} running={estado === "play"} />
        </div>
      </header>
      <div className="dv3-cinta__fila dv3-stagger">
        <CintaPanel label="Stereo cassette player" labelEnd="→ AI DJ" className="dv3-cinta__deck">
          <CintaDisplay
            title="Mixtape 2026 — AI DJ residente"
            progress={42}
            elapsed="1:24"
            total="3:24"
            playing={estado === "play"}
          />
          <div className="dv3-cinta__controles">
            <CintaTransport state={estado} onChange={setEstado} />
            <CintaEq bars={14} playing={estado === "play"} label="ecualizador" />
          </div>
          <div className="dv3-mundo__chips">
            <CintaTag>Stereo</CintaTag>
            <CintaTag tone="ink">Frontend-Z system</CintaTag>
            <CintaTag tone="hazard">Alta fidelidad</CintaTag>
          </div>
        </CintaPanel>
        <CintaLabel
          big="2"
          rows={[
            ["Proyecto", "Radio CINTA"],
            ["Rol", "Dev + Sound"],
            ["Stack", "React / WebAudio"],
            ["DJ", "AI enchufable"],
          ]}
          footer={
            <CintaButton size="sm" tone="amber">
              Ver caso →
            </CintaButton>
          }
        />
      </div>
    </div>
  );
}

// --- DENKI 電気: el planeta japonés — con los huéspedes más japo de KOI ---
export function MundoDenki() {
  return (
    <div className="dv3-mundo denki-scope dv3-denki" aria-label="mundo DENKI">
      <header className="dv3-denki__top">
        <span>
          Denki Works <span className="dv3-denki__kana">デザインラボ</span>
        </span>
        <span>Catálogo 2026 · No. 09</span>
      </header>
      <div className="dv3-denki__fila">
        <div className="dv3-mundo__contenido dv3-stagger">
          <div className="dv3-mundo__chips">
            <DenkiTag tone="red">Nuevo planeta</DenkiTag>
            <DenkiTag>Herencia KOI</DenkiTag>
          </div>
          <DenkiTitle
            latin="Denki Works"
            kana="電気ワークス"
            sub="Retro-industrial division"
            crown
            as="h2"
          />
          <p className="dv3-denki__desc">
            El bermellón y la imprenta de siempre — y de KOI heredamos lo más
            japonés: el torii en la colina y el sello hanko de control de
            calidad. Dos familias, un solo país.
          </p>
          <div className="dv3-mundo__acciones">
            <DenkiButton tone="red">Insert coin</DenkiButton>
            <DenkiButton variant="outline">Ver catálogo</DenkiButton>
          </div>
        </div>
        <div className="dv3-denki__lado">
          <KoiTorii className="dv3-denki__torii" tone="ink" size={200} label="torii heredado de KOI" />
          <DenkiBurst size={112} tilt={7}>
            Open to work
          </DenkiBurst>
          <KoiHanko className="dv3-denki__hanko" label="sello de calidad" size={64} />
        </div>
      </div>
      <DenkiRail items={["Three.js", "GLSL", "React", "電気", "鳥居", "判子"]} />
    </div>
  );
}

// --- OBSIDIANA: la galería de los casos reales ---
const ESQUIRLAS = [
  {
    art: "radial-gradient(120% 90% at 20% 10%, #35b6ff 0%, #14406b 45%, #10141b 100%)",
    eyebrow: "design system",
    title: "Ocho pieles, un contrato",
  },
  {
    art: "radial-gradient(120% 90% at 80% 20%, #7ae2c3 0%, #1c5a52 50%, #10141b 100%)",
    eyebrow: "astro + seo",
    title: "El sitio que Google sí ve",
  },
  {
    art: "radial-gradient(120% 90% at 40% 80%, #e0316e 0%, #5a1c3c 50%, #10141b 100%)",
    eyebrow: "gitops",
    title: "Push a main y a producción",
  },
];

export function MundoObsi() {
  const [activa, setActiva] = useState(0);
  return (
    <div className="dv3-mundo obsidiana-scope dv3-obsi" aria-label="mundo OBSIDIANA">
      <div className="dv3-obsi__cuerpo dv3-stagger">
        <ObsiPlaca eyebrow="galería" title="Las esquirlas">
          La vitrina de los casos reales: cada esquirla es un proyecto con
          problema, proceso y resultado verificables.
        </ObsiPlaca>
        <ObsiMuro height="clamp(230px, 38vh, 330px)">
          {ESQUIRLAS.map((e, i) => (
            <ObsiEsquirla
              key={e.title}
              art={e.art}
              eyebrow={e.eyebrow}
              title={e.title}
              active={activa === i}
              onSelect={() => setActiva(i)}
            />
          ))}
        </ObsiMuro>
        <div className="dv3-obsi__pie">
          <ObsiDato value="9" label="familias" accent />
          <ObsiDato value="31/36" label="sin JS al navegador" />
          <ObsiDato value="0" label="kubectl a mano" />
          <ObsiBoton>Entrar a la galería</ObsiBoton>
        </div>
      </div>
    </div>
  );
}

// --- LAB ASIS: el planeta de IA -------------------------------------------
// Concepto UX: todo demo de IA es la MISMA máquina — entrada → proceso →
// salida. Cambia la carga (texto, voz, imagen), nunca la anatomía. Cuatro
// bancos idénticos en estructura = un solo modelo mental para el visitante.

interface BancoProps {
  titulo: string;
  status: string;
  entrada: ReactNode;
  salida: ReactNode;
}

function Banco({ titulo, status, entrada, salida }: BancoProps) {
  return (
    <DomoCut cut="chamfer" title={titulo} status={status} className="dv3-banco">
      <div className="dv3-banco__cadena">
        <div className="dv3-banco__zona">
          <span className="dv3-banco__rotulo">Entrada</span>
          {entrada}
        </div>
        <div className="dv3-banco__proceso" aria-hidden="true">
          <i>▸</i>
          <i>▸</i>
          <i>▸</i>
        </div>
        <div className="dv3-banco__zona">
          <span className="dv3-banco__rotulo">Salida</span>
          {salida}
        </div>
      </div>
    </DomoCut>
  );
}

/** Onda de audio decorativa (barras que laten si `viva`). */
function Onda({ viva = false, mic = false }: { viva?: boolean; mic?: boolean }) {
  return (
    <div className={`dv3-onda${viva ? " is-viva" : ""}${mic ? " dv3-onda--mic" : ""}`} aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}

export function MundoLab() {
  return (
    <div className="dv3-mundo domo-scope dv3-lab" aria-label="mundo LAB ASIS">
      <div className="dv3-lab__cuerpo dv3-stagger">
        <header className="dv3-lab__head">
          <DomoGlitch text="Laboratorio ASIS" className="dv3-lab__titulo" />
          <DomoStatus busy>4 bancos activos</DomoStatus>
        </header>
        <p className="dv3-lab__lema">
          <DomoType
            text="Todo demo de IA es la misma máquina: entrada → proceso → salida. Cambia la carga, nunca la anatomía."
            speed={14}
          />
        </p>
        <div className="dv3-lab__bancos">
          <Banco
            titulo="Texto → Voz"
            status="tts · es"
            entrada={<p className="dv3-lab__texto">«El multiverso carga en 4.2 segundos.»</p>}
            salida={
              <>
                <Onda viva />
                <span className="dv3-lab__dato">voz_es.wav · 00:04</span>
              </>
            }
          />
          <Banco
            titulo="Voz → Texto"
            status="stt"
            entrada={
              <>
                <Onda viva mic />
                <span className="dv3-lab__dato">mic_01 · en vivo</span>
              </>
            }
            salida={
              <p className="dv3-lab__texto">
                <DomoType text="…y esto que lees es la transcripción." speed={34} />
              </p>
            }
          />
          <Banco
            titulo="Traducción"
            status="es → ja"
            entrada={<p className="dv3-lab__texto">«Hola, soy Marcelo.»</p>}
            salida={
              <p className="dv3-lab__texto dv3-lab__texto--ja" lang="ja">
                こんにちは、マルセロです。
              </p>
            }
          />
          <Banco
            titulo="Cámara"
            status="detección"
            entrada={
              <div className="dv3-lab__cam" role="img" aria-label="visor de cámara con dos detecciones">
                <span className="dv3-lab__caja" style={{ left: "12%", top: "18%", width: "34%", height: "52%" }}>
                  <b>taza · 0.93</b>
                </span>
                <span className="dv3-lab__caja" style={{ left: "55%", top: "40%", width: "36%", height: "38%" }}>
                  <b>teclado · 0.87</b>
                </span>
              </div>
            }
            salida={
              <>
                <DomoReadout label="Objetos" value="02" />
                <span className="dv3-lab__dato">12 ms / frame</span>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
