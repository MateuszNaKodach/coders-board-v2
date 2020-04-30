import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { TranslationProvider } from '@services/translation';
import { ThemeProvider } from '@services/theme';
import { store } from '@store/store';
import { FC } from '@typings/components';

export const Providers: FC = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Provider store={store}>
          <TranslationProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TranslationProvider>
        </Provider>
      </BrowserRouter>
    </Suspense>
  );
};
