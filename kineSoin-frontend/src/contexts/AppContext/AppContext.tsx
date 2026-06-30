import { createContext, useCallback, useState } from 'react';
import type { ICountryPrefix } from '../../@types/interfaces/apiInterfaces';
import type { IAppContext } from '../../@types/interfaces/contextInterfaces';
import type { AppContextProviderProps } from '../../@types/props/contextProps';
import countries from '../../data/countryPrefixes.json';

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setLoading = (loading: boolean) => setIsLoading(loading);

  const setError = useCallback((message: string | null) => {
    setErrorMessage(message);
  }, []);

  const [countryPrefixes, setCountryPrefixes] =
    useState<ICountryPrefix[]>(countries);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setLoading,
        errorMessage,
        setError,
        countryPrefixes,
        setCountryPrefixes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Export the context itself, so it can be used elsewhere if necessary.
export default AppContext;
