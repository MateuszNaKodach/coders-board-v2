module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
  ],
};
