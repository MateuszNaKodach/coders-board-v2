import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from 'components';
import AppProviders from 'context';
import Root from 'pages/Root';
import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
//   const axe = require('react-axe');
//   axe(React, ReactDOM, 2000);
// }

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  <AppProviders>
    <BrowserRouter>
      <GlobalStyles />
      <Root />
    </BrowserRouter>
  </AppProviders>,
  document.getElementById('root'),
  () => {
    document.getElementById('preloading-styles')!.remove();
  },
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
