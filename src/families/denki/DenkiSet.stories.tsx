import type { Meta, StoryObj } from "@storybook/react-vite";
import DenkiBarcode from "./DenkiBarcode/DenkiBarcode";
import DenkiBurst from "./DenkiBurst/DenkiBurst";
import DenkiButton from "./DenkiButton/DenkiButton";
import DenkiCombo from "./DenkiCombo/DenkiCombo";
import DenkiFrame from "./DenkiFrame/DenkiFrame";
import DenkiPanel from "./DenkiPanel/DenkiPanel";
import DenkiRail from "./DenkiRail/DenkiRail";
import DenkiTag from "./DenkiTag/DenkiTag";
import DenkiTitle from "./DenkiTitle/DenkiTitle";

const meta: Meta = {
  title: "Families/Denki/Set",
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

export const Overview: StoryObj = {
  render: () => (
    <div
      className="denki-scope"
      style={{
        minHeight: "100vh",
        padding: "3rem",
        display: "grid",
        gap: "var(--ds-space-2xl)",
        alignContent: "start",
      }}
    >
      <DenkiTitle
        latin="Fight King Pro"
        kana="ファイトキング"
        sub="Leverless Edition"
        crown
        as="h1"
      />

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <DenkiButton>Comprar</DenkiButton>
        <DenkiButton tone="red">Insert coin</DenkiButton>
        <DenkiButton variant="outline">Specs</DenkiButton>
        <DenkiButton variant="ghost">Manual</DenkiButton>
        <DenkiButton size="sm">sm</DenkiButton>
        <DenkiButton size="lg">lg</DenkiButton>
        <DenkiButton disabled>Agotado</DenkiButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
        <DenkiTag>Pro grade</DenkiTag>
        <DenkiTag tone="panel">12 botones</DenkiTag>
        <DenkiTag tone="red">Nuevo</DenkiTag>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-2xl)", flexWrap: "wrap", alignItems: "center" }}>
        <DenkiBurst size={130}>12,000¥</DenkiBurst>
        <DenkiBurst size={110} tone="red" tilt={6}>
          Nuevo
        </DenkiBurst>
        <DenkiBarcode />
        <DenkiCombo label="Hadouken" sequence={["↓", "↘", "→", "P"]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "var(--ds-space-lg)", alignItems: "start" }}>
        <DenkiFrame caption="Fig. 01 — modo leverless" strike>
          {art("#d13a1e55", "#f2e4c633")}
        </DenkiFrame>
        <DenkiFrame caption="Fig. 02 — entradas válidas">
          {art("#f2e4c62e", "#d13a1e33")}
        </DenkiFrame>
        <DenkiPanel label="Ficha técnica" labelEnd="No. 08">
          <DenkiTitle latin="Specs" kana="スペック" size="card" />
          <p style={{ margin: 0, fontSize: "var(--ds-font-size-sm)", lineHeight: 1.6 }}>
            Panel negro con trama de semitono, papel arena y bermellón. Todo
            impreso, nada brilla.
          </p>
          <DenkiButton variant="outline" className="denki-button--inverse">
            Ver más
          </DenkiButton>
        </DenkiPanel>
      </div>

      <DenkiRail items={["Fight King Pro", "12,000¥", "Leverless", "電気"]} />
    </div>
  ),
};
