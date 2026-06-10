import type { ReactNode } from 'react';
import type { CountryPrefixInterface } from './customInterfaces';

export interface AppContextInterface {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setError: (message: string | null) => void;
  countryPrefixes: CountryPrefixInterface[];
  setCountryPrefixes: Dispatch<SetStateAction<CountryPrefixInterface[]>>;
}

export interface AppContextProviderProps {
  children: ReactNode;
}
