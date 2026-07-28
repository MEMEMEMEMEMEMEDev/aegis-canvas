import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import DomoButton from "../DomoButton/DomoButton";
import DomoCut from "../DomoCut/DomoCut";
import DomoDeck, { DomoSlide } from "../DomoDeck/DomoDeck";
import DomoGauge from "../DomoGauge/DomoGauge";
import DomoGlitch from "../DomoGlitch/DomoGlitch";
import DomoReadout from "../DomoReadout/DomoReadout";
import DomoStatus from "../DomoStatus/DomoStatus";
import DomoType from "../DomoType/DomoType";
import KoiBrush from "../../koi/KoiBrush/KoiBrush";
import KoiButton from "../../koi/KoiButton/KoiButton";
import KoiHanko from "../../koi/KoiHanko/KoiHanko";
import KoiPill from "../../koi/KoiPill/KoiPill";
import KoiStream from "../../koi/KoiStream/KoiStream";
import KoiSun from "../../koi/KoiSun/KoiSun";
import TebeoButton from "../../tebeo/TebeoButton/TebeoButton";
import TebeoHeadline from "../../tebeo/TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../../tebeo/TebeoMarquee/TebeoMarquee";
import TebeoSticker from "../../tebeo/TebeoSticker/TebeoSticker";
import TebeoTag from "../../tebeo/TebeoTag/TebeoTag";
import "../domo.scss";
import "./multiverso.scss";

const meta: Meta = {
  title: "Families/DomoV2/Multiverso",
  parameters: { layout: "fullscreen" },
};
export default meta;

// Destinos del multiverso: cada uno es "otra web" con su propia familia.
const MUNDOS = ["OS", "KOI", "TEBEO", "FIN"] as const;

interface Warp {
  dest: number;
  nombre: string;
  url: string;
}

/**
 * DOMO OS v2: la AI te lleva por un deck donde ciertos slides SON otras
 * webs — la ventana de navegador falsa (.mv-world) vende la ilusión, y la
 * secuencia de transferencia (glitch + ruta + gauge) hace el viaje creíble.
 */
