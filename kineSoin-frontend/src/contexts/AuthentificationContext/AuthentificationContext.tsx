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
import { handleUserLogout } from '../../api/public/handleUserLogout';
import axios from '../../axios';
import { refreshAuthentication } from '../../utils/functions/authentication/refreshAuthentication';

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(
  undefined
);

export const AuthenticationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = async () => {
    try {
      await handleUserLogout();
    } finally {
      delete axios.defaults.headers.common.Authorization;

      setUser(null);
      setAccessToken(null);
    }
  };

  useEffect(() => {
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

  // Provide all states and setters via context
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthLoading,
        setIsAuthLoading,

        user,
        setUser,

        accessToken,
        setAccessToken,

        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
