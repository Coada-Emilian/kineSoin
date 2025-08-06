import { createContext, useContext, useState } from 'react';
import { ISameDayAppointment } from '../../../@types/interfaces/customInterfaces';

interface PrescriptionsContextType {
  selectedPrescription: ISameDayAppointment['prescription'] | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['prescription'] | null>
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

  return (
    <PrescriptionsContext.Provider
      value={{ selectedPrescription, setSelectedPrescription }}
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
