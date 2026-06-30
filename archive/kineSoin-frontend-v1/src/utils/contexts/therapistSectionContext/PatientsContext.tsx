import { createContext, useContext, useState } from 'react';
import {
  ISameDayAppointment,
  ITherapistPatientDetails,
  IUserProfile,
} from '../../../@types/interfaces/customInterfaces';

interface PatientsContextType {
  selectedPatient: ISameDayAppointment['patient'] | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['patient'] | null>
  >;

  allPatients: IUserProfile[];
  setAllPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;

  patientDetails: ITherapistPatientDetails | null;
  setPatientDetails: React.Dispatch<
    React.SetStateAction<ITherapistPatientDetails | null>
  >;

  therapistPatients: IUserProfile[];
  setTherapistPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;
}

const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const PatientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);
  const [allPatients, setAllPatients] = useState<IUserProfile[]>([]);
  const [patientDetails, setPatientDetails] =
    useState<ITherapistPatientDetails | null>(null);

  const [therapistPatients, setTherapistPatients] = useState<IUserProfile[]>(
    []
  );

  return (
    <PatientsContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,
        allPatients,
        setAllPatients,
        patientDetails,
        setPatientDetails,
        therapistPatients,
        setTherapistPatients,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsContext = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error(
      'usePatientsContext must be used within a PatientsContextProvider'
    );
  }
  return context;
};
