import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getPatientTokenAndDataFromLocalStorage } from '../../../localStorage/patientLocalStorage';
import { checkPatientAuthentication } from '../../AppUtils/authentificationFunctions/appAuthentificationFunctions';

// Define the context type
interface PatientAuthentificationContextType {
  isPatientAuthenticated: boolean;
  patientProfileToken: string | null;
  setPatientProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with default values
export const PatientAuthentificationContext = createContext<
  PatientAuthentificationContextType | undefined
>(undefined);

// Provider component to manage and provide authentication state
export const PatientAuthentificationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
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

  return (
    <PatientAuthentificationContext.Provider
      value={{
        isPatientAuthenticated,
        patientProfileToken,
        setPatientProfileToken,
      }}
    >
      {children}
    </PatientAuthentificationContext.Provider>
  );
};

export const usePatientAuthentificationContext = () => {
  const context = React.useContext(PatientAuthentificationContext);

  if (!context) {
    throw new Error(
      'usePatientAuthentificationContext must be used within a PatientAuthentificationContext'
    );
  }

  return context;
};

export default PatientAuthentificationContext;
