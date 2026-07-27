import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoSearchBar from "./MesoSearchBar";

const meta: Meta<typeof MesoSearchBar> = {
  title: "Families/Mesosoicos/MesoSearchBar",
  component: MesoSearchBar,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoSearchBar>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      {/* eslint-disable-next-line no-alert */}
      <MesoSearchBar onSearch={(q) => alert(`Buscar: ${q}`)} placeholder="Buscar en el registro fósil…" />
    </div>
  ),
};
