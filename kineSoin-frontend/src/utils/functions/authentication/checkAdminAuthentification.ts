import type { CheckAdminAuthenticationFunctionProps } from '../../../@types/props/functionProps';
import axios from '../../../axios';
import { getAdminTokenAndDataFromLocalStorage } from '../../localStorage/adminLocalStorage';

export const checkAdminAuthentication = ({
  setIsAdminAuthenticated,
  setAdminProfileToken,
}: CheckAdminAuthenticationFunctionProps) => {
  const response = getAdminTokenAndDataFromLocalStorage();
  const admin_token = response?.admin_token;

  if (!admin_token) {
    return;
  }

  if (setIsAdminAuthenticated) {
    setIsAdminAuthenticated(true);
  }

  if (setAdminProfileToken) {
    setAdminProfileToken(admin_token);
  }

  axios.defaults.headers.common.Authorization = `Bearer ${admin_token}`;
};
