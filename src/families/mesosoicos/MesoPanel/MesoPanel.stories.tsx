import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoPanel from "./MesoPanel";
import MesoStat from "../MesoStat/MesoStat";
import MesoTag from "../MesoTag/MesoTag";

const meta: Meta<typeof MesoPanel> = {
  title: "Families/Mesosoicos/MesoPanel",
  component: MesoPanel,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoPanel>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <MesoPanel label="Excavación 07" meta="ACTIVA">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-lg)" }}>
          <MesoStat value="12" label="estratos" />
          <MesoStat value="98.2" suffix="%" label="integridad" />
          <MesoStat value="66" suffix="Ma" label="antigüedad" />
        </div>
        <div style={{ display: "flex", gap: "var(--ds-space-xs)", marginTop: "var(--ds-space-lg)", flexWrap: "wrap" }}>
          <MesoTag tone="accent">ámbar</MesoTag>
          <MesoTag>basalto</MesoTag>
          <MesoTag>hueso</MesoTag>
        </div>
      </MesoPanel>
    </div>
  ),
};
