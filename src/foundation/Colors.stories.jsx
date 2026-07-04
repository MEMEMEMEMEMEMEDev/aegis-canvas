export default {
  title: "Foundation/Colors",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

const THEME_TOKENS = [
  "surface-base",
  "surface-raised",
  "surface-overlay",
  "surface-sunken",
  "text",
  "text-muted",
  "text-subtle",
  "border",
  "border-strong",
  "accent",
  "accent-hover",
  "accent-subtle",
  "success",
  "warning",
  "danger",
  "info",
];

const Swatch = ({ name }) => (
  <div
    style={{
      border: "1px solid var(--ds-border-subtle)",
      borderRadius: "var(--ds-radius-lg)",
      overflow: "hidden",
      background: "var(--ds-surface-raised)",
    }}
  >
    <div style={{ height: "4.5rem", background: `var(--ds-${name})` }} />
    <div
      style={{
        padding: "var(--ds-space-sm) var(--ds-space-md)",
        fontSize: "var(--ds-font-size-xs)",
      }}
    >
      <div style={{ fontWeight: "var(--ds-font-weight-semibold)" }}>{name}</div>
      <div style={{ fontFamily: "var(--ds-font-mono)", color: "var(--ds-text-muted)" }}>
        --ds-{name}
      </div>
    </div>
  </div>
);

export const ThemeContract = {
  render: () => (
    <div style={{ padding: "var(--ds-space-2xl)" }}>
      <p style={{ color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-lg)" }}>
        Cambia el tema en la toolbar (☀/☾/⚙). Estos son los tokens semánticos
        que usan los componentes — light y dark comparten las mismas claves.
      </p>
      <div
        style={{
          display: "grid",
          gap: "var(--ds-space-md)",
          gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
        }}
      >
        {THEME_TOKENS.map((t) => (
          <Swatch key={t} name={t} />
        ))}
      </div>
    </div>
  ),
};
