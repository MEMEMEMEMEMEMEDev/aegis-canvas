import { useState } from "react";
import Field from "./Field";
import Input from "../Input/Input";

export default {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
};

export const WithHint = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <div style={{ maxWidth: 360 }}>
        <Field label="Nombre de usuario" hint="Visible para otros usuarios">
          <Input value={v} onChange={(e) => setV(e.target.value)} placeholder="ahroi" />
        </Field>
      </div>
    );
  },
};

export const WithError = {
  render: () => {
    const [v, setV] = useState("a");
    return (
      <div style={{ maxWidth: 360 }}>
        <Field
          label="Nombre de usuario"
          required
          hint="Mínimo 3 caracteres"
          error={v.length > 0 && v.length < 3 ? "Mínimo 3 caracteres" : null}
        >
          <Input value={v} onChange={(e) => setV(e.target.value)} />
        </Field>
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Field label="Código de invitación" disabled hint="Se asigna automáticamente">
        <Input value="AEGIS-2026" onChange={() => {}} />
      </Field>
    </div>
  ),
};
