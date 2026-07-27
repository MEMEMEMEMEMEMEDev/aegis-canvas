# @ahroi/foundation — conventions for building with this DS

## Theme & setup (no provider needed)
- **Dark-first brand.** The dark theme lives at `:root` — linking `styles.css` is ALL the setup: `body` automatically gets `background: var(--ds-surface-base)` and `color: var(--ds-text)`. There is no ThemeProvider and no context to wrap.
- Light theme only when explicitly asked: set `data-theme="light"` on `<html>`.
- `PreviewSurface` (a bundle export) is a preview-card shim — a plain `div` painting `var(--ds-surface-base)`. **Do not use it in designs**; the page background already comes from `styles.css`. Ignore any generic "wrap the tree in the provider" note.

## Two layers: headless core vs the MESOSOICOS family
- **Core primitives are headless by design** (`Button`, `Field`, `Input`, `Portal`): correct semantics/ARIA/wiring, browser-native look. Use them for behavior, or when composing inside family skins. `Field` auto-wires `id`/`aria-invalid`/`aria-describedby` to the control inside it (error replaces hint, `role="alert"`).
- **For visible UI, prefer the MESOSOICOS family** — the styled brand skin (geological strata + videogame UI: basalt/bone/amber, diagonal cuts, mono meta-labels): `MesoButton` (`variant`: solid | outline | ghost | danger; `size`: sm | md | lg), `MesoPanel` (`label`, `meta`), `MesoTag` (`tone`: accent), `MesoStat` (`value`, `suffix`, `label`), `MesoSearchBar` (`onSearch`, `placeholder`), `MesoDropdown` (`options`, `value`, `onChange`, `ariaLabel`), `MesoTicker` (`items`).
- Headless hooks are exported too (`useDisclosure`, `useDismiss`, `useListNavigation`, `useControllableState`) for custom widgets, plus `cx` (classnames util) and `getOverlayRoot`.

## Styling idiom: CSS variables only — no utility classes
There is **no Tailwind/utility-class vocabulary** — never invent classes like `bg-*`/`p-*`. Style your own layout glue with inline styles (or a `<style>` block) that consume the `--ds-*` contract:
- Surfaces: `--ds-surface-base` (page), `--ds-surface-raised`, `--ds-surface-sunken`, `--ds-surface-overlay`; borders `--ds-border`, `--ds-border-subtle`, `--ds-border-strong`.
- Text: `--ds-text`, `--ds-text-muted`, `--ds-text-subtle`, `--ds-text-inverse`; accent: `--ds-accent` (amber), `--ds-accent-hover`, `--ds-accent-subtle`, `--ds-accent-contrast`; status: `--ds-danger`, `--ds-success`, `--ds-warning`, `--ds-info`; focus: `--ds-focus-ring`.
- Space: `--ds-space-2xs|xs|sm|md|lg|xl|2xl|3xl`; radius: `--ds-radius-sm|md|lg|xl`; shadows: `--ds-shadow-md|lg`.
- Type: `--ds-font-sans|display|mono` (system stacks — meta-labels/buttons use mono), `--ds-font-size-xs…4xl`, `--ds-font-weight-regular…black`, `--ds-leading-tight|snug|normal`.

## Where the truth lives
Read `styles.css` → `_ds_bundle.css` (all tokens + compiled component styles) before styling anything custom; per-component API and examples in `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`.

## Idiomatic example (verified render)
```jsx
const { MesoPanel, MesoStat, MesoTag, MesoButton } = window.AhroiFoundation;

<div style={{ display: "grid", gap: "var(--ds-space-lg)", maxWidth: 560 }}>
  <MesoPanel label="Excavación 07" meta="ACTIVA">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-lg)" }}>
      <MesoStat value="12" label="estratos" />
      <MesoStat value="98.2" suffix="%" label="integridad" />
      <MesoStat value="66" suffix="Ma" label="antigüedad" />
    </div>
    <div style={{ display: "flex", gap: "var(--ds-space-xs)", marginTop: "var(--ds-space-lg)" }}>
      <MesoTag tone="accent">ámbar</MesoTag>
      <MesoTag>basalto</MesoTag>
    </div>
  </MesoPanel>
  <MesoButton>Iniciar misión</MesoButton>
</div>
```
