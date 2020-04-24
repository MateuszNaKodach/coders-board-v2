import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { theme } from '../src/utils/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepReplace = (item: Record<string, any> | string[]) => {
  if (typeof item === 'object') {
    return Object.keys(item).reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = deepReplace(item[key]);
      return obj;
    }, {});
  }
  return 'string';
};

const themeTypes = deepReplace(theme);
const themeString = JSON.stringify(themeTypes).replace(new RegExp('"', 'g'), '');
const template = `
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme ${themeString}
}
`.trim();

writeFileSync(resolve(__dirname, '..', 'src', 'generated', 'styled.d.ts'), template, 'utf8');

const lessVariablesOverwrite = `
module.exports = {
  '@primary-color': '${theme.colors.primary}',
  '@primary-1': '${theme.colors.slight}',
  '@primary-5': '${theme.colors.light}',
  '@primary-7': '${theme.colors.dark}',
  '@info-color': '${theme.colors.info}',
  '@success-color': '${theme.colors.success}',
  '@processing-color': '${theme.colors.processing}',
  '@error-color': '${theme.colors.error}',
  '@highlight-color': '${theme.colors.highlight}',
  '@warning-color': '${theme.colors.warning}',
  '@normal-color': '${theme.colors.normal}',
  '@white': '${theme.colors.white}',
  '@black': '${theme.colors.black}',
  '@border-color-base': '${theme.colors.border}',
  '@border-color-split': '${theme.colors.divider}',
  '@body-background': '${theme.colors.background}',
  '@component-background': '${theme.colors.componentBackground}',
  '@table-selected-row-bg': '${theme.colors.tableHeader}',
  '@heading-color': '${theme.colors.text.title}',
  '@text-color': '${theme.colors.text.primary}',
  '@text-color-secondary': '${theme.colors.text.secondary}',
  '@disabled-color': '${theme.colors.text.disabled}',
  '@input-placeholder-color': '${theme.colors.text.placeholder}',
  '@font-family': '${theme.fonts.fontFamily}',
  '@code-family': '${theme.fonts.codeFamily}',
  '@card-shadow': '${theme.shadows.card}',
};
`.trim();

writeFileSync(resolve(__dirname, '..', 'src', 'generated', 'customizeTheme.js'), lessVariablesOverwrite, 'utf8');
