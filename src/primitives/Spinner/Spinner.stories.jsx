import Spinner from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
};

export const Playground = {
  args: { size: "md" },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const InheritsColor = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        color: "var(--ds-accent)",
      }}
    >
      <Spinner size="md" />
      <span style={{ color: "var(--ds-danger)" }}>
        <Spinner size="md" />
      </span>
      <span style={{ color: "var(--ds-success)" }}>
        <Spinner size="md" />
      </span>
    </div>
  ),
};
