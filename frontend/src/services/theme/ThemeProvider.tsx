import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { FC } from '@typings/components';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';

export const ThemeProvider: FC = ({ children }) => (
  <EmotionThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
);
