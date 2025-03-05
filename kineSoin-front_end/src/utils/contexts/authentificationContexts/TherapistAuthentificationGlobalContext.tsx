import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { checkTherapistAuthentication } from '../../AppUtils/authentificationFunctions/appAuthentificationFunctions';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';

// Define the context type
interface TherapistAuthentificationGlobalContextType {
  isTherapistAuthenticated: boolean;
  therapistProfileToken: string | null;
  setTherapistProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with default values
export const TherapistAuthentificationGlobalContext = createContext<
  TherapistAuthentificationGlobalContextType | undefined
>(undefined);

// Provider component to manage and provide authentication state
export const TherapistAuthentificationGlobalContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
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
    <TherapistAuthentificationGlobalContext.Provider
      value={{
        isTherapistAuthenticated,
        therapistProfileToken,
        setTherapistProfileToken,
      }}
    >
      {children}
    </TherapistAuthentificationGlobalContext.Provider>
  );
};
