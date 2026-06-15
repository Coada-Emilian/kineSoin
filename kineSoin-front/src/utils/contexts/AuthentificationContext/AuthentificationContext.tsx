import React, { createContext, useState, type ReactNode } from 'react';
import type { IAuthentificationContext } from '../../../@types/interfaces/contextInterfaces';
import { getAdminTokenAndDataFromLocalStorage } from '../../localStorageUtils/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from '../../localStorageUtils/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../localStorageUtils/therapistLocalStorage';

const AuthentificationContext = createContext<
  IAuthentificationContext | undefined
>(undefined);

export const AuthentificationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => getAdminTokenAndDataFromLocalStorage()?.token || null
  );

  //   useEffect(() => {
  //     // On component mount and every 30 seconds, re-check admin auth
  //     checkAdminAuthentification({
  //       setIsAdminAuthenticated,
  //       setAdminProfileToken,
  //     });

  //     const handleAdminStorageChange = (event: StorageEvent) => {
  //       if (event.key === 'token') {
  //         checkAdminAuthentification({
  //           setIsAdminAuthenticated,
  //           setAdminProfileToken,
  //         });
  //       }
  //     };

  //     // Listen for storage changes (in case another tab logs out)
  //     window.addEventListener('storage', handleAdminStorageChange);

  //     const adminIntervalId = setInterval(() => {
  //       checkAdminAuthentification({
  //         setIsAdminAuthenticated,
  //         setAdminProfileToken,
  //       });
  //     }, 30000); // Re-check every 30s

  //     return () => {
  //       window.removeEventListener('storage', handleAdminStorageChange);
  //       clearInterval(adminIntervalId);
  //     };
  //   }, [adminProfileToken]);


  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
    () => getPatientTokenAndDataFromLocalStorage()?.token || null
  );

  //   useEffect(() => {
  //     // Same logic as admin, for patient
  //     checkPatientAuthentification({
  //       setIsPatientAuthenticated,
  //       setPatientProfileToken,
  //     });

  //     const handlePatientStorageChange = (event: StorageEvent) => {
  //       if (event.key === 'token') {
  //         checkPatientAuthentification({
  //           setIsPatientAuthenticated,
  //           setPatientProfileToken,
  //         });
  //       }
  //     };

  //     window.addEventListener('storage', handlePatientStorageChange);

  //     const patientIntervalId = setInterval(() => {
  //       checkPatientAuthentification({
  //         setIsPatientAuthenticated,
  //         setPatientProfileToken,
  //       });
  //     }, 30000);

  //     return () => {
  //       window.removeEventListener('storage', handlePatientStorageChange);
  //       clearInterval(patientIntervalId);
  //     };
  //   }, [patientProfileToken]);

  // useEffect(() => {
  //   if (!isAdminAuthenticated && !adminProfileToken) {
  //     navigate('/admin/login');
  //   }
  // }, [isAdminAuthenticated, adminProfileToken, navigate]);


  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => getTherapistTokenAndDataFromLocalStorage()?.token || null);

  //   useEffect(() => {
  //     // Same logic as admin/patient, for therapist
  //     checkTherapistAuthentification({
  //       setIsTherapistAuthenticated,
  //       setTherapistProfileToken,
  //     });

  //     const handleTherapistStorageChange = (event: StorageEvent) => {
  //       if (event.key === 'token') {
  //         checkTherapistAuthentification({
  //           setIsTherapistAuthenticated,
  //           setTherapistProfileToken,
  //         });
  //       }
  //     };

  //     window.addEventListener('storage', handleTherapistStorageChange);

  //     const therapistIntervalId = setInterval(() => {
  //       checkTherapistAuthentification({
  //         setIsTherapistAuthenticated,
  //         setTherapistProfileToken,
  //       });
  //     }, 30000);

  //     return () => {
  //       window.removeEventListener('storage', handleTherapistStorageChange);
  //       clearInterval(therapistIntervalId);
  //     };
  //   }, [therapistProfileToken]);

  // Provide all states and setters via context
  return (
    <AuthentificationContext.Provider
      value={{
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminProfileToken,
        setAdminProfileToken,

        isPatientAuthenticated,
        setIsPatientAuthenticated,
        patientProfileToken,
        setPatientProfileToken,

        isTherapistAuthenticated,
        setIsTherapistAuthenticated,
        therapistProfileToken,
        setTherapistProfileToken,
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};

export default AuthentificationContext;
