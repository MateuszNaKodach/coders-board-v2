/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAntDesignPlugin = require('craco-antd');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const customizeTheme = require('./src/generated/customizeTheme');

module.exports = {
  plugins:
    process.env.NODE_ENV !== 'test'
      ? [
          {
            plugin: CracoAntDesignPlugin,
            options: {
              customizeTheme,
            },
          },
        ]
      : undefined,
  babel: {
    plugins: ['lodash', 'babel-plugin-styled-components'],
  },
  webpack: {
    plugins: [new LodashModuleReplacementPlugin()],
  },
};
