import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { ICountry } from '../../@types/customInterfaces';
import { fetchCountriesData } from '../componentUtils/commonComponents/functions/StandardInputs/fetchCountriesData';

interface PrefixesContextInterface {
  countries: ICountry[];
  setCountries: Dispatch<SetStateAction<ICountry[]>>;
}

const PrefixesContext = createContext<PrefixesContextInterface | undefined>(
  undefined
);

interface PrefixesContextProviderProps {
  children: ReactNode;
}

export const PrefixesContextProvider = ({
  children,
}: PrefixesContextProviderProps) => {
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    fetchCountriesData({ setCountries });
  }, []);

  return (
    <PrefixesContext.Provider value={{ countries, setCountries }}>
      {children}
    </PrefixesContext.Provider>
  );
};

export const usePrefixesContext = () => {
  const context = React.useContext(PrefixesContext);

  if (context === undefined) {
    throw new Error(
      'usePrefixesContext must be used within a PrefixesContextProvider'
    );
  }
  return context;
};

export default PrefixesContext;
