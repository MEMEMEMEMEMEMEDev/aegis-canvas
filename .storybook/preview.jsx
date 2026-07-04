// Load the full foundation (reset + tokens + theme) into every story.
import "../src/index.scss";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
  },

  // Theme switcher in the Storybook toolbar.
  globalTypes: {
    theme: {
      description: "Foundation theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
          { value: "ether", icon: "paintbrush", title: "Ether" },
          { value: "fono", icon: "component", title: "Fono" },
          { value: "system", icon: "browser", title: "System" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const { theme } = context.globals;
      if (theme === "system") {
        delete root.dataset.theme;
      } else {
        root.dataset.theme = theme;
      }
      return Story();
    },
  ],
};

export default preview;
