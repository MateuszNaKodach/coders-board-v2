/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import {
  SignInMutationFn,
  SignOutMutationFn,
  MeQuery,
  useMeQuery,
  useSignInMutation,
  useSignOutMutation,
  MeDocument,
} from 'generated/graphql';
import { Preloader } from 'components';

const AuthContext = React.createContext<AuthProviderValues>({
  data: { me: null },
  signIn: () => Promise.resolve() as any,
  signOut: () => Promise.resolve() as any,
});

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthProviderValues {
  data: MeQuery | undefined;
  signIn: SignInMutationFn;
  signOut: SignOutMutationFn;
}

const refetchMe = { refetchQueries: [{ query: MeDocument }] };

const AuthProvider = (props: AuthProviderProps) => {
  const { data, loading } = useMeQuery();
  const [signIn] = useSignInMutation(refetchMe);
  const [signOut] = useSignOutMutation(refetchMe);

  if ((!data || !data.me) && loading) {
    return <Preloader />;
  }

  return <AuthContext.Provider value={{ data, signIn, signOut }} {...props} />;
};

export { AuthContext };
export default AuthProvider;
