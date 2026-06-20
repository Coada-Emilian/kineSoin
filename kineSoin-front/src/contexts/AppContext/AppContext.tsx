import { createContext, useEffect, useState } from 'react';
import type { IAppContext } from '../../@types/interfaces/contextInterfaces';
import type { ICountryPrefix } from '../../@types/interfaces/customInterfaces';
import { fetchCountriesData } from '../../utils/functions/fetchCountriesData';
import type { ContextProviderProps } from '../../@types/props/contextProps';

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setLoading = (loading: boolean) => setIsLoading(loading);

  const setError = (message: string | null) => setErrorMessage(message);

  const [countryPrefixes, setCountryPrefixes] = useState<ICountryPrefix[]>([]);

  useEffect(() => {
    fetchCountriesData({ setCountryPrefixes });
  }, []);

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
