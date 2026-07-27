import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import TebeoButton from "./TebeoButton/TebeoButton";
import TebeoCard from "./TebeoCard/TebeoCard";
import TebeoHeadline from "./TebeoHeadline/TebeoHeadline";
import TebeoMarquee from "./TebeoMarquee/TebeoMarquee";
import TebeoMedia from "./TebeoMedia/TebeoMedia";
import TebeoNavbar from "./TebeoNavbar/TebeoNavbar";
import TebeoPhone from "./TebeoPhone/TebeoPhone";
import TebeoRotator from "./TebeoRotator/TebeoRotator";
import TebeoSticker from "./TebeoSticker/TebeoSticker";
import TebeoTabbar from "./TebeoTabbar/TebeoTabbar";
import TebeoTag from "./TebeoTag/TebeoTag";

const meta: Meta = {
  title: "Families/Tebeo/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

const art = (a: string, b: string) => (
  <div
    style={{
      background: `radial-gradient(ellipse 90% 70% at 65% 25%, ${a} 0%, transparent 65%),
        linear-gradient(165deg, ${b} 0%, #d8d2be 100%)`,
    }}
  />
);

const block: CSSProperties = { display: "grid", gap: "var(--ds-space-sm)" };

export const Overview: StoryObj = {
  render: () => (
    <div
      className="tebeo-scope"
      style={{ minHeight: "100vh", padding: "3rem", display: "grid", gap: "var(--ds-space-2xl)", alignContent: "start" }}
    >
      <div style={block}>
        <TebeoHeadline size="section" as="h2">
          El set completo<em>.</em>
        </TebeoHeadline>
        <TebeoNavbar
          brand="ahroi"
          links={[
            { label: "Proyectos", href: "#", active: true },
            { label: "Stack", href: "#" },
            { label: "Sobre mí", href: "#" },
          ]}
          cta={<TebeoButton tone="sun" size="sm">Contacto</TebeoButton>}
        />
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <TebeoButton>Ver proyectos</TebeoButton>
        <TebeoButton tone="sun">Descargar CV</TebeoButton>
        <TebeoButton variant="outline">Código fuente</TebeoButton>
        <TebeoButton variant="ghost">Cancelar</TebeoButton>
        <TebeoButton size="sm">sm</TebeoButton>
        <TebeoButton size="lg" tone="sun">lg</TebeoButton>
        <TebeoButton disabled>Bloqueado</TebeoButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
        <TebeoTag>Three.js</TebeoTag>
        <TebeoTag tone="ink">GLSL</TebeoTag>
        <TebeoTag tone="sun">WebGPU</TebeoTag>
        <TebeoTag>React</TebeoTag>
      </div>

      <TebeoHeadline size="section" as="h2">
        Textos que{" "}
        <TebeoRotator words={["cambian", "giran", "gritan"]} tone="sun" />
      </TebeoHeadline>

      <TebeoMarquee items={["Marquee infinito", "Se pausa al hover", "Respeta reduced-motion"]} />

      <div style={{ display: "flex", gap: "var(--ds-space-xl)", flexWrap: "wrap", alignItems: "flex-start" }}>
        <TebeoPhone tilt={-4} width={220}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "42px 10px 18px" }}>
            <div style={{ flex: 1, borderRadius: 12, border: "var(--tebeo-line) solid var(--tebeo-ink)", overflow: "hidden" }}>
              {art("#b39dff", "#f0a5c0")}
            </div>
            <TebeoTabbar
              items={[
                { icon: "⌂", label: "Inicio", active: true },
                { icon: "▦", label: "Obras" },
                { icon: "◉", label: "Perfil" },
              ]}
            />
          </div>
        </TebeoPhone>
        <TebeoSticker ring="ver demo en vivo" onClick={() => {}}>
          Play ▶
        </TebeoSticker>
        <div style={{ width: 260 }}>
          <TebeoMedia rail="right" ratio="4 / 5">
            {art("#f0a5c0", "#9fc5e8")}
          </TebeoMedia>
        </div>
        <div style={{ width: 320 }}>
          <TebeoCard
            title="Smartphone App"
            footer={<TebeoButton size="sm" tone="sun">Descargar ↓</TebeoButton>}
          >
            La aplicación MEMES, con este motor como núcleo, ya está disponible
            en App Store y Google Play.
          </TebeoCard>
        </div>
      </div>
    </div>
  ),
};