function Multiverso() {
  const [slide, setSlide] = useState(0);
  const [warp, setWarp] = useState<Warp | null>(null);
  const [pct, setPct] = useState(0);

  const viaja = (dest: number, nombre: string, url: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSlide(dest);
      return;
    }
    setPct(0);
    setWarp({ dest, nombre, url });
  };

  // Transferencia: el gauge sube en ticks secos y al llegar a 100 aterriza.
  useEffect(() => {
    if (!warp) return undefined;
    const id = window.setInterval(() => {
      setPct((p) => {
        const next = p + 12;
        if (next >= 100) {
          window.clearInterval(id);
          setSlide(warp.dest);
          setWarp(null);
          return 100;
        }
        return next;
      });
    }, 140);
    return () => window.clearInterval(id);
  }, [warp]);

  return (
    <div className="domo-scope mv">
      <header className="mv__hud">
        <span>
          Domo OS v2<span className="mv__hud-sep">◆</span>Multiverso
        </span>
        <span className="mv__ruta">
          Ruta ◆ {MUNDOS[Math.min(slide, MUNDOS.length - 1)]}
        </span>
      </header>

      <DomoDeck label="multiverso" index={slide} onIndexChange={setSlide}>
        {/* ---- 01 · HUB ---- */}
        <DomoSlide title="Hub">
          <div className="mv-hub">
            <span className="mv-hub__kicker">◇ Sistema de rutas</span>
            <h1 className="mv-hub__title">
              <DomoGlitch text="Multiverso." />
            </h1>
            <DomoType
              text="Cada proyecto vive en su propia web, con su propia piel. Yo soy la ruta entre ellas. Elige un portal."
              speed={16}
            />
            <div className="mv-hub__grid">
              <DomoCut cut="blade" title="Koi // Matsuri" status="Portal 01">
                <p className="mv-hub__desc">
                  Festival nocturno: vidrio esmerilado, linternas que suben, hinomaru y un
                  sello hanko de verdad.
                </p>
                <DomoButton onClick={() => viaja(1, "KOI", "koi-matsuri.jp")}>
                  Viajar →
                </DomoButton>
              </DomoCut>
              <DomoCut cut="notch" title="Tebeo // Press" status="Portal 02">
                <p className="mv-hub__desc">
                  Papel crema, tinta gruesa, stickers girando y titulares que gritan. Otro
                  planeta, otra imprenta.
                </p>
                <DomoButton onClick={() => viaja(2, "TEBEO", "tebeo.press")}>
                  Viajar →
                </DomoButton>
              </DomoCut>
              <DomoCut cut="chamfer" tone="ink" title="System" status="v2.0">
                <div className="mv-hub__sysrow">
                  <DomoReadout label="Mundos" value="03" />
                  <DomoReadout label="Scroll" value="00" />
                  <DomoGauge value={100} label="integridad" size={64} />
                </div>
                <DomoStatus busy>Rutas estables</DomoStatus>
              </DomoCut>
            </div>
          </div>
        </DomoSlide>

        {/* ---- 02 · MUNDO KOI ---- */}
        <DomoSlide title="Koi">
          <div className="mv-world">
            <div className="mv-world__bar">
              <span className="mv-world__dots">●●●</span>
              <span className="mv-world__url">https://koi-matsuri.jp</span>
              <span className="mv-world__os">vía Domo OS</span>
            </div>
            <div className="mv-world__page">
              <div className="koi-scope koi-scene mv-koi">
                <KoiStream count={9} />
                <KoiSun className="mv-koi__sol" size={230} />
                <KoiHanko className="mv-koi__hanko" label="sello del festival" size={68} />
                <div className="mv-koi__contenido">
                  <KoiPill icon="🏮" tone="gold">
                    Festival nocturno · 19:00
                  </KoiPill>
                  <KoiBrush as="h2" size="hero">
                    Matsuri
                  </KoiBrush>
                  <p className="mv-koi__sub">
                    Estás en otra web — misma app, otra familia. Vidrio, linternas y
                    caligrafía: el proyecto entero vive con esta piel.
                  </p>
                  <div className="mv-koi__acciones">
                    <KoiButton tone="sun">Explorar el festival</KoiButton>
                    <KoiButton variant="outline" onClick={() => viaja(0, "DOMO OS", "domo.os")}>
                      ← Volver al OS
                    </KoiButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DomoSlide>

        {/* ---- 03 · MUNDO TEBEO ---- */}
        <DomoSlide title="Tebeo">
          <div className="mv-world">
            <div className="mv-world__bar">
              <span className="mv-world__dots">●●●</span>
              <span className="mv-world__url">https://tebeo.press</span>
              <span className="mv-world__os">vía Domo OS</span>
            </div>
            <div className="mv-world__page">
              <div className="tebeo-scope mv-tebeo">
                <div className="mv-tebeo__fila">
                  <div className="mv-tebeo__col">
                    <div className="mv-tebeo__chips">
                      <TebeoTag tone="sun">¡Extra!</TebeoTag>
                      <TebeoTag>Edición 03</TebeoTag>
                    </div>
                    <TebeoHeadline as="h2" size="section">
                      ¡Otra web, otra tinta<em>!</em>
                    </TebeoHeadline>
                    <p style={{ margin: 0, maxWidth: "26rem" }}>
                      El mismo deck te trajo hasta una imprenta neo-retro. Cada proyecto
                      puede gritar con su propia voz.
                    </p>
                    <TebeoButton onClick={() => viaja(0, "DOMO OS", "domo.os")}>
                      ← Volver al OS
                    </TebeoButton>
                  </div>
                  <TebeoSticker ring="TEBEO PRESS • OTRO MUNDO • TEBEO PRESS • " size={150}>
                    GO!
                  </TebeoSticker>
                </div>
                <div className="mv-tebeo__marquee">
                  <TebeoMarquee items={["Stickers", "Tinta", "Papel", "Bordes gordos"]} />
                </div>
              </div>
            </div>
          </div>
        </DomoSlide>

        {/* ---- 04 · FIN ---- */}
        <DomoSlide title="Fin">
          <div className="mv-fin">
            <DomoCut cut="blade" title="Informe de viaje" status="Completo" className="mv-fin__panel">
              <div className="mv-fin__datos">
                <DomoReadout label="Mundos" value="03" />
                <DomoReadout label="Familias" value="03" />
                <DomoReadout label="Apps" value="01" size="lg" />
              </div>
              <DomoType
                text="Todo esto fue una sola aplicación: un deck, tres pieles, cero scroll. Así se sentiría tu portafolio."
                speed={16}
              />
              <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap" }}>
                <DomoButton onClick={() => viaja(0, "DOMO OS", "domo.os")}>
                  ← Volver al hub
                </DomoButton>
                <DomoButton variant="outline">Abrir brief</DomoButton>
              </div>
            </DomoCut>
          </div>
        </DomoSlide>
      </DomoDeck>

      {warp && (
        <div className="mv-warp" role="status">
          <DomoCut cut="blade" className="mv-warp__panel" title="Transferencia" status={warp.url}>
            <DomoGlitch intense text={`DOMO → ${warp.nombre}`} className="mv-warp__ruta" />
            <DomoType text={`Ruta establecida. Cargando entorno ${warp.url}`} speed={12} />
            <DomoGauge value={pct} label="transferencia" size={64} />
          </DomoCut>
        </div>
      )}
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => <Multiverso />,
};
