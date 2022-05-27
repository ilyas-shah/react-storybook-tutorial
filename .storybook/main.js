// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  features: {
    postcss: false,
  },
  framework: "@storybook/react",
  core: {
    builder: "webpack4",
  },
};
