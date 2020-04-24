const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelConfig = require('./babel.config');
const customizeTheme = require('../src/generated/customizeTheme');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.ts(x?)$/,
    include: [path.resolve(__dirname, '..', 'src')],
    use: [
      {
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      },
    ],
  });
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
        options: {
          modifyVars: customizeTheme,
          javascriptEnabled: true,
        },
      },
    ],
  });
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins = [
    ...config.resolve.plugins,
    new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '..', 'tsconfig.json') }),
  ];
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
