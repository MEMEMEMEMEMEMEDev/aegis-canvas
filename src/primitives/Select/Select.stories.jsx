import { useState } from "react";
import Select from "./Select";
import Field from "../Field/Field";

const OPTIONS = [
  { value: "cl", label: "Chile" },
  { value: "ar", label: "Argentina" },
  { value: "pe", label: "Perú" },
  { value: "uy", label: "Uruguay" },
  { value: "bo", label: "Bolivia", disabled: true },
];

export default {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <div style={{ maxWidth: 320 }}>
        <Select
          options={OPTIONS}
          placeholder="Elige un país…"
          value={v}
          onChange={(e) => setV(e.target.value)}
        />
      </div>
    );
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 320 }}>
      <Select size="sm" options={OPTIONS} placeholder="Small" />
      <Select size="md" options={OPTIONS} placeholder="Medium" />
      <Select size="lg" options={OPTIONS} placeholder="Large" />
    </div>
  ),
};

export const WithGroups = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select defaultValue="react">
        <optgroup label="Frontend">
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </optgroup>
        <optgroup label="Backend">
          <option value="node">Node</option>
          <option value="go">Go</option>
        </optgroup>
      </Select>
    </div>
  ),
};

export const InsideField = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <div style={{ maxWidth: 320 }}>
        <Field
          label="País"
          required
          error={v === "" ? "Selecciona un país" : null}
        >
          <Select
            options={OPTIONS}
            placeholder="Elige…"
            value={v}
            onChange={(e) => setV(e.target.value)}
          />
        </Field>
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select options={OPTIONS} placeholder="No disponible" disabled />
    </div>
  ),
};
