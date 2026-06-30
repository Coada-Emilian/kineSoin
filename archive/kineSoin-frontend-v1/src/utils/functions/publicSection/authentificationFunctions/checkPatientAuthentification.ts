import axios from '../../../../axios';
import { getPatientTokenAndDataFromLocalStorage } from '../../../../localStorage/patientLocalStorage';

interface FunctionProps {
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const checkPatientAuthentification = ({
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
