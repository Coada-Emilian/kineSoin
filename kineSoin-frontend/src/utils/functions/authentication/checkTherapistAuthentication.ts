import type { CheckTherapistAuthenticationFunctionProps } from '../../../@types/props/functionProps';
import { getTherapistTokenAndDataFromLocalStorage } from '../../localStorage/therapistLocalStorage';

export const checkTherapistAuthentication = ({
  setIsTherapistAuthenticated,
  setTherapistProfileToken,
}: CheckTherapistAuthenticationFunctionProps) => {
  const response = getTherapistTokenAndDataFromLocalStorage();

  const therapist_token = response?.token;

  if (!therapist_token) {
    if (setIsTherapistAuthenticated) {
      setIsTherapistAuthenticated(false);
    }

    if (setTherapistProfileToken) {
      setTherapistProfileToken(null);
    }
    return;
  }

  if (setIsTherapistAuthenticated) {
    setIsTherapistAuthenticated(true);
  }

  if (setTherapistProfileToken) {
    setTherapistProfileToken(therapist_token);
  }
  // axios.defaults.headers.common.Authorization = `Bearer ${therapist_token}`;
};
