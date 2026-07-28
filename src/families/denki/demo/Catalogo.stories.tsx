import type { Meta, StoryObj } from "@storybook/react-vite";
import DenkiBarcode from "../DenkiBarcode/DenkiBarcode";
import DenkiBurst from "../DenkiBurst/DenkiBurst";
import DenkiButton from "../DenkiButton/DenkiButton";
import DenkiCombo from "../DenkiCombo/DenkiCombo";
import DenkiFrame from "../DenkiFrame/DenkiFrame";
import DenkiPanel from "../DenkiPanel/DenkiPanel";
import DenkiRail from "../DenkiRail/DenkiRail";
import DenkiTag from "../DenkiTag/DenkiTag";
import DenkiTitle from "../DenkiTitle/DenkiTitle";
import "../denki.scss";
import "./catalogo.scss";

const meta: Meta = {
  title: "Families/Denki/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

/** Placeholder de arte — en producción: ilustración técnica o canvas 3D. */
const art = (a: string, b: string) => (
  <div
    style={{
      background: `radial-gradient(ellipse 85% 65% at 60% 30%, ${a} 0%, transparent 70%),
        linear-gradient(155deg, ${b} 0%, transparent 100%)`,
    }}
  />
);

const PRODUCTOS = [
  {
    latin: "Reactor",
    kana: "リアクター",
    desc: "Escena three.js en tiempo real con shaders GLSL propios.",
    specs: [
      ["Rol", "Dev + Art"],
      ["Stack", "three.js / GLSL"],
      ["Salida", "60 fps"],
    ],
    burst: "2026",
    arte: ["#d13a1e66", "#f2e4c62b"],
  },
  {
    latin: "Telar OS",
    kana: "テラール",
    desc: "Portafolio-sistema operativo de una sola pantalla.",
    specs: [
      ["Rol", "Diseño + Dev"],
      ["Stack", "React / SCSS"],
      ["Scroll", "Cero"],
    ],
    burst: "1 vista",
    arte: ["#f2e4c635", "#d13a1e44"],
  },
  {
    latin: "Domo Brief",
    kana: "ドモ・ブリーフ",
    desc: "Formulario-instrumento operable por un agente AI.",
    specs: [
      ["Rol", "UX + Dev"],
      ["Stack", "React + AI"],
      ["Controles", "Todos"],
    ],
    burst: "AI ready",
    arte: ["#d13a1e4d", "#f2e4c62b"],
  },
];

const COMANDOS = [
  { label: "Shader cancel", sequence: ["↓", "↘", "→", "GLSL"] },
  { label: "Triple frame", sequence: ["←", "←", "60FPS"] },
  { label: "AI assist", sequence: ["↓", "↓", "TAB"] },
  { label: "Full deploy", sequence: ["←", "↓", "→", "SHIP"] },
];

function Catalogo() {
  return (
    <div className="denki-scope dk">
      <header className="dk__topbar">
        <span>
          Ahroi Works <span className="dk__topbar-kana">デザインラボ</span>
        </span>
        <span>Catálogo 2026 · No. 08</span>
      </header>

      <section className="dk__hero">
        <div className="dk__hero-col">
          <div className="dk__hero-chips">
            <DenkiTag tone="red">Nuevo</DenkiTag>
            <DenkiTag>Pro grade developer</DenkiTag>
          </div>
          <DenkiTitle
            latin="Ahroi Works Pro"
            kana="アロイ・ワークス"
            sub="Creative Developer Edition"
            crown
            as="h1"
          />
          <p style={{ margin: 0, maxWidth: "30rem", fontSize: "var(--ds-font-size-sm)", lineHeight: 1.6 }}>
            Webs 3D, shaders e interfaces vivas, fabricadas a mano. Cada
            proyecto sale de fábrica con su propia ficha técnica.
          </p>
          <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap" }}>
            <DenkiButton tone="red" size="lg">
              Insert coin
            </DenkiButton>
            <DenkiButton variant="outline" size="lg">
              Ver catálogo ↓
            </DenkiButton>
          </div>
        </div>
        <div className="dk__hero-lado">
          <DenkiBurst size={150}>Open to work</DenkiBurst>
          <div className="dk__hero-minis">
            <DenkiFrame caption="Fig. 01 — sin plantillas" strike ratio="4 / 3">
              {art("#f2e4c630", "#d13a1e3d")}
            </DenkiFrame>
            <DenkiFrame caption="Fig. 02 — entrada válida" ratio="4 / 3">
              <div style={{ display: "grid", placeItems: "center" }}>
                <DenkiCombo sequence={["←", "↓", "→"]} speed={420} />
              </div>
            </DenkiFrame>
          </div>
        </div>
      </section>

      <DenkiRail items={["Three.js", "GLSL", "React", "WebGL", "Motion", "電気"]} />

      <section className="dk__grid" aria-label="proyectos">
        {PRODUCTOS.map((p) => (
          <DenkiPanel key={p.latin} label={p.latin} labelEnd={p.kana}>
            <DenkiFrame ratio="16 / 9">{art(p.arte[0] ?? "", p.arte[1] ?? "")}</DenkiFrame>
            <DenkiTitle latin={p.latin} kana={p.kana} size="card" as="h2" />
            <p style={{ margin: 0, fontSize: "var(--ds-font-size-xs)", lineHeight: 1.6, opacity: 0.85 }}>
              {p.desc}
            </p>
            <dl className="dk-prod__specs" style={{ margin: 0 }}>
              {p.specs.map(([k, v]) => (
                <div className="dk-prod__spec" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="dk-prod__pie">
              <DenkiBurst size={84} tone="red" tilt={7} pulse={false}>
                {p.burst}
              </DenkiBurst>
              <DenkiButton variant="outline" className="denki-button--inverse">
                Ver caso →
              </DenkiButton>
            </div>
          </DenkiPanel>
        ))}
      </section>

      <DenkiPanel tone="paper" label="Command list" labelEnd="スキル">
        <div className="dk__comandos">
          {COMANDOS.map((c) => (
            <div className="dk__comando" key={c.label}>
              <DenkiCombo label={c.label} sequence={c.sequence} />
              <DenkiTag>Desbloqueado</DenkiTag>
            </div>
          ))}
        </div>
      </DenkiPanel>

      <footer className="dk__pie">
        <div className="dk__pie-marcas">
          <DenkiBarcode code="4 202600 000008" />
          <span className="dk__hatch" aria-hidden="true" />
          <DenkiTag tone="panel">© 2026 Ahroi Works</DenkiTag>
        </div>
        <DenkiButton tone="red" size="lg">
          Contacto →
        </DenkiButton>
      </footer>
    </div>
  );
}

export const Completo: StoryObj = {
  render: () => <Catalogo />,
};
