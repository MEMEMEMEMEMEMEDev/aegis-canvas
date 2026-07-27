import type { Meta, StoryObj } from "@storybook/react-vite";
import TebeoButton from "../TebeoButton/TebeoButton";
import TebeoCard from "../TebeoCard/TebeoCard";
import TebeoHeadline from "../TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "../TebeoMarquee/TebeoMarquee";
import TebeoMedia from "../TebeoMedia/TebeoMedia";
import TebeoNavbar from "../TebeoNavbar/TebeoNavbar";
import TebeoPhone from "../TebeoPhone/TebeoPhone";
import TebeoRotator from "../TebeoRotator/TebeoRotator";
import TebeoSticker from "../TebeoSticker/TebeoSticker";
import TebeoTabbar from "../TebeoTabbar/TebeoTabbar";
import TebeoTag from "../TebeoTag/TebeoTag";
import "./portafolio.scss";

const meta: Meta = {
  title: "Families/Tebeo/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

/** Placeholder de arte — en producción: capturas o canvas 3D en vivo. */
const art = (a: string, b: string, c = "#d8d2be") => (
  <div
    style={{
      background: `radial-gradient(ellipse 90% 70% at 65% 25%, ${a} 0%, transparent 65%),
        radial-gradient(ellipse 60% 60% at 20% 85%, ${b} 0%, transparent 60%),
        linear-gradient(165deg, ${c} 0%, #cfc8b2 100%)`,
    }}
  />
);

const projects = [
  {
    title: "Nebula Engine",
    text: "Un millón de partículas GPU a 60 fps con shaders propios de simulación.",
    tags: ["Three.js", "GLSL"],
    colors: ["#b39dff", "#f0a5c0"] as const,
  },
  {
    title: "Tidal Fields",
    text: "Fluidos resueltos íntegramente en fragment shader, cero física en CPU.",
    tags: ["WebGL", "R&D"],
    colors: ["#8fd3f4", "#9fc5e8"] as const,
  },
  {
    title: "Relic Scanner",
    text: "Visor de fotogrametría con niveles de detalle progresivos vía Draco.",
    tags: ["R3F", "Draco"],
    colors: ["#f5c26b", "#e8a87c"] as const,
  },
];

function MiniApp({ name, colors, tabs }: { name: string; colors: readonly [string, string]; tabs: [string, string, string] }) {
  return (
    <div className="pd-app">
      <div className="pd-app__bar">
        <span>
          {name}
          <em> ✦</em>
        </span>
        <span>●●●</span>
      </div>
      <div className="pd-app__art">{art(colors[0], colors[1])}</div>
      <div className="pd-app__chips">
        <TebeoTag tone="sun">{tabs[0]}</TebeoTag>
        <TebeoTag>60 fps</TebeoTag>
      </div>
      <TebeoTabbar
        items={[
          { icon: "⌂", label: tabs[0], active: true },
          { icon: "▦", label: tabs[1] },
          { icon: "◉", label: tabs[2] },
        ]}
      />
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => (
    <div className="tebeo-scope pd">
      {/* ============ NAV STICKY ============ */}
      <div className="pd__nav">
        <div className="pd__section">
          <TebeoNavbar
            brand="ahroi"
            links={[
              { label: "Proyectos", href: "#proyectos", active: true },
              { label: "Apps", href: "#apps" },
              { label: "Stack", href: "#stack" },
            ]}
            cta={<TebeoButton tone="sun" size="sm">Contacto</TebeoButton>}
          />
        </div>
      </div>

      {/* ============ HERO ============ */}
      <div className="pd__section">
        <div className="pd__hero">
          <div className="pd__hero-copy">
            <div className="pd__chips">
              <TebeoTag tone="sun">Disponible 2026</TebeoTag>
              <TebeoTag>Chile · Remoto</TebeoTag>
            </div>
            <TebeoHeadline>
              Hago cosas{" "}
              <TebeoRotator
                words={["3D", "locas", "móviles", "veloces"]}
                tone="hollow"
              />
              <br />
              para la web
            </TebeoHeadline>
            <p className="pd__lede">
              Motores de partículas, shaders y experiencias WebGL que corren a
              60 fps hasta en el teléfono de tu abuela.
            </p>
            <div className="pd__actions">
              <TebeoButton size="lg" tone="sun">Ver proyectos →</TebeoButton>
              <TebeoButton size="lg" variant="outline">Descargar CV</TebeoButton>
              <TebeoSticker ring="demo en vivo · webgl" size={116} onClick={() => {}}>
                Play ▶
              </TebeoSticker>
            </div>
          </div>
          <div className="pd__hero-media">
            <TebeoMedia rail="right" ratio="4 / 5">
              {art("#b39dff", "#f0a5c0")}
            </TebeoMedia>
          </div>
        </div>
      </div>

      {/* ============ MARQUEE SKILLS ============ */}
      <TebeoMarquee
        items={["Three.js", "GLSL", "WebGPU", "React", "TypeScript", "Blender"]}
      />

      {/* ============ PROYECTOS ============ */}
      <div id="proyectos" className="pd__section pd__block">
        <div className="pd__block-head">
          <TebeoHeadline as="h2" size="section">
            Proyectos<em>.</em>
          </TebeoHeadline>
          <TebeoTag tone="ink">03 seleccionados</TebeoTag>
        </div>
        <div className="pd__projects">
          {projects.map((p) => (
            <TebeoCard
              key={p.title}
              title={p.title}
              footer={
                <>
                  <TebeoButton size="sm">Caso →</TebeoButton>
                  <TebeoButton size="sm" variant="ghost">Código</TebeoButton>
                </>
              }
            >
              <div style={{ display: "grid", gap: "var(--ds-space-sm)" }}>
                <div className="pd__thumb">{art(p.colors[0], p.colors[1])}</div>
                <p style={{ margin: 0 }}>{p.text}</p>
                <div className="pd__chips">
                  {p.tags.map((t) => (
                    <TebeoTag key={t}>{t}</TebeoTag>
                  ))}
                </div>
              </div>
            </TebeoCard>
          ))}
        </div>
      </div>

      {/* ============ APPS MÓVILES ============ */}
      <div id="apps" className="pd__section pd__block">
        <div className="pd__apps">
          <div className="pd__apps-copy">
            <TebeoHeadline as="h2" size="section">
              También <em>móvil</em>
            </TebeoHeadline>
            <p className="pd__lede">
              Las mismas escenas 3D, tocables y a 60 fps en pantallas chicas.
              Interfaces que se sienten de teléfono, no páginas apretadas.
            </p>
            <TebeoButton variant="outline">Ver casos móviles →</TebeoButton>
          </div>
          <TebeoPhone tilt={-5} width={250}>
            <MiniApp name="nebula" colors={["#b39dff", "#f0a5c0"]} tabs={["Inicio", "Obras", "Perfil"]} />
          </TebeoPhone>
          <TebeoPhone tilt={4} width={250}>
            <MiniApp name="tidal" colors={["#8fd3f4", "#9fc5e8"]} tabs={["Fluido", "Ajustes", "Info"]} />
          </TebeoPhone>
        </div>
      </div>

      {/* ============ STACK ============ */}
      <div id="stack" className="pd__section pd__block">
        <div className="pd__grid-2">
          <TebeoCard title="Stack" dots={false}>
            <div className="pd__chips">
              {["Three.js", "GLSL", "WebGPU", "R3F", "TypeScript", "React", "Vite", "Blender", "Rust"].map((t, i) => (
                <TebeoTag key={t} tone={i % 4 === 0 ? "sun" : "paper"}>{t}</TebeoTag>
              ))}
            </div>
          </TebeoCard>
          <TebeoCard title="En números" tone="sun" dots={false}>
            <div className="pd__stats">
              {[
                ["07", "años"],
                ["24", "proyectos"],
                ["60", "fps siempre"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="pd__stat-n">{n}</div>
                  <div className="pd__stat-l">{l}</div>
                </div>
              ))}
            </div>
          </TebeoCard>
        </div>
      </div>

      {/* ============ MARQUEE DISPONIBILIDAD ============ */}
      <TebeoMarquee
        tone="sun"
        direction="right"
        speed={26}
        items={["Disponible para proyectos", "Freelance", "Colaboraciones"]}
      />

      {/* ============ CTA ============ */}
      <div className="pd__cta">
        <div className="pd__section pd__cta-row">
          <TebeoHeadline as="h2" size="section" className="tebeo-headline--inverse">
            ¿Armamos algo juntos?
          </TebeoHeadline>
          <div className="pd__actions">
            <TebeoButton size="lg" tone="sun">Escríbeme ✦</TebeoButton>
            <TebeoButton size="lg" variant="outline" className="tebeo-button--inverse">
              Agenda 15 min
            </TebeoButton>
          </div>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="pd__section pd__footer">
        <span>© 2026 ahroi ✦ hecho con @ahroi/foundation</span>
        <span>GitHub · LinkedIn · Email</span>
      </div>
    </div>
  ),
};
