import MetaTag from "./MetaTag";

export default {
  title: "Components/MetaTag",
  component: MetaTag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export const Outline = { args: { children: "FREELANCE" } };
export const Solid = { args: { children: "ONLINE", variant: "solid" } };
export const WithSwatch = { args: { children: "#7BA7AF", swatch: "#7BA7AF" } };
