import { createContext, useEffect, useState } from 'react';
import type {
  AppContextInterface,
  AppContextProviderProps,
} from '../../../@types/interfaces/contextInterfaces';
import type { ICountryPrefix } from '../../../@types/interfaces/customInterfaces';
import { fetchCountriesData } from '../../functions/fetchCountriesData';

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
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
