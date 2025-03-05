import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAdminTokenAndDataFromLocalStorage } from '../../../localStorage/adminLocalStorage';
import { checkAdminAuthentication } from '../../AppUtils/authentificationFunctions/appAuthentificationFunctions';

// Define the context type
interface AdminAuthentificationGlobalContextType {
  isAdminAuthenticated: boolean;
  adminProfileToken: string | null;
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with default values
export const AdminAuthentificationGlobalContext = createContext<
  AdminAuthentificationGlobalContextType | undefined
>(undefined);

// Provider component to manage and provide authentication state
export const AdminAuthentificationGlobalContextProvider: React.FC<{
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

  return (
    <AdminAuthentificationGlobalContext.Provider
      value={{
        isAdminAuthenticated,

        adminProfileToken,

        setAdminProfileToken,
      }}
    >
      {children}
    </AdminAuthentificationGlobalContext.Provider>
  );
};
