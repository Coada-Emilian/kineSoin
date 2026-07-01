import axios from '../../../axios';
import { getAdminTokenAndDataFromLocalStorage } from '../../localStorageUtils/adminLocalStorage';

interface FunctionProps {
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const checkAdminAuthentification = ({
  setIsAdminAuthenticated,
  setAdminProfileToken,
}: FunctionProps) => {
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
