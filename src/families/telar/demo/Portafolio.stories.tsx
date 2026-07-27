import type { Meta, StoryObj } from "@storybook/react-vite";
import TelarButton from "../TelarButton/TelarButton";
import TelarClock from "../TelarClock/TelarClock";
import TelarPanel from "../TelarPanel/TelarPanel";
import TelarStat from "../TelarStat/TelarStat";
import TelarStripe from "../TelarStripe/TelarStripe";
import TelarTag from "../TelarTag/TelarTag";
import TelarTicker from "../TelarTicker/TelarTicker";
import TelarType from "../TelarType/TelarType";
import "./portafolio.scss";

const meta: Meta = {
  title: "Families/Telar/Portafolio",
  parameters: { layout: "fullscreen" },
};
export default meta;

const projects = [
  { name: "Nebula Engine", meta: "WebGL · GLSL", year: "2026" },
  { name: "Tidal Fields", meta: "Shaders · R&D", year: "2025" },
  { name: "Ember Forge", meta: "WebGPU", year: "2025" },
  { name: "Relic Scanner", meta: "R3F · Draco", year: "2024" },
  { name: "Golden Road", meta: "Three.js", year: "2024" },
];

export const Completo: StoryObj = {
  render: () => (
    <div className="telar-scope td">
      {/* ============ STATUS BAR ============ */}
      <header className="td__status">
        <span className="td__brand">
          TELAR<em>.OS</em> v1.0
        </span>
        <TelarStripe animated className="td__status-stripe" />
        <span className="td__status-right">
          <TelarTag tone="verde">● online</TelarTag>
          <TelarClock />
        </span>
      </header>

      {/* ============ REJILLA ============ */}
      <main className="td__grid">
        <TelarPanel title="ahroi — inicio" glyph="▙" weave className="td__hero">
          <h1 className="td__name">
            Marcelo
            <br />
            Huenchupan
          </h1>
          <p className="td__role">
            &gt; <TelarType words={["creative developer", "motores de partículas", "shaders GLSL", "WebGL a 60 fps", "hecho en Chile"]} />
          </p>
          <div className="td__hero-actions">
            <TelarButton tone="sol">Ver trabajo</TelarButton>
            <TelarButton variant="outline">CV.pdf ↓</TelarButton>
          </div>
          <div className="td__hero-tags">
            <TelarTag tone="fucsia">Three.js</TelarTag>
            <TelarTag tone="cobre">GLSL</TelarTag>
            <TelarTag tone="verde">WebGPU</TelarTag>
            <TelarTag tone="sol">R3F</TelarTag>
            <TelarTag tone="cream">TypeScript</TelarTag>
          </div>
        </TelarPanel>

        <TelarPanel title="proyectos.log" glyph="▤" flush className="td__proyectos">
          <ul className="td__list">
            {projects.map((p, i) => (
              <li key={p.name}>
                <a href="#" className="td__row">
                  <span className="td__row-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="td__row-name">{p.name}</span>
                  <span className="td__row-meta">
                    {p.meta} · {p.year}
                  </span>
                  <span className="td__row-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </TelarPanel>

        <TelarPanel title="stack.tejido" glyph="▦" className="td__stack">
          <div className="td__chips">
            {["Three.js", "GLSL", "WebGPU", "R3F", "TypeScript", "React", "Vite", "Blender", "Rust", "Sass"].map(
              (t, i) => (
                <TelarTag key={t} tone={(["fucsia", "cobre", "verde", "sol", "cream"] as const)[i % 5]}>
                  {t}
                </TelarTag>
              ),
            )}
          </div>
        </TelarPanel>

        <TelarPanel title="métricas" glyph="▨" className="td__stats">
          <div className="td__stats-grid">
            <TelarStat value="07" label="años" tone="sol" />
            <TelarStat value="24" label="proyectos" tone="fucsia" />
            <TelarStat value="60" label="fps mínimos" tone="verde" />
            <TelarStat value="138" label="shaders" tone="cobre" />
          </div>
        </TelarPanel>

        <TelarPanel title="contacto.dir" glyph="✉" tone="fucsia" className="td__contacto">
          <div className="td__contact-actions">
            <TelarButton tone="fucsia">Escríbeme</TelarButton>
            <TelarButton variant="outline">Agenda 15 min</TelarButton>
          </div>
          <p className="td__contact-note">ahroi@correo.dev · Santiago, Chile</p>
        </TelarPanel>
      </main>

      {/* ============ TICKER ============ */}
      <TelarTicker
        items={[
          "Disponible para proyectos 2026",
          "Hecho a mano en Chile",
          "WebGL · WebGPU · Shaders",
          "60 fps o nada",
          "Freelance & colaboraciones",
        ]}
      />
    </div>
  ),
};
