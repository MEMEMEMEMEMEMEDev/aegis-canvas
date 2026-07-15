import { useState } from "react";
import Checkbox from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export const Playground = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Checkbox
        label="Acepto los términos y condiciones"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
    );
  },
};

export const WithDescription = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <Checkbox
        label="Notificaciones por correo"
        description="Te avisamos cuando alguien comenta tus proyectos"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
    );
  },
};

export const Indeterminate = {
  render: () => {
    const [items, setItems] = useState([true, false, true]);
    const all = items.every(Boolean);
    const some = items.some(Boolean) && !all;
    return (
      <div style={{ display: "grid", gap: "var(--ds-space-xs)" }}>
        <Checkbox
          label="Seleccionar todo"
          checked={all}
          indeterminate={some}
          onChange={(e) => setItems(items.map(() => e.target.checked))}
        />
        <div style={{ display: "grid", gap: "var(--ds-space-xs)", paddingLeft: "var(--ds-space-lg)" }}>
          {["Design system", "Engine 3D", "Portafolio"].map((name, i) => (
            <Checkbox
              key={name}
              label={name}
              checked={items[i]}
              onChange={(e) =>
                setItems(items.map((v, j) => (j === i ? e.target.checked : v)))
              }
            />
          ))}
        </div>
      </div>
    );
  },
};

export const States = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-space-xs)" }}>
      <Checkbox label="Normal" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Inválido" invalid />
      <Checkbox label="Deshabilitado" disabled />
      <Checkbox label="Deshabilitado marcado" disabled defaultChecked />
    </div>
  ),
};
