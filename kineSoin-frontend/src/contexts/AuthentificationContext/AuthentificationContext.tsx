import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type {
  AuthenticatedUser,
  IAuthenticationContext,
} from '../../@types/interfaces/contextInterfaces';
import axios from '../../axios';
import { refreshAuthentication } from '../../utils/functions/authentication/refreshAuthentication';
import { getTherapistTokenAndDataFromLocalStorage } from '../../utils/localStorage/therapistLocalStorage';

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(
  undefined
);

export const AuthenticationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // On component mount and every 30 seconds, re-check admin auth
    refreshAuthentication()
      .then((auth) => {
        if (!auth) return;

        setUser(auth.user);
        setAccessToken(auth.token);

        axios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => getTherapistTokenAndDataFromLocalStorage()?.token || null);

  // useEffect(() => {
  //   // On component mount and every 30 seconds, re-check admin auth
  //   checkTherapistAuthentication({
  //     setIsTherapistAuthenticated,
  //     setTherapistProfileToken,
  //   });

  //   setIsAuthLoading(false);

  //   const handleTherapistStorageChange = (event: StorageEvent) => {
  //     if (event.key === 'token') {
  //       checkTherapistAuthentication({
  //         setIsTherapistAuthenticated,
  //         setTherapistProfileToken,
  //       });
  //     }
  //   };

  //   // // Listen for storage changes (in case another tab logs out)
  //   window.addEventListener('storage', handleTherapistStorageChange);

  //   // const therapistIntervalId = setInterval(() => {
  //   //   checkTherapistAuthentication({
  //   //     setIsTherapistAuthenticated,
  //   //     setTherapistProfileToken,
  //   //   });
  //   // }, 30000); // Re-check every 30s

  //   return () => {
  //     window.removeEventListener('storage', handleTherapistStorageChange);
  //     //   clearInterval(therapistIntervalId);
  //   };
  // }, []);

  // const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  // const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
  //   () => getPatientTokenAndDataFromLocalStorage()?.token || null
  // );

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

  // Provide all states and setters via context
  return (
    <AuthenticationContext.Provider
      value={{
        // isPatientAuthenticated,
        // setIsPatientAuthenticated,
        // patientProfileToken,
        // setPatientProfileToken,

        isTherapistAuthenticated,
        setIsTherapistAuthenticated,
        therapistProfileToken,
        setTherapistProfileToken,

        isAuthLoading,
        setIsAuthLoading,

        user,
        setUser,

        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
