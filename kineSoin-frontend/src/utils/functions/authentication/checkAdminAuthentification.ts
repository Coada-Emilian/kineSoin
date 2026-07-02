import type { CheckAdminAuthenticationFunctionProps } from '../../../@types/props/functionProps';
import axios from '../../../axios';
import { getAdminTokenAndDataFromLocalStorage } from '../../localStorage/adminLocalStorage';

export const checkAdminAuthentication = ({
  setIsAdminAuthenticated,
  setAdminProfileToken,
}: CheckAdminAuthenticationFunctionProps) => {
  const response = getAdminTokenAndDataFromLocalStorage();

  const admin_token = response?.admin_token;

  if (admin_token) {
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(true);
    }

    axios.defaults.headers.common.Authorization = `Bearer ${admin_token}`;
  } else {
    if (setIsAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }

    if (setAdminProfileToken) {
      setAdminProfileToken(null);
    }

    delete axios.defaults.headers.common.Authorization;
  }
};
