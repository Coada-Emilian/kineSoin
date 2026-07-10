import { createContext, useState } from 'react';
import type { ISameDayAppointment } from '../../@types/interfaces/therapistInterfaces';

interface PrescriptionsContextType {
  selectedPrescription: ISameDayAppointment['prescription'] | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['prescription'] | null>
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

  return (
    <TherapistPrescriptionsContext.Provider
      value={{
        selectedPrescription,
        setSelectedPrescription,
      }}
    >
      {children}
    </TherapistPrescriptionsContext.Provider>
  );
};

export default TherapistPrescriptionsContext;
