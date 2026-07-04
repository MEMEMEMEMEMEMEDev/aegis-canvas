import { useState } from "react";
import Toggle from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { globals: { theme: "fono" } },
};

export const Playground = {
  render: (args) => {
    const [on, setOn] = useState(false);
    return <Toggle {...args} checked={on} onChange={setOn} label="Demo" />;
  },
};

export const Small = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Toggle size="sm" checked={on} onChange={setOn} label="Demo small" />;
  },
};
