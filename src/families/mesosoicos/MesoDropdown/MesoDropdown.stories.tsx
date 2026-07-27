import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoDropdown from "./MesoDropdown";

const meta: Meta<typeof MesoDropdown> = {
  title: "Families/Mesosoicos/MesoDropdown",
  component: MesoDropdown,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MesoDropdown>;

function DropdownDemo() {
  const [era, setEra] = useState<string | undefined>();
  return (
    <div style={{ minHeight: 260, maxWidth: 280 }}>
      <MesoDropdown
        ariaLabel="Era geológica"
        placeholder="Elegir era…"
        value={era}
        onChange={setEra}
        options={[
          { value: "triasico", label: "Triásico", description: "251–201 Ma" },
          { value: "jurasico", label: "Jurásico", description: "201–145 Ma" },
          { value: "cretacico", label: "Cretácico", description: "145–66 Ma" },
          { value: "holoceno", label: "Holoceno", description: "Aún no disponible", disabled: true },
        ]}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DropdownDemo />,
};
