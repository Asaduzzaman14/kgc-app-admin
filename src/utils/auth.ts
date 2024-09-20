import { removeKgcAdminToken } from '../hooks/handelAdminToken';

export const logout = () => {
  removeKgcAdminToken();

  window.location.href = '/';
};
