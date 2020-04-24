import { useContext } from 'react';
import { MeContext } from 'context/me';

export const useMe = () => {
  const context = useContext(MeContext);

  if (context === undefined) {
    throw new Error(`useMe must be used within a MeProvider`);
  }

  return context;
};
