import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { apollo, theme } from 'utils';
import AuthProvider from './auth';
import MeProvider from './me';

const AppProviders: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={apollo}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MeProvider>{children}</MeProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
