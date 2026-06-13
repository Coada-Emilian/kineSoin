import type { ReactNode } from 'react';
import type { FormOrderTypes } from '../types/customTypes';
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

export interface PatientRegistrationContextInterface {
  formOrder: FormOrderTypes;
  setFormOrder: React.Dispatch<React.SetStateAction<FormOrderTypes>>;
}
