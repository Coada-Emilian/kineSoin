import axios from '../../../../axios';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../localStorage/therapistLocalStorage';

interface FunctionProps {
  setIsTherapistAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export const checkTherapistAuthentification = ({
  setIsTherapistAuthenticated,
  setTherapistProfileToken,
}: FunctionProps) => {
  const response = getTherapistTokenAndDataFromLocalStorage();

  const token = response?.token;

  if (token && token === response?.token) {
    setIsTherapistAuthenticated && setIsTherapistAuthenticated(true);

    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  } else {
    setIsTherapistAuthenticated && setIsTherapistAuthenticated(false);

    setTherapistProfileToken && setTherapistProfileToken(null);

    delete axios.defaults.headers.common.Authorization;
  }
};
