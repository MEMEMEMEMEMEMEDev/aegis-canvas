import Stack from "./Stack";
import Card from "../Card/Card";

export default {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "inline-radio", options: ["row", "column"] },
    gap: {
      control: "select",
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    wrap: { control: "boolean" },
  },
  args: { direction: "column", gap: "md", wrap: false },
};

const Box = ({ children }) => (
  <Card elevation="sm" padding="md" style={{ minWidth: "5rem", textAlign: "center" }}>
    {children}
  </Card>
);

export const Default = {
  render: (args) => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
};
