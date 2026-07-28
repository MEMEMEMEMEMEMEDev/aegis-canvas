import type { Meta, StoryObj } from "@storybook/react-vite";
import KoiBadge from "./KoiBadge/KoiBadge";
import KoiBrush from "./KoiBrush/KoiBrush";
import KoiButton from "./KoiButton/KoiButton";
import KoiCard from "./KoiCard/KoiCard";
import KoiDate from "./KoiDate/KoiDate";
import KoiHanko from "./KoiHanko/KoiHanko";
import KoiNav from "./KoiNav/KoiNav";
import KoiPill from "./KoiPill/KoiPill";
import KoiPlay from "./KoiPlay/KoiPlay";
import KoiStat from "./KoiStat/KoiStat";
import KoiStream from "./KoiStream/KoiStream";
import KoiSun from "./KoiSun/KoiSun";

const meta: Meta = {
  title: "Families/Koi/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

/** Placeholder de arte — en producción: ilustraciones o canvas 3D. */
const art = (a: string, b: string, c = "#1d2749") => (
  <div
    style={{
      background: `radial-gradient(ellipse 80% 60% at 70% 20%, ${a} 0%, transparent 60%),
        radial-gradient(ellipse 70% 70% at 25% 80%, ${b} 0%, transparent 60%),
        linear-gradient(170deg, ${c} 0%, #0b1023 100%)`,
    }}
  />
);

export const Overview: StoryObj = {
  render: () => (
    <div
      className="koi-scope koi-scene"
      style={{ minHeight: "100vh", padding: "3rem", display: "grid", gap: "var(--ds-space-2xl)", alignContent: "start" }}
    >
      <KoiNav
        brand="S-"
        links={[
          { label: "Intro", href: "#", icon: "✳", active: true },
          { label: "Proyectos", href: "#", icon: "▤" },
          { label: "Sobre mí", href: "#", icon: "✦" },
        ]}
        right={
          <>
            <KoiButton variant="ghost" size="sm" aria-label="Avisos">🔔</KoiButton>
            <KoiButton tone="sun" size="sm">Contacto</KoiButton>
          </>
        }
      />

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
        <KoiButton>Vidrio</KoiButton>
        <KoiButton tone="sun">Hinomaru</KoiButton>
        <KoiButton tone="gold">Linterna</KoiButton>
        <KoiButton variant="outline">Outline</KoiButton>
        <KoiButton variant="ghost">Ghost</KoiButton>
        <KoiButton size="lg" tone="sun">lg</KoiButton>
        <KoiButton disabled>Cerrado</KoiButton>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
        <KoiPill icon="🕐">5:00 pm – 7:00 pm</KoiPill>
        <KoiPill icon="📍" tone="snow">Nukikiku Ona St.</KoiPill>
        <KoiPill tone="sun">En vivo</KoiPill>
        <KoiPill tone="gold">60 fps</KoiPill>
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-2xl)", flexWrap: "wrap", alignItems: "center" }}>
        <KoiSun size={150} />
        <KoiBadge eyebrow="📍 Japan" title="FES-TIVAL" sub="Of the Year" />
        <KoiPlay label="intro" onClick={() => {}} />
        <KoiBrush size="hero">Kanda</KoiBrush>
      </div>

      <KoiStat
        items={[
          { label: "users", value: "15.6k" },
          { label: "gen/4hrs", value: "35.6k" },
          { label: "artists", value: "1.4k" },
        ]}
      />

      <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ width: 380 }}>
          <KoiCard title="Main Event" pill="5:00 pm – 7:00 pm" visual={art("#f04a2f55", "#f6b83c44")} href="#" />
        </div>
        <div style={{ width: 180 }}>
          <KoiCard title="Quiver Dance" orientation="tall" pill="5:00 pm" visual={art("#6b4df066", "#2f6fd855")} href="#" />
        </div>
        <KoiDate lines={["Tokyo's", "Kanda", "Matsuri"]} over="Oct, 2024" big="02" />
      </div>

      <div style={{ display: "flex", gap: "var(--ds-space-2xl)", flexWrap: "wrap", alignItems: "center" }}>
        <KoiHanko label="sello koi" />
        <KoiHanko char="祭" tone="gold" size={60} tilt={5} />
        <div style={{ position: "relative", width: 260, height: 190, borderRadius: "var(--koi-radius)", overflow: "hidden", border: "1px solid var(--koi-line)" }}>
          <KoiStream count={6} />
        </div>
        <div style={{ position: "relative", width: 260, height: 190, borderRadius: "var(--koi-radius)", overflow: "hidden", border: "1px solid var(--koi-line)" }}>
          <KoiStream variant="petals" count={7} />
        </div>
      </div>
    </div>
  ),
};
