import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MesoButton from "./MesoButton/MesoButton";
import MesoPanel from "./MesoPanel/MesoPanel";
import MesoTag from "./MesoTag/MesoTag";
import MesoStat from "./MesoStat/MesoStat";
import MesoSearchBar from "./MesoSearchBar/MesoSearchBar";
import MesoDropdown from "./MesoDropdown/MesoDropdown";
import MesoTicker from "./MesoTicker/MesoTicker";

const meta: Meta = {
  title: "Families/Mesosoicos",
  parameters: { layout: "padded" },
};
export default meta;

export const Botones: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap", alignItems: "center" }}>
      <MesoButton>Iniciar misión</MesoButton>
      <MesoButton variant="outline">Ver registro</MesoButton>
      <MesoButton variant="ghost">Cancelar</MesoButton>
      <MesoButton variant="danger">Purgar</MesoButton>
      <MesoButton size="sm" variant="outline">
        sm
      </MesoButton>
      <MesoButton size="lg">lg</MesoButton>
      <MesoButton disabled>Bloqueado</MesoButton>
    </div>
  ),
};

export const SearchBar: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      {/* eslint-disable-next-line no-alert */}
      <MesoSearchBar onSearch={(q) => alert(`Buscar: ${q}`)} placeholder="Buscar en el registro fósil…" />
    </div>
  ),
};

export const Dropdown: StoryObj = {
  render: () => <DropdownDemo />,
};

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

/** Panel + stats + tags + ticker: la familia completa en composición. */
export const Vitrina: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-lg)", maxWidth: 560 }}>
      <MesoPanel label="Excavación 07" meta="ACTIVA">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-lg)" }}>
          <MesoStat value="12" label="estratos" />
          <MesoStat value="98.2" suffix="%" label="integridad" />
          <MesoStat value="66" suffix="Ma" label="antigüedad" />
        </div>
        <div style={{ display: "flex", gap: "var(--ds-space-xs)", marginTop: "var(--ds-space-lg)", flexWrap: "wrap" }}>
          <MesoTag tone="accent">ámbar</MesoTag>
          <MesoTag>basalto</MesoTag>
          <MesoTag>hueso</MesoTag>
        </div>
      </MesoPanel>
      <MesoTicker items={["React 19", "Kubernetes", "WebGPU", "GitOps", "Ollama", "SCSS", "ArgoCD"]} />
    </div>
  ),
};
