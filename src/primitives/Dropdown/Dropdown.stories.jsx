import { useState } from "react";
import Dropdown from "./Dropdown";
import Field from "../Field/Field";
import { Search, Check, Plus, Eye } from "../../utils/icons";

const SIMPLE = [
  { value: "draft", label: "Borrador" },
  { value: "review", label: "En revisión" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado", disabled: true },
];

const RICH = [
  {
    value: "public",
    label: "Público",
    description: "Cualquiera puede verlo",
    icon: <Eye />,
  },
  {
    value: "team",
    label: "Equipo",
    description: "Solo miembros del proyecto",
    icon: <Check />,
  },
  {
    value: "private",
    label: "Privado",
    description: "Solo tú",
    icon: <Plus />,
  },
];

const COUNTRIES = [
  "Chile",
  "Argentina",
  "Perú",
  "Uruguay",
  "Bolivia",
  "Colombia",
  "Ecuador",
  "México",
  "España",
  "Portugal",
  "Brasil",
  "Paraguay",
].map((c) => ({ value: c.toLowerCase(), label: c }));

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [v, setV] = useState();
    return (
      <div style={{ maxWidth: 320, minHeight: 260 }}>
        <Dropdown options={SIMPLE} value={v} onChange={setV} />
      </div>
    );
  },
};

export const RichOptions = {
  render: () => {
    const [v, setV] = useState("team");
    return (
      <div style={{ maxWidth: 340, minHeight: 300 }}>
        <Field label="Visibilidad" hint="Con iconos y descripciones">
          <Dropdown options={RICH} value={v} onChange={setV} />
        </Field>
      </div>
    );
  },
};

export const Searchable = {
  render: () => {
    const [v, setV] = useState();
    return (
      <div style={{ maxWidth: 320, minHeight: 380 }}>
        <Field label="País" hint="Escribe para filtrar">
          <Dropdown
            options={COUNTRIES}
            value={v}
            onChange={setV}
            searchable
            placeholder="Elige un país…"
          />
        </Field>
      </div>
    );
  },
};

export const Invalid = {
  render: () => {
    const [v, setV] = useState();
    return (
      <div style={{ maxWidth: 320, minHeight: 260 }}>
        <Field label="Estado" required error={!v ? "Selecciona un estado" : null}>
          <Dropdown options={SIMPLE} value={v} onChange={setV} />
        </Field>
      </div>
    );
  },
};

export const Sizes = {
  render: () => {
    const [v, setV] = useState("review");
    return (
      <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 320, minHeight: 300 }}>
        <Dropdown size="sm" options={SIMPLE} value={v} onChange={setV} />
        <Dropdown size="md" options={SIMPLE} value={v} onChange={setV} />
        <Dropdown size="lg" options={SIMPLE} value={v} onChange={setV} />
      </div>
    );
  },
};
