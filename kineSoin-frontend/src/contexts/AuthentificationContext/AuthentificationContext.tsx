import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { IAuthenticationContext } from '../../@types/interfaces/contextInterfaces';
import { checkAdminAuthentication } from '../../utils/functions/authentication/checkAdminAuthentification';
import { checkTherapistAuthentication } from '../../utils/functions/authentication/checkTherapistAuthentication';
import { getAdminTokenAndDataFromLocalStorage } from '../../utils/localStorage/adminLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../utils/localStorage/therapistLocalStorage';

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(
  undefined
);

export const AuthenticationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => getAdminTokenAndDataFromLocalStorage()?.admin_token || null
  );

  useEffect(() => {
    // On component mount and every 30 seconds, re-check admin auth
    checkAdminAuthentication({
      setIsAdminAuthenticated,
      setAdminProfileToken,
    });

    setIsAuthLoading(false);

    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'admin_token') {
        checkAdminAuthentication({
          setIsAdminAuthenticated,
          setAdminProfileToken,
        });
      }
    };

    // // Listen for storage changes (in case another tab logs out)
    window.addEventListener('storage', handleAdminStorageChange);

    // const adminIntervalId = setInterval(() => {
    //   checkAdminAuthentication({
    //     setIsAdminAuthenticated,
    //     setAdminProfileToken,
    //   });
    // }, 30000); // Re-check every 30s

    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      //   clearInterval(adminIntervalId);
    };
  }, []);

  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => getTherapistTokenAndDataFromLocalStorage()?.token || null);

  useEffect(() => {
    // On component mount and every 30 seconds, re-check admin auth
    checkTherapistAuthentication({
      setIsTherapistAuthenticated,
      setTherapistProfileToken,
    });

    setIsAuthLoading(false);

    const handleTherapistStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkTherapistAuthentication({
          setIsTherapistAuthenticated,
          setTherapistProfileToken,
        });
      }
    };

    // // Listen for storage changes (in case another tab logs out)
    window.addEventListener('storage', handleTherapistStorageChange);

    // const therapistIntervalId = setInterval(() => {
    //   checkTherapistAuthentication({
    //     setIsTherapistAuthenticated,
    //     setTherapistProfileToken,
    //   });
    // }, 30000); // Re-check every 30s

    return () => {
      window.removeEventListener('storage', handleTherapistStorageChange);
      //   clearInterval(therapistIntervalId);
    };
  }, []);

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
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminProfileToken,
        setAdminProfileToken,

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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
