import { useState } from "react";
import Textarea from "./Textarea";
import Field from "../Field/Field";

export default {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

const Controlled = (props) => {
  const [v, setV] = useState(props.defaultValue ?? "");
  return <Textarea {...props} value={v} onChange={(e) => setV(e.target.value)} />;
};

export const Playground = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Controlled placeholder="Cuéntanos sobre tu proyecto…" />
    </div>
  ),
};

export const AutoResize = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Field label="Mensaje" hint="Crece con el contenido (máx. 8 líneas)">
        <Controlled autoResize maxRows={8} rows={2} placeholder="Escribe varias líneas…" />
      </Field>
    </div>
  ),
};

export const WithValidation = {
  render: () => {
    const [v, setV] = useState("");
    const remaining = 140 - v.length;
    return (
      <div style={{ maxWidth: 420 }}>
        <Field
          label="Bio"
          hint={`${remaining} caracteres restantes`}
          error={remaining < 0 ? `Te pasaste por ${-remaining} caracteres` : null}
        >
          <Textarea
            value={v}
            onChange={(e) => setV(e.target.value)}
            placeholder="Máximo 140 caracteres"
          />
        </Field>
      </div>
    );
  },
};
