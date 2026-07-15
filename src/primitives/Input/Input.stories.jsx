import { useState } from "react";
import Input from "./Input";
import Field from "../Field/Field";
import { Search } from "../../utils/icons";

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
  },
};

const Controlled = (props) => {
  const [v, setV] = useState(props.defaultValue ?? "");
  return <Input {...props} value={v} onChange={(e) => setV(e.target.value)} />;
};

export const Playground = {
  render: (args) => <Controlled {...args} placeholder="Escribe algo…" />,
};

export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 360 }}>
      <Controlled size="sm" placeholder="Small" />
      <Controlled size="md" placeholder="Medium" />
      <Controlled size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithAffixes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 360 }}>
      <Controlled prefix={<Search />} placeholder="Buscar…" clearable />
      <Controlled prefix="$" suffix="CLP" placeholder="0" inputMode="numeric" />
      <Controlled suffix="kg" placeholder="Peso" />
    </div>
  ),
};

export const Password = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Field label="Contraseña" hint="Mínimo 8 caracteres">
        <Controlled type="password" defaultValue="hunter2secret" />
      </Field>
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 360 }}>
      <Controlled placeholder="Normal" />
      <Controlled placeholder="Inválido" invalid defaultValue="dato malo" />
      <Controlled placeholder="Deshabilitado" disabled />
    </div>
  ),
};

export const InsideField = {
  render: () => {
    const [email, setEmail] = useState("no-es-un-correo");
    const bad = email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    return (
      <div style={{ maxWidth: 360 }}>
        <Field
          label="Correo electrónico"
          required
          hint="Usamos tu correo solo para avisarte"
          error={bad ? "Correo electrónico inválido" : null}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            clearable
          />
        </Field>
      </div>
    );
  },
};
