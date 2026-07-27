import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoStat from "./MesoStat";

const meta: Meta<typeof MesoStat> = {
  title: "Families/Mesosoicos/MesoStat",
  component: MesoStat,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoStat>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-lg)", maxWidth: 420 }}>
      <MesoStat value="12" label="estratos" />
      <MesoStat value="98.2" suffix="%" label="integridad" />
      <MesoStat value="66" suffix="Ma" label="antigüedad" />
    </div>
  ),
};
