import { createContext, useState } from 'react';
import type { IBasicUser } from '../../@types/interfaces/customInterfaces';
import type {
  ISameDayAppointment,
  ITherapistPatientDetails,
} from '../../@types/interfaces/therapistInterfaces';

interface PatientsContextType {
  selectedPatient: ISameDayAppointment['patient'] | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['patient'] | null>
  >;

  allPatients: IBasicUser[];
  setAllPatients: React.Dispatch<React.SetStateAction<IBasicUser[]>>;

  patientDetails: ITherapistPatientDetails | null;
  setPatientDetails: React.Dispatch<
    React.SetStateAction<ITherapistPatientDetails | null>
  >;

  therapistPatients: IBasicUser[];
  setTherapistPatients: React.Dispatch<React.SetStateAction<IBasicUser[]>>;
}

const TherapistPatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const TherapistPatientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);
  const [allPatients, setAllPatients] = useState<IBasicUser[]>([]);
  const [patientDetails, setPatientDetails] =
    useState<ITherapistPatientDetails | null>(null);

  const [therapistPatients, setTherapistPatients] = useState<IBasicUser[]>([]);

  return (
    <TherapistPatientsContext.Provider
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
    </TherapistPatientsContext.Provider>
  );
};

export default TherapistPatientsContext;
