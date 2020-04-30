const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const disableEsLint = (e) => {
  return e.module.rules.filter(e =>
    e.use && e.use.some(e => e.options && void 0 !== e.options.useEslintrc)).forEach(s => {
      e.module.rules = e.module.rules.filter(e => e !== s)
    }), e
};

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config = disableEsLint(config);

    config.resolve.plugins = config.resolve.plugins || [];

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '..', 'tsconfig.json') }),
    );

    return config;
  },
};
