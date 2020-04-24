/* eslint-disable @typescript-eslint/no-unused-vars */

const red = [
  '',
  '#fff1f0',
  '#ffccc7',
  '#ffa39e',
  '#ff7875',
  '#ff4d4f',
  '#f5222d',
  '#cf1322',
  '#a8071a',
  '#820014',
  '#5c0011',
];

const volcano = [
  '',
  '#fff2e8',
  '#ffd8bf',
  '#ffbb96',
  '#ff9c6e',
  '#ff7a45',
  '#fa541c',
  '#d4380d',
  '#ad2102',
  '#871400',
  '#610b00',
];

const orange = [
  '',
  '#fff7e6',
  '#ffe7ba',
  '#ffd591',
  '#ffc069',
  '#ffa940',
  '#fa8c16',
  '#d46b08',
  '#ad4e00',
  '#873800',
  '#612500',
];

const gold = [
  '',
  '#fffbe6',
  '#fff1b8',
  '#ffe58f',
  '#ffd666',
  '#ffc53d',
  '#faad14',
  '#d48806',
  '#ad6800',
  '#874d00',
  '#613400',
];

const yellow = [
  '',
  '#feffe6',
  '#ffffb8',
  '#fffb8f',
  '#fff566',
  '#ffec3d',
  '#fadb14',
  '#d4b106',
  '#ad8b00',
  '#876800',
  '#614700',
];

const lime = [
  '',
  '#fcffe6',
  '#f4ffb8',
  '#eaff8f',
  '#d3f261',
  '#bae637',
  '#a0d911',
  '#7cb305',
  '#5b8c00',
  '#3f6600',
  '#254000',
];

const green = [
  '',
  '#f6ffed',
  '#d9f7be',
  '#b7eb8f',
  '#95de64',
  '#73d13d',
  '#52c41a',
  '#389e0d',
  '#237804',
  '#135200',
  '#092b00',
];

const cyan = [
  '',
  '#e6fffb',
  '#b5f5ec',
  '#87e8de',
  '#5cdbd3',
  '#36cfc9',
  '#13c2c2',
  '#08979c',
  '#006d75',
  '#00474f',
  '#002329',
];

const blue = [
  '',
  '#e6f7ff',
  '#bae7ff',
  '#91d5ff',
  '#69c0ff',
  '#40a9ff',
  '#1890ff',
  '#096dd9',
  '#0050b3',
  '#003a8c',
  '#002766',
];

const geekblue = [
  '',
  '#f0f5ff',
  '#d6e4ff',
  '#adc6ff',
  '#85a5ff',
  '#597ef7',
  '#2f54eb',
  '#1d39c4',
  '#10239e',
  '#061178',
  '#030852',
];

const purple = [
  '',
  '#f9f0ff',
  '#efdbff',
  '#d3adf7',
  '#b37feb',
  '#9254de',
  '#722ed1',
  '#531dab',
  '#391085',
  '#22075e',
  '#120338',
];

const megenta = [
  '',
  '#fff0f6',
  '#ffd6e7',
  '#ffadd2',
  '#ff85c0',
  '#f759ab',
  '#eb2f96',
  '#c41d7f',
  '#9e1068',
  '#780650',
  '#520339',
];

const gray = [
  '',
  '#ffffff',
  '#fafafa',
  '#f5f5f5',
  '#e8e8e8',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#262626',
  '#000000',
];

const colors = {
  primary: blue[7],
  light: blue[6],
  dark: blue[8],
  slight: blue[1],
  info: blue[6],
  success: green[6],
  processing: blue[6],
  error: red[7],
  highlight: red[6],
  warning: gold[6],
  normal: gray[5],
  white: gray[1],
  black: gray[10],
  border: gray[5],
  divider: gray[4],
  background: gray[3],
  componentBackground: gray[1],
  tableHeader: gray[2],
  text: {
    title: gray[9],
    primary: gray[8],
    secondary: gray[7],
    placeholder: gray[6],
    disabled: gray[6],
  },
};

export type ThemeColors = typeof colors;

const fonts = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  codeFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export type ThemeFonts = typeof fonts;

const shadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.09)',
};

export type ThemeShadows = typeof shadows;

const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export type ThemeBreakpoints = typeof breakpoints;

export const theme = {
  colors,
  fonts,
  shadows,
  breakpoints,
};

export type Theme = typeof theme;
