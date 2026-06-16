import { createContext, useContext, useState } from 'react';
import { IUserProfile } from '../../../@types/interfaces/customInterfaces';

interface TherapistContextType {
  therapistProfiles: IUserProfile[];
  setTherapistProfiles: React.Dispatch<React.SetStateAction<IUserProfile[]>>;

  basicTherapistDetails?: IUserProfile;
  setBasicTherapistDetails?: React.Dispatch<
    React.SetStateAction<IUserProfile | undefined>
  >;

  selectedTherapist: IUserProfile | undefined;
  setSelectedTherapist: React.Dispatch<
    React.SetStateAction<IUserProfile | undefined>
  >;
}

const TherapistContext = createContext<TherapistContextType | undefined>(
  undefined
);

export const TherapistContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [therapistProfiles, setTherapistProfiles] = useState<IUserProfile[]>(
    []
  );
  const [basicTherapistDetails, setBasicTherapistDetails] = useState<
    IUserProfile | undefined
  >(undefined);

  const [selectedTherapist, setSelectedTherapist] = useState<IUserProfile>();
  return (
    <TherapistContext.Provider
      value={{
        therapistProfiles,
        setTherapistProfiles,
        basicTherapistDetails,
        setBasicTherapistDetails,
        selectedTherapist,
        setSelectedTherapist,
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};

export const useTherapistContext = () => {
  const context = useContext(TherapistContext);
  if (!context) {
    throw new Error(
      'useTherapistContext must be used within a TherapistContextProvider'
    );
  }
  return context;
};
