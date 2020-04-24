import React, { ReactNode } from 'react';
import { useAuth } from 'hooks/useAuth';
import { MeQuery } from 'generated/graphql';

export interface MeProviderProps {
  children: ReactNode;
}

export type MeProviderValues = MeQuery['me'];

const MeContext = React.createContext<MeProviderValues>(null);

const MeProvider = (props: MeProviderProps) => {
  const { data } = useAuth();
  const me = data ? data.me : null;

  return <MeContext.Provider value={me} {...props} />;
};

export { MeContext };
export default MeProvider;
