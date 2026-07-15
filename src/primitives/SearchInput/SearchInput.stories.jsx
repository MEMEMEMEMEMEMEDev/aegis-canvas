import { useState } from "react";
import SearchInput from "./SearchInput";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [q, setQ] = useState("");
    const [last, setLast] = useState(null);
    return (
      <div style={{ maxWidth: 360, display: "grid", gap: "var(--ds-space-sm)" }}>
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onSearch={setLast}
        />
        {last !== null && (
          <p style={{ margin: 0, color: "var(--ds-text-muted)", fontSize: "var(--ds-font-size-sm)" }}>
            Buscaste: <strong>{last}</strong>
          </p>
        )}
      </div>
    );
  },
};
