import React, { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { getAdminTokenAndDataFromLocalStorage } from '../../../localStorage/adminLocalStorage';
import {
  checkAdminAuthentication,
  checkPatientAuthentication,
  checkTherapistAuthentication,
} from '../../AppUtils/authentificationFunctions/appAuthentificationFunctions';
import { getPatientTokenAndDataFromLocalStorage } from '../../../localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';

interface AuthentificationGlobalContextType {
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  adminProfileToken: string | null;
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  patientProfileToken: string | null;
  setPatientProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isTherapistAuthenticated: boolean;
  setIsTherapistAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  therapistProfileToken: string | null;
  setTherapistProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthentificationGlobalContext = createContext<
  AuthentificationGlobalContextType | undefined
>(undefined);

export const AuthentificationGlobalContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => getAdminTokenAndDataFromLocalStorage()?.token || null
  );

  useEffect(() => {
    // Admin authentication check
    checkAdminAuthentication({ setIsAdminAuthenticated, setAdminProfileToken });
    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAdminAuthentication({
          setIsAdminAuthenticated,
          setAdminProfileToken,
        });
      }
    };
    window.addEventListener('storage', handleAdminStorageChange);
    const adminIntervalId = setInterval(() => {
      checkAdminAuthentication({
        setIsAdminAuthenticated,
        setAdminProfileToken,
      });
    }, 30000);

    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      clearInterval(adminIntervalId);
    };
  }, [adminProfileToken]);

  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
    () => getPatientTokenAndDataFromLocalStorage()?.token || null
  );

  useEffect(() => {
    // Patient authentication check
    checkPatientAuthentication({
      setIsPatientAuthenticated,
      setPatientProfileToken,
    });
    const handlePatientStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkPatientAuthentication({
          setIsPatientAuthenticated,
          setPatientProfileToken,
        });
      }
    };
    window.addEventListener('storage', handlePatientStorageChange);
    const patientIntervalId = setInterval(() => {
      checkPatientAuthentication({
        setIsPatientAuthenticated,
        setPatientProfileToken,
      });
    }, 30000);

    return () => {
      window.removeEventListener('storage', handlePatientStorageChange);
      clearInterval(patientIntervalId);
    };
  }, [patientProfileToken]);

  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => getTherapistTokenAndDataFromLocalStorage()?.token || null);

  useEffect(() => {
    // Therapist authentication check
    checkTherapistAuthentication({
      setIsTherapistAuthenticated,
      setTherapistProfileToken,
    });
    const handleTherapistStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkTherapistAuthentication({
          setIsTherapistAuthenticated,
          setTherapistProfileToken,
        });
      }
    };
    window.addEventListener('storage', handleTherapistStorageChange);
    const therapistIntervalId = setInterval(() => {
      checkTherapistAuthentication({
        setIsTherapistAuthenticated,
        setTherapistProfileToken,
      });
    }, 30000);

    return () => {
      window.removeEventListener('storage', handleTherapistStorageChange);
      clearInterval(therapistIntervalId);
    };
  }, [therapistProfileToken]);

  return (
    <AuthentificationGlobalContext.Provider
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
    </AuthentificationGlobalContext.Provider>
  );
};

export const useAuthentificationContext = () => {
  const context = React.useContext(AuthentificationGlobalContext);

  if (!context) {
    throw new Error(
      'useAuthentificationContext must be used within a AuthentificationContext'
    );
  }

  return context;
};
