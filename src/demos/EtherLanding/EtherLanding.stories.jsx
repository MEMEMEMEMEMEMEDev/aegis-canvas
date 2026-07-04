import EtherLanding from "./EtherLanding";

export default {
  title: "Concepts/Ether Landing",
  component: EtherLanding,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // This concept is designed for the "ether" theme.
    theme: "ether",
  },
};

export const Default = {
  name: "Calm Engine",
  globals: { theme: "ether" },
  render: () => <EtherLanding />,
};
