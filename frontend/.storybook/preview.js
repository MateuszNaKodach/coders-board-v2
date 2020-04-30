import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '../src/services/theme';

const withGlobal = (story) => (
  <ThemeProvider>
    <div style={{ padding: 32 }}>{story()}</div>
  </ThemeProvider>
);

addDecorator(withGlobal);
