import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CintaButton from "./CintaButton/CintaButton";
import CintaDisplay from "./CintaDisplay/CintaDisplay";
import CintaLabel from "./CintaLabel/CintaLabel";
import CintaEq from "./CintaEq/CintaEq";
import CintaMarks from "./CintaMarks/CintaMarks";
import CintaPanel from "./CintaPanel/CintaPanel";
import CintaScale from "./CintaScale/CintaScale";
import CintaTag from "./CintaTag/CintaTag";
import CintaTape from "./CintaTape/CintaTape";
import CintaTransport from "./CintaTransport/CintaTransport";
import type { CintaTransportState } from "./CintaTransport/CintaTransport";

const meta: Meta = {
  title: "Families/Cinta/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

function TransportDemo() {
  const [estado, setEstado] = useState<CintaTransportState>("play");
  return (
    <div style={{ display: "flex", gap: "var(--ds-space-xl)", flexWrap: "wrap", alignItems: "center" }}>
      <CintaTransport state={estado} onChange={setEstado} />
      <div style={{ width: 220 }}>
        <CintaTape
          title="Demo mixtape"
          meta="side test · 2026"
          color="coral"
          side="B"
          playing={estado === "play"}
        />
      </div>
      <CintaDisplay
        title="Demo mixtape"
        progress={64}
        elapsed="2:11"
        total="3:24"
        playing={estado === "play"}
      />
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => (
    <div
      className="cinta-scope"
      style={{
        minHeight: "100vh",
        padding: "3rem",
        display: "grid",
        gap: "var(--ds-space-2xl)",
        alignContent: "start",
      }}
    >
      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <CintaButton>Rec</CintaButton>
        <CintaButton tone="amber">Play</CintaButton>
        <CintaButton tone="coral">Eject</CintaButton>
        <CintaButton tone="sky">Dolby</CintaButton>
        <CintaButton variant="outline">A / B</CintaButton>
        <CintaButton variant="ghost">Manual</CintaButton>
        <CintaButton disabled>Sin cinta</CintaButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap", alignItems: "center" }}>
        <CintaTag>Stereo</CintaTag>
        <CintaTag tone="ink">OP-Z System</CintaTag>
        <CintaTag tone="amber">Series 2 F/W</CintaTag>
        <CintaTag tone="sky">Unit 001</CintaTag>
        <CintaTag tone="hazard">Zero Audio Sys</CintaTag>
        <CintaMarks />
        <CintaMarks direction="down" tone="amber" count={2} />
        <CintaEq label="ecualizador" />
        <CintaEq tone="coral" playing={false} bars={8} />
      </div>

      <TransportDemo />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "var(--ds-space-lg)", alignItems: "start" }}>
        <CintaPanel label="Frequency" labelEnd="FM">
          <CintaScale
            marks={["88", "92", "96", "100", "104"]}
            value={62}
            label="sintonía"
          />
          <CintaScale marks={["TR 01", "TR 02", "TR 03"]} value={18} label="pista" />
        </CintaPanel>
        <CintaLabel
          big="2"
          rows={[
            ["Speaker", "3×3 full range"],
            ["Woofer", "1×6.2"],
            ["Amp", "Class D"],
            ["Freq response", "32 Hz – 20 kHz"],
          ]}
        />
        <div style={{ display: "grid", gap: "var(--ds-space-md)" }}>
          <CintaTape title="Zerostation" meta="cassette system" color="amber" side="B" playing />
          <CintaTape title="Blue tape" meta="unidad A" color="sky" selected />
        </div>
      </div>
    </div>
  ),
};
