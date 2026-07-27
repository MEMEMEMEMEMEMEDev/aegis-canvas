import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoTicker from "./MesoTicker";

const meta: Meta<typeof MesoTicker> = {
  title: "Families/Mesosoicos/MesoTicker",
  component: MesoTicker,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoTicker>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <MesoTicker items={["React 19", "Kubernetes", "WebGPU", "GitOps", "Ollama", "SCSS", "ArgoCD"]} />
    </div>
  ),
};
