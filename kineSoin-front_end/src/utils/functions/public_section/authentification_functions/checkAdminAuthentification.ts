import axios from '../../../../axios';
import { getAdminTokenAndDataFromLocalStorage } from '../../../../localStorage/adminLocalStorage';

interface FunctionProps {
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const checkAdminAuthentification = ({
  setIsAdminAuthenticated,
  setAdminProfileToken,
}: FunctionProps) => {
  const response = getAdminTokenAndDataFromLocalStorage();

  const token = response?.token;

  if (token && token === response?.token) {
    setIsAdminAuthenticated && setIsAdminAuthenticated(true);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    setIsAdminAuthenticated && setIsAdminAuthenticated(false);

    setAdminProfileToken && setAdminProfileToken(null);

    delete axios.defaults.headers.common.Authorization;
  }
};
