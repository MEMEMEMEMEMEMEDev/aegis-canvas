import type { Meta, StoryObj } from "@storybook/react-vite";
import TelarButton from "./TelarButton/TelarButton";
import TelarClock from "./TelarClock/TelarClock";
import TelarPanel from "./TelarPanel/TelarPanel";
import TelarStat from "./TelarStat/TelarStat";
import TelarStripe from "./TelarStripe/TelarStripe";
import TelarTag from "./TelarTag/TelarTag";
import TelarTicker from "./TelarTicker/TelarTicker";
import TelarType from "./TelarType/TelarType";

const meta: Meta = {
  title: "Families/Telar/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div
      className="telar-scope"
      style={{ minHeight: "100vh", padding: "2rem", display: "grid", gap: "var(--ds-space-xl)", alignContent: "start" }}
    >
      <TelarStripe animated height={8} />

      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap", alignItems: "center" }}>
        <TelarButton>Cream</TelarButton>
        <TelarButton tone="fucsia">Fucsia</TelarButton>
        <TelarButton tone="cobre">Cobre</TelarButton>
        <TelarButton tone="verde">Verde</TelarButton>
        <TelarButton tone="sol">Sol</TelarButton>
        <TelarButton variant="outline">Outline</TelarButton>
        <TelarButton variant="ghost">Ghost</TelarButton>
        <TelarButton disabled>Off</TelarButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-2xs)", flexWrap: "wrap" }}>
        <TelarTag tone="fucsia">Three.js</TelarTag>
        <TelarTag tone="cobre">GLSL</TelarTag>
        <TelarTag tone="verde">● online</TelarTag>
        <TelarTag tone="sol">WebGPU</TelarTag>
        <TelarTag tone="cream">TypeScript</TelarTag>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--ds-space-sm)", maxWidth: 900 }}>
        <TelarPanel title="panel.base" glyph="▚">
          Célula del OS: barra mono, esquinas chakana, puntos de hilado.
        </TelarPanel>
        <TelarPanel title="panel.tejido" glyph="▙" weave>
          Con franja tejida bajo la barra.
        </TelarPanel>
        <TelarPanel title="panel.tinta" glyph="✉" tone="sol">
          Barra entintada con un hilado.
        </TelarPanel>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-2xl)", flexWrap: "wrap", alignItems: "flex-end" }}>
        <TelarStat value="60" label="fps" tone="verde" />
        <TelarStat value="138" label="shaders" tone="fucsia" />
        <TelarClock />
        <span style={{ fontFamily: "var(--telar-font-mono)", fontSize: "0.9rem" }}>
          &gt; <TelarType words={["texto que se escribe", "y se borra", "como terminal"]} />
        </span>
      </div>

      <TelarTicker items={["Ticker denso estilo terminal", "Pausa al hover", "Respeta reduced-motion"]} />
    </div>
  ),
};
