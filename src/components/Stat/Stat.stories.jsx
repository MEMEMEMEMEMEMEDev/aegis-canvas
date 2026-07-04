import Stat from "./Stat";

export default {
  title: "Components/Stat",
  component: Stat,
  parameters: { globals: { theme: "fono" }, layout: "centered" },
};

export const Default = {
  args: { label: "Water", value: "67", unit: "°C" },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
      <Stat size="sm" label="Pressure" value="1.7" unit="bar" />
      <Stat size="md" label="Capacity" value="320" unit="kWh" />
      <Stat size="lg" label="Total yield" value="190" unit="kWh" />
    </div>
  ),
};
