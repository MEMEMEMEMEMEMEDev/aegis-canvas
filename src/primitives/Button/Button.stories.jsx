import { useState } from "react";
import Button from "./Button";
import { Plus, ChevronDown, Cross } from "../../utils/icons";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "danger"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Desplegar",
    variant: "solid",
    size: "md",
    fullWidth: false,
    disabled: false,
    loading: false,
  },
};

export const Solid = {};
export const Outline = { args: { variant: "outline" } };
export const Ghost = { args: { variant: "ghost" } };
export const Danger = { args: { variant: "danger", children: "Eliminar" } };

export const AllVariants = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap" }}>
      <Button {...args} variant="solid">Solid</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--ds-space-md)", alignItems: "center" }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap" }}>
      <Button {...args} leftIcon={<Plus />}>Crear</Button>
      <Button {...args} variant="outline" rightIcon={<ChevronDown />}>
        Opciones
      </Button>
      <Button {...args} iconOnly aria-label="Cerrar" variant="ghost">
        <Cross />
      </Button>
    </div>
  ),
};

export const Loading = {
  render: (args) => {
    const [busy, setBusy] = useState(false);
    return (
      <div style={{ display: "flex", gap: "var(--ds-space-md)" }}>
        <Button
          {...args}
          loading={busy}
          onClick={() => {
            setBusy(true);
            setTimeout(() => setBusy(false), 2000);
          }}
        >
          Guardar cambios
        </Button>
        <Button {...args} variant="outline" loading>
          Cargando
        </Button>
      </div>
    );
  },
};
