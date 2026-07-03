import { createContext, useContext, useState } from 'react';
import type {
  IPatientPrescription,
  ISameDayAppointment,
} from '../../@types/interfaces/therapistInterfaces';

interface PrescriptionsContextType {
  selectedPrescription: ISameDayAppointment['prescription'] | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['prescription'] | null>
  >;

  patientPrescriptions: IPatientPrescription[] | null;
  setPatientPrescriptions: React.Dispatch<
    React.SetStateAction<IPatientPrescription[] | null>
  >;
}
const TherapistPrescriptionsContext = createContext<
  PrescriptionsContextType | undefined
>(undefined);

export const TherapistPrescriptionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState<
    ISameDayAppointment['prescription'] | null
  >(null);

  const [patientPrescriptions, setPatientPrescriptions] = useState<
    IPatientPrescription[] | null
  >(null);

  return (
    <TherapistPrescriptionsContext.Provider
      value={{
        selectedPrescription,
        setSelectedPrescription,
        patientPrescriptions,
        setPatientPrescriptions,
      }}
    >
      {children}
    </TherapistPrescriptionsContext.Provider>
  );
};

export default TherapistPrescriptionsContext;


