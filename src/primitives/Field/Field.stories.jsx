import { useState } from "react";
import Field from "./Field";
import Input from "../Input/Input";

export default {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
};

/**
 * El wiring accesible es automático: el control dentro de <Field> recibe id,
 * aria-invalid y aria-describedby por contexto (inspecciona el DOM). El error
 * reemplaza al hint y se anuncia con role="alert".
 */
export const ConInput = {
  render: () => {
    const [value, setValue] = useState("");
    const error =
      value && !value.includes("@") ? "Eso no parece un correo" : null;
    return (
      <div style={{ width: 280 }}>
        <Field
          label="Correo"
          required
          hint="Escribe algo sin @ para ver el error"
          error={error}
        >
          <Input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="tu@correo.com"
          />
        </Field>
      </div>
    );
  },
};

export const Deshabilitado = {
  render: () => (
    <div style={{ width: 280 }}>
      <Field label="Solo lectura" hint="El disabled también fluye por contexto" disabled>
        <Input placeholder="No editable" />
      </Field>
    </div>
  ),
};
