import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

/**
 * Núcleo headless: la apariencia es la nativa del navegador a propósito.
 * Variantes y tamaños solo emiten clases (ds-button--*) que las familias
 * vestirán; el comportamiento (type, disabled, aria-busy) ya es definitivo.
 */
export const Playground = {
  args: { children: "Acción", variant: "solid", size: "md" },
};

export const Estados = {
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
