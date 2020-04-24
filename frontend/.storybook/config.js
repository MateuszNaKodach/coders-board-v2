import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../src/components';
import { theme } from '../src/utils';

addParameters({
  options: {
    panelPosition: 'right',
  },
});

const req = require.context('../src/components', true, /.stories.tsx$/);

const withGlobal = story => (
  <ThemeProvider theme={theme}>
    <div style={{ width: '100%', height: '100vh', padding: 32, backgroundColor: '#fff' }}>
      <GlobalStyles />
      {story()}
    </div>
  </ThemeProvider>
);

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withGlobal);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
