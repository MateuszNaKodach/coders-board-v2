import { useMe } from './useMe';

export type PermissionKey = 'MEMBER' | 'ADMIN' | 'OWNER';

export type UseHasPermissionsArg = PermissionKey | PermissionKey[];

export const useHasPermissions = (value: UseHasPermissionsArg) => {
  const { permissions } = useMe()!;

  if (Array.isArray(value)) {
    return permissions.some((p) => value.includes(p));
  }
  return permissions.some((p) => p === value);
};
