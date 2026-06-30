import { createContext, useContext, useState } from 'react';
import {
  IPatientPrescription,
  ISameDayAppointment,
} from '../../../@types/interfaces/customInterfaces';

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
const PrescriptionsContext = createContext<
  PrescriptionsContextType | undefined
>(undefined);

export const PrescriptionsContextProvider = ({
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
    <PrescriptionsContext.Provider
      value={{
        selectedPrescription,
        setSelectedPrescription,
        patientPrescriptions,
        setPatientPrescriptions,
      }}
    >
      {children}
    </PrescriptionsContext.Provider>
  );
};

export const usePrescriptionsContext = () => {
  const context = useContext(PrescriptionsContext);
  if (!context) {
    throw new Error(
      'usePrescriptionsContext must be used within a PrescriptionsContextProvider'
    );
  }
  return context;
};
