import axios from 'axios';
import type { CheckTherapistAuthenticationFunctionProps } from '../../../@types/props/functionProps';
import '../../../axios';
import { getTherapistTokenAndDataFromLocalStorage } from '../../localStorage/therapistLocalStorage';

export const checkTherapistAuthentication = ({
  setIsTherapistAuthenticated,
  setTherapistProfileToken,
}: CheckTherapistAuthenticationFunctionProps) => {
  const response = getTherapistTokenAndDataFromLocalStorage();

  const therapist_token = response?.token;

  if (therapist_token) {
    if (setIsTherapistAuthenticated) {
      setIsTherapistAuthenticated(true);
    }
    axios.defaults.headers.common.Authorization = `Bearer ${therapist_token}`;
  } else {
    if (setIsTherapistAuthenticated) {
      setIsTherapistAuthenticated(false);
    }

    if (setTherapistProfileToken) {
      setTherapistProfileToken(null);
    }

    delete axios.defaults.headers.common.Authorization;
  }
};
