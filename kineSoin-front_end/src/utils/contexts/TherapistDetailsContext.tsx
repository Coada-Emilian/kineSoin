import { createContext, useContext, useState } from 'react';
import { IUserProfile } from '../../@types/interfaces/customInterfaces';
import { useFetchTherapistBasicData } from '../functions/privateSection/therapistSection/hooks/useFetchTherapistBasicData';

interface TherapistDetailsContextType {
  basicTherapistDetails: IUserProfile | undefined;
  setBasicTherapistDetails: React.Dispatch<
    React.SetStateAction<IUserProfile | undefined>
  >;
}

const TherapistDetailsContext = createContext<
  TherapistDetailsContextType | undefined
>(undefined);

interface TherapistDetailsContextProviderProps {
  children: React.ReactNode;
}

export const TherapistDetailsContextProvider = ({
  children,
}: TherapistDetailsContextProviderProps) => {
  const [basicTherapistDetails, setBasicTherapistDetails] = useState<
    IUserProfile | undefined
  >();

  useFetchTherapistBasicData({ setTherapist: setBasicTherapistDetails });

  return (
    <TherapistDetailsContext.Provider
      value={{ basicTherapistDetails, setBasicTherapistDetails }}
    >
      {children}
    </TherapistDetailsContext.Provider>
  );
};

export const useTherapistDetailsContext = () => {
  const context = useContext(TherapistDetailsContext);
  if (!context) {
    throw new Error(
      'useTherapistDetailsContext must be used within a TherapistDetailsContextProvider'
    );
  }
  return context;
};

export default TherapistDetailsContext;
