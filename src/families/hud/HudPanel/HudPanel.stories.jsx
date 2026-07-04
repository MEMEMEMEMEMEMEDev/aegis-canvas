import HudPanel from "./HudPanel";
import MetaTag from "../MetaTag/MetaTag";

export default {
  title: "Components/HudPanel",
  component: HudPanel,
  tags: ["autodocs"],
  parameters: { layout: "centered", backgrounds: { default: "dark" } },
};

export const Default = {
  render: () => (
    <HudPanel label="COLOR_MATCHING" index="01" style={{ width: 320 }}>
      <p style={{ color: "var(--ds-text-muted)", margin: 0 }}>
        Un panel con marco de esquinas estilo HUD, barra de etiqueta e índice.
        Todo sobre el contrato de tema — cambia con light/dark/ether.
      </p>
    </HudPanel>
  ),
};

export const WithTags = {
  render: () => (
    <HudPanel label="SYS.PALETTE" index="08" pad="md" style={{ width: 300 }}>
      <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
        <MetaTag swatch="#7BA7AF">#7BA7AF</MetaTag>
        <MetaTag swatch="#E2E4D2">#E2E4D2</MetaTag>
        <MetaTag swatch="#455957">#455957</MetaTag>
      </div>
    </HudPanel>
  ),
};
