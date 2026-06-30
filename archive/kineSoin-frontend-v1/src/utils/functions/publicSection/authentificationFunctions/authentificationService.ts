import {
  checkAdminAuthentification,
  checkPatientAuthentification,
  checkTherapistAuthentification,
} from '../authentificationFunctions';

export const checkAllAuthentications = ({
  setIsAdminAuthenticated,
  setAdminProfileToken,
  setIsPatientAuthenticated,
  setPatientProfileToken,
  setIsTherapistAuthenticated,
  setTherapistProfileToken,
}: any) => {
  checkAdminAuthentification({
    setIsAdminAuthenticated,
    setAdminProfileToken,
  });

  checkPatientAuthentification({
    setIsPatientAuthenticated,
    setPatientProfileToken,
  });

  checkTherapistAuthentification({
    setIsTherapistAuthenticated,
    setTherapistProfileToken,
  });
};
