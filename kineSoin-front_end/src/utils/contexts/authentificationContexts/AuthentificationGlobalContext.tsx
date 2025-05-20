// Import necessary React tools
import React, { createContext, ReactNode, useEffect, useState } from 'react';

// Import functions to retrieve tokens from localStorage
import { getAdminTokenAndDataFromLocalStorage } from '../../../localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from '../../../localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';

// Import authentication check functions
import {
  checkAdminAuthentication,
  checkPatientAuthentication,
  checkTherapistAuthentication,
} from '../../AppUtils/authentificationFunctions/appAuthentificationFunctions';

// Define the shape of the global context
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

// Create the global authentication context
export const AuthentificationGlobalContext = createContext<
  AuthentificationGlobalContextType | undefined
>(undefined);

// Provider component to wrap around the application
export const AuthentificationGlobalContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // === ADMIN AUTHENTICATION ===
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Load admin token from localStorage on initial render
  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => getAdminTokenAndDataFromLocalStorage()?.token || null
  );

  useEffect(() => {
    // On component mount and every 30 seconds, re-check admin auth
    checkAdminAuthentication({ setIsAdminAuthenticated, setAdminProfileToken });

    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAdminAuthentication({
          setIsAdminAuthenticated,
          setAdminProfileToken,
        });
      }
    };

    // Listen for storage changes (in case another tab logs out)
    window.addEventListener('storage', handleAdminStorageChange);

    const adminIntervalId = setInterval(() => {
      checkAdminAuthentication({
        setIsAdminAuthenticated,
        setAdminProfileToken,
      });
    }, 30000); // Re-check every 30s

    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      clearInterval(adminIntervalId);
    };
  }, [adminProfileToken]);

  // === PATIENT AUTHENTICATION ===
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
    () => getPatientTokenAndDataFromLocalStorage()?.token || null
  );

  useEffect(() => {
    // Same logic as admin, for patient
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

  // === THERAPIST AUTHENTICATION ===
  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => getTherapistTokenAndDataFromLocalStorage()?.token || null);

  useEffect(() => {
    // Same logic as admin/patient, for therapist
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

  // Provide all states and setters via context
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

// Custom hook for easy use of the authentication context
export const useAuthentificationContext = () => {
  const context = React.useContext(AuthentificationGlobalContext);

  if (!context) {
    throw new Error(
      'useAuthentificationContext must be used within a AuthentificationContext'
    );
  }

  return context;
};
