import Card from "./Card";
import Button from "../Button/Button";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    elevation: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
    padding: {
      control: "select",
      options: ["md", "lg", "xl", "2xl"],
    },
  },
  args: { elevation: "md", padding: "xl" },
};

export const Default = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: "22rem" }}>
      <h3 style={{ marginBottom: "var(--ds-space-xs)" }}>AEGIS_SYSTEM</h3>
      <p style={{ color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-lg)" }}>
        Infraestructura soberana sobre K3s + GitOps. Todo el estilo viene del
        contrato de tema, así que la tarjeta responde a claro/oscuro sola.
      </p>
      <Button size="sm">Ver proyecto</Button>
    </Card>
  ),
};

export const Elevations = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-space-lg)", flexWrap: "wrap" }}>
      {["none", "sm", "md", "lg"].map((e) => (
        <Card key={e} elevation={e} style={{ width: "10rem" }}>
          <strong>e-{e}</strong>
        </Card>
      ))}
    </div>
  ),
};
