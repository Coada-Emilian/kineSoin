import axios from '../../../axios';
import { getAdminTokenAndDataFromLocalStorage } from '../../../localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from '../../../localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';

interface FunctionProps {
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTherapistAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  setAdminProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export const checkAdminAuthentication = ({
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

export const checkPatientAuthentication = ({
  setIsPatientAuthenticated,
  setPatientProfileToken,
}: FunctionProps) => {
  const response = getPatientTokenAndDataFromLocalStorage();

  const token = response?.token;

  // Make sure to set token in axios only if it's available and valid
  if (token && token === response?.token) {
    setIsPatientAuthenticated && setIsPatientAuthenticated(true);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    setIsPatientAuthenticated && setIsPatientAuthenticated(false);

    setPatientProfileToken && setPatientProfileToken(null);

    delete axios.defaults.headers.common.Authorization;
  }
};

export const checkTherapistAuthentication = ({
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
