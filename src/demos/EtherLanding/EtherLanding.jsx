import HudPanel from "../../families/hud/HudPanel/HudPanel";
import MetaTag from "../../families/hud/MetaTag/MetaTag";
import Numeral from "../../families/hud/Numeral/Numeral";
import Button from "../../primitives/Button/Button";
import "./EtherLanding.scss";

const PALETTE = ["#7BA7AF", "#E2E4D2", "#455957"];

/**
 * Concept landing generated from the inspiration card resources/1-idea-concepto.png.
 * Clean, atmospheric game-UI: oversized display type, mono meta labels, HUD frames,
 * deliberately off-grid composition. Built entirely on the foundation contract.
 */
export default function EtherLanding() {
  return (
    <div className="ether">
      <header className="ether__top">
        <span className="ether__brand">
          AHROI<span className="ether__brand-os">/OS</span>
        </span>
        <nav className="ether__nav">
          <MetaTag>EMPRESAS</MetaTag>
          <MetaTag>FREELANCE</MetaTag>
          <MetaTag>ORIENTACIÓN</MetaTag>
        </nav>
        <span className="ether__status">
          <span className="ether__pulse" aria-hidden="true" /> SYS.ONLINE
        </span>
      </header>

      <main className="ether__stage">
        {/* Giant ghost numeral — atmospheric watermark behind the headline. */}
        <Numeral className="ether__watermark" value="08" aria-hidden="true" />
        <span className="ether__coord ether__coord--a">N 33°27′ · O 70°39′</span>

        <div className="ether__headline">
          <span className="ether__eyebrow">配色灵感 · ATMOSPHERE</span>
          <h1 className="ether__title">
            CALM
            <br />
            ENGINE
          </h1>
          <p className="ether__lede">
            Una plataforma personal donde la arquitectura <em>es</em> el
            portafolio. Micro-frontends, motor 3D propio e IA local —
            orquestados en mi infra.
          </p>
          <div className="ether__cta">
            <Button>Entrar al sistema</Button>
            <Button variant="ghost">Ver arquitectura →</Button>
          </div>
        </div>

        <aside className="ether__panel-col">
          <figure className="ether__frame">
            <div className="ether__frame-img" />
            <figcaption className="ether__frame-cap">
              FIG.01 — solitude.exe
            </figcaption>
          </figure>

          <HudPanel label="COLOR_MATCHING" index="01" pad="md">
            <div className="ether__swatches">
              {PALETTE.map((c) => (
                <div key={c} className="ether__swatch">
                  <span
                    className="ether__swatch-chip"
                    style={{ background: c }}
                  />
                  <MetaTag swatch={c}>{c}</MetaTag>
                </div>
              ))}
            </div>
          </HudPanel>
        </aside>
      </main>
    </div>
  );
}
