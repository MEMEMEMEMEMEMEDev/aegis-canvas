import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Núcleo headless: la apariencia es la nativa del navegador a propósito.
 * Variantes y tamaños solo emiten clases (ds-button--*) que las familias
 * vestirán; el comportamiento (type, disabled, aria-busy) ya es definitivo.
 */
export const Playground: Story = {
  args: { children: "Acción", variant: "solid", size: "md" },
};

export const Estados: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Cargando</Button>
      <Button iconOnly aria-label="Cerrar">
        ✕
      </Button>
    </div>
  ),
};
