import { useState } from "react";
import Radio, { RadioGroup } from "./Radio";
import Field from "../Field/Field";

export default {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [plan, setPlan] = useState("pro");
    return (
      <RadioGroup label="Plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
    );
  },
};

export const WithDescriptions = {
  render: () => {
    const [v, setV] = useState("standard");
    return (
      <RadioGroup label="Envío" value={v} onChange={setV}>
        <Radio
          value="standard"
          label="Envío estándar"
          description="3–5 días hábiles · gratis"
        />
        <Radio
          value="express"
          label="Envío express"
          description="24–48 horas · $4.990"
        />
        <Radio
          value="pickup"
          label="Retiro en tienda"
          description="Hoy mismo · gratis"
        />
      </RadioGroup>
    );
  },
};

export const Horizontal = {
  render: () => {
    const [v, setV] = useState("md");
    return (
      <RadioGroup label="Talla" orientation="horizontal" value={v} onChange={setV}>
        <Radio value="sm" label="S" />
        <Radio value="md" label="M" />
        <Radio value="lg" label="L" />
        <Radio value="xl" label="XL" />
      </RadioGroup>
    );
  },
};

export const InsideField = {
  render: () => {
    const [v, setV] = useState();
    return (
      <Field label="Método de pago" required error={!v ? "Elige un método" : null}>
        <RadioGroup label="Método de pago" value={v} onChange={setV}>
          <Radio value="card" label="Tarjeta de crédito" />
          <Radio value="transfer" label="Transferencia" />
          <Radio value="crypto" label="Crypto" description="BTC · ETH" />
        </RadioGroup>
      </Field>
    );
  },
};

export const Disabled = {
  render: () => (
    <RadioGroup label="Opciones" value="b" disabled>
      <Radio value="a" label="Opción A" />
      <Radio value="b" label="Opción B (seleccionada)" />
    </RadioGroup>
  ),
};
