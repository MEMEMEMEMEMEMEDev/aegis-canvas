import { useState } from "react";
import NumberInput from "./NumberInput";
import Field from "../Field/Field";

export default {
  title: "Components/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [n, setN] = useState(1);
    return (
      <div style={{ maxWidth: 200 }}>
        <NumberInput value={n} onChange={setN} min={0} max={99} />
      </div>
    );
  },
};

export const DecimalStep = {
  render: () => {
    const [n, setN] = useState(2.5);
    return (
      <div style={{ maxWidth: 220 }}>
        <Field label="Cantidad (kg)" hint="Paso de 0.5, entre 0 y 10">
          <NumberInput value={n} onChange={setN} min={0} max={10} step={0.5} />
        </Field>
      </div>
    );
  },
};

export const WithValidation = {
  render: () => {
    const [n, setN] = useState("");
    return (
      <div style={{ maxWidth: 220 }}>
        <Field
          label="Unidades"
          required
          error={n === "" ? "Indica cuántas unidades" : null}
        >
          <NumberInput value={n} onChange={setN} min={1} max={50} placeholder="0" />
        </Field>
      </div>
    );
  },
};

export const Sizes = {
  render: () => {
    const [n, setN] = useState(5);
    return (
      <div style={{ display: "grid", gap: "var(--ds-space-md)", maxWidth: 220 }}>
        <NumberInput size="sm" value={n} onChange={setN} />
        <NumberInput size="md" value={n} onChange={setN} />
        <NumberInput size="lg" value={n} onChange={setN} />
      </div>
    );
  },
};
