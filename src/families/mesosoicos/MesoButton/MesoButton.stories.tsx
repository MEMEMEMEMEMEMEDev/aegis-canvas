import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoButton from "./MesoButton";

const meta: Meta<typeof MesoButton> = {
  title: "Families/Mesosoicos/MesoButton",
  component: MesoButton,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoButton>;

export const Variantes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
      <MesoButton>Iniciar misión</MesoButton>
      <MesoButton variant="outline">Ver registro</MesoButton>
      <MesoButton variant="ghost">Cancelar</MesoButton>
      <MesoButton variant="danger">Purgar</MesoButton>
      <MesoButton size="sm" variant="outline">
        sm
      </MesoButton>
      <MesoButton size="lg">lg</MesoButton>
      <MesoButton disabled>Bloqueado</MesoButton>
    </div>
  ),
};
