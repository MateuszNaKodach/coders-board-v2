import { message } from 'antd';
import ApolloClient from 'apollo-boost';
import { ErrorResponse } from 'apollo-link-error';

const handleApolloError = ({ networkError, graphQLErrors }: ErrorResponse) => {
  if (networkError && networkError.message === 'Failed to fetch') {
    message.error('Błąd połączenia z serwerem');
  }

  console.error({ networkError, graphQLErrors });
};

export const apollo = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials: 'include',
  onError: (error: ErrorResponse) => {
    handleApolloError(error);
  },
});

export type ApolloInstance = typeof apollo;
