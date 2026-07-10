import { createContext, useState } from 'react';
import type { ISameDayAppointment } from '../../@types/interfaces/therapistInterfaces';
import type { ITherapistSelectionContext } from '../../@types/interfaces/contextInterfaces';

const TherapistSelectionContext = createContext<
  ITherapistSelectionContext | undefined
>(undefined);

export const TherapistSelectionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);

  const [selectedAppointment, setSelectedAppointment] =
    useState<ISameDayAppointment | null>(null);

  const [selectedPrescription, setSelectedPrescription] = useState<
    ISameDayAppointment['prescription'] | null
  >(null);

  return (
    <TherapistSelectionContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,

        selectedAppointment,
        setSelectedAppointment,

        selectedPrescription,
        setSelectedPrescription,
      }}
    >
      {children}
    </TherapistSelectionContext.Provider>
  );
};

export default TherapistSelectionContext;
