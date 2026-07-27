import type { Meta, StoryObj } from "@storybook/react-vite";
import KoiBadge from "../KoiBadge/KoiBadge";
import KoiBrush from "../KoiBrush/KoiBrush";
import KoiButton from "../KoiButton/KoiButton";
import KoiCard from "../KoiCard/KoiCard";
import KoiDate from "../KoiDate/KoiDate";
import KoiNav from "../KoiNav/KoiNav";
import KoiPill from "../KoiPill/KoiPill";
import KoiPlay from "../KoiPlay/KoiPlay";
import KoiStat from "../KoiStat/KoiStat";
import KoiSun from "../KoiSun/KoiSun";
import "./portafolio.scss";

const meta: Meta = {
  title: "Families/Koi/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

/** Placeholder de arte — en producción: ilustración o canvas 3D en vivo. */
const art = (a: string, b: string, c = "#1d2749") => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: `radial-gradient(ellipse 80% 60% at 70% 20%, ${a} 0%, transparent 60%),
        radial-gradient(ellipse 70% 70% at 25% 80%, ${b} 0%, transparent 60%),
        linear-gradient(170deg, ${c} 0%, #0b1023 100%)`,
    }}
  />
);

export const Completo: StoryObj = {
  render: () => (
    <div className="koi-scope koi-scene kdp">
      {/* ============ NAV FLOTANTE ============ */}
      <div className="kdp__section kdp__nav">
        <KoiNav
          brand="S-"
          links={[
            { label: "Intro", href: "#", icon: "✳", active: true },
            { label: "Proyectos", href: "#proyectos", icon: "▤" },
            { label: "Sobre mí", href: "#", icon: "✦" },
          ]}
          right={
            <>
              <KoiButton variant="ghost" size="sm" aria-label="GitHub">⌘</KoiButton>
              <KoiButton tone="sun" size="sm">Contacto</KoiButton>
            </>
          }
        />
      </div>

      {/* ============ HERO ============ */}
      <div className="kdp__section">
        <div className="kdp__hero">
          <div className="kdp__stage">
            {art("#f04a2f4d", "#2f6fd866")}
            <span className="kdp__sun">
              <KoiSun size={170} />
            </span>
            <span className="kdp__vertical">
              <KoiBrush size="hero" tilt={0}>ahroi</KoiBrush>
            </span>
            <span className="kdp__play">
              <KoiPlay label="reel" onClick={() => {}} />
            </span>
            <span className="kdp__badge">
              <KoiBadge
                eyebrow="📍 Chile · Remoto"
                title="Creative Dev"
                sub="WebGL · Shaders · 3D"
              />
            </span>
          </div>

          <aside className="kdp__aside">
            <KoiCard
              title="Nebula Engine"
              pill="Proyecto destacado"
              visual={art("#6b4df066", "#f04a2f44")}
              href="#"
            >
              <KoiPill tone="gold">1M partículas</KoiPill>
            </KoiCard>
            <div className="kdp__hud">
              <KoiPill icon="🌙">modo nocturno</KoiPill>
              <KoiPill icon="⚡">60 fps</KoiPill>
              <KoiPill icon="🎐">5ms frame</KoiPill>
            </div>
            <KoiDate lines={["Próximo", "slot", "libre"]} over="Ago, 2026" big="12" />
          </aside>
        </div>

        <div className="kdp__stats">
          <KoiStat
            items={[
              { label: "años", value: "07" },
              { label: "proyectos", value: "24" },
              { label: "fps mínimos", value: "60" },
              { label: "shaders escritos", value: "138" },
            ]}
          />
        </div>
      </div>

      {/* ============ PROYECTOS (BENTO) ============ */}
      <div id="proyectos" className="kdp__section">
        <div className="kdp__block-head">
          <KoiBrush as="h2" size="title">Proyectos</KoiBrush>
          <KoiPill tone="snow" icon="▤">04 seleccionados</KoiPill>
        </div>
        <div className="kdp__bento">
          <KoiCard
            title="Tidal Fields"
            orientation="tall"
            pill="WebGL"
            visual={art("#2f6fd880", "#6b4df055")}
            href="#"
          />
          <KoiCard
            title="Quiver Dance"
            orientation="tall"
            pill="R3F"
            visual={art("#6b4df073", "#f04a2f40")}
            href="#"
          />
          <div className="kdp__bento-wide">
            <KoiCard
              title="Gold Fish Group Dance"
              pill="WebGPU · Compute"
              visual={art("#f6b83c66", "#f04a2f4d")}
              href="#"
            >
              <KoiPill tone="gold">caso de estudio</KoiPill>
            </KoiCard>
          </div>
          <div className="kdp__bento-wide">
            <KoiCard
              title="Relic Scanner"
              pill="Fotogrametría"
              visual={art("#2f6fd85e", "#f6b83c40")}
              href="#"
            />
          </div>
          <KoiCard
            title="Golden Road"
            orientation="tall"
            pill="Three.js"
            visual={art("#f6b83c59", "#2f6fd84d")}
            href="#"
          />
          <KoiCard
            title="Ember Forge"
            orientation="tall"
            pill="GLSL"
            visual={art("#f04a2f66", "#6b4df044")}
            href="#"
          />
        </div>
      </div>

      {/* ============ CTA ============ */}
      <div className="kdp__section">
        <div className="kdp__cta">
          <span className="kdp__cta-sun">
            <KoiSun size={190} />
          </span>
          <KoiBrush as="h2" size="hero" tilt={-2}>
            ¿Armamos algo?
          </KoiBrush>
          <p style={{ margin: 0, maxWidth: "46ch", color: "rgb(250 247 242 / 0.75)" }}>
            Experiencias 3D que se sienten como una noche de festival: vivas,
            brillantes y fluidas en cualquier pantalla.
          </p>
          <div className="kdp__cta-actions">
            <KoiButton size="lg" tone="sun">Escríbeme</KoiButton>
            <KoiButton size="lg" variant="outline">Agenda 15 min</KoiButton>
          </div>
        </div>

        <div className="kdp__footer">
          <span>© 2026 ahroi — hecho con @ahroi/foundation</span>
          <span>GitHub · LinkedIn · Email</span>
        </div>
      </div>
    </div>
  ),
};
