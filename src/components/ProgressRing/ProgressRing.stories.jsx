import ProgressRing from "./ProgressRing";

export default {
  title: "Components/ProgressRing",
  component: ProgressRing,
  parameters: { globals: { theme: "fono" }, layout: "centered" },
};

export const Default = {
  args: { value: 68, size: 56, stroke: 3 },
};

export const Scale = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <ProgressRing value={25} size={48} />
      <ProgressRing value={68} size={64} />
      <ProgressRing value={92} size={80} stroke={4} />
    </div>
  ),
};
