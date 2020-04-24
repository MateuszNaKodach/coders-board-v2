import React, { ReactNode } from 'react';
import { useHasPermissions } from 'hooks';
import { Redirect } from 'react-router-dom';

export interface AdminWrapperProps {
  children?: ReactNode;
}

const AdminWrapper = ({ children }: AdminWrapperProps) => {
  const hasPermissions = useHasPermissions(['ADMIN', 'OWNER']);

  if (!hasPermissions) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminWrapper;
