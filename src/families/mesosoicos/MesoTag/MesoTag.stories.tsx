import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoTag from "./MesoTag";

const meta: Meta<typeof MesoTag> = {
  title: "Families/Mesosoicos/MesoTag",
  component: MesoTag,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoTag>;

export const Tonos: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-space-xs)", flexWrap: "wrap" }}>
      <MesoTag tone="accent">ámbar</MesoTag>
      <MesoTag>basalto</MesoTag>
      <MesoTag>hueso</MesoTag>
    </div>
  ),
};
