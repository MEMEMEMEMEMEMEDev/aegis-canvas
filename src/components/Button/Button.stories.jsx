import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Desplegar",
    variant: "solid",
    size: "md",
    fullWidth: false,
    disabled: false,
  },
};

export const Solid = {};
export const Outline = { args: { variant: "outline" } };
export const Ghost = { args: { variant: "ghost" } };

export const AllVariants = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap" }}>
      <Button {...args} variant="solid">Solid</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
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
