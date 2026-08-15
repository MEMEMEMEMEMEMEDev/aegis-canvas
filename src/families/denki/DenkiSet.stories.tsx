import type { Meta, StoryObj } from "@storybook/react-vite";
import DenkiBarcode from "./DenkiBarcode/DenkiBarcode";
import DenkiBurst from "./DenkiBurst/DenkiBurst";
import DenkiButton from "./DenkiButton/DenkiButton";
import DenkiCombo from "./DenkiCombo/DenkiCombo";
import DenkiFlecha from "./DenkiFlecha/DenkiFlecha";
import DenkiPie from "./DenkiPie/DenkiPie";
import DenkiPlaca from "./DenkiPlaca/DenkiPlaca";
import DenkiSpark from "./DenkiSpark/DenkiSpark";
import DenkiStick from "./DenkiStick/DenkiStick";
import DenkiMeter from "./DenkiMeter/DenkiMeter";
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
        <DenkiMeter label="Señal" value={2} total={3} />
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

// =============================================================================
// La lámina de producto: las cinco piezas que faltaban para que la familia
// pudiera anunciar un APARATO y no solo componer un titular.
//
// Se muestra en modo atracción — los botones encendiéndose en secuencia, la
// chispa latiendo, la tira de combo corriendo — que es CSS puro dentro de
// cada pieza: sin estado, sin temporizadores y sin un solo listener.
// =============================================================================

const BOTONES = [
  { id: "a", marca: "1", label: "Primera pregunta" },
  { id: "b", marca: "2", label: "Segunda pregunta" },
  { id: "c", marca: "3", label: "Tercera pregunta" },
];

export const Lamina: StoryObj = {
  render: () => (
    <div
      className="denki-scope"
      style={{ minHeight: "100vh", padding: "clamp(1rem, 4vw, 2.5rem)", display: "grid", gap: "1.2rem", alignContent: "start" }}
    >
      <DenkiTitle latin="Contacto" kana="ご相談" sub="Unidad de contacto 電-03" crown as="h2" />

      <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))" }}>
        <DenkiPanel label="Sin formularios">
          <p style={{ margin: 0, fontSize: "0.72rem" }}>Se responde eligiendo, no rellenando.</p>
        </DenkiPanel>
        <DenkiPanel label="Una sola pantalla">
          <p style={{ margin: 0, fontSize: "0.72rem" }}>Tres pasos y el mensaje está.</p>
          <DenkiFlecha dirs={["der", "der", "der"]} attract />
        </DenkiPanel>
      </div>

      <DenkiPlaca
        codigo="REF. 電-03 · UNIDAD DE CONTACTO"
        pie="Panel de tres botones · dibujado con cajas, cero imágenes"
        esquina={
          <DenkiBurst size={104} tone="red" tilt={-10}>
            3 PREGUNTAS
          </DenkiBurst>
        }
      >
        <div style={{ position: "relative", width: "min(32rem, 100%)" }}>
          <DenkiStick
            botones={BOTONES}
            attract
            sobre="panel"
            placa="AAROI·DEV — CONTACT UNIT 電-03"
            kana="連絡"
            label="Ilustración: el panel de contacto, con un botón por pregunta"
          />
          <span style={{ position: "absolute", top: "-14%", right: "16%" }}>
            <DenkiSpark size={92} pulse />
          </span>
        </div>
      </DenkiPlaca>

      <DenkiPie marca="AAROI·DEV" sub="デザインラボ · 直接連絡" sello="電" />
    </div>
  ),
};
