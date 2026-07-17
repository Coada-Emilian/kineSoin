import { createContext, useState } from 'react';
import type { ITherapistSelectionContext } from '../../@types/interfaces/contextInterfaces';
import type {
  IDashboardAppointment,
  IPatientSummary,
  IPrescriptionDetailsDto,
} from '../../@types/interfaces/therapistInterfaces';

const TherapistSelectionContext = createContext<
  ITherapistSelectionContext | undefined
>(undefined);

export const TherapistSelectionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] =
    useState<IPatientSummary | null>(null);

  const [selectedDashboardAppointment, setSelectedDashboardAppointment] =
    useState<IDashboardAppointment | null>(null);

  const [selectedDashboardPrescription, setSelectedDashboardPrescription] =
    useState<IPrescriptionDetailsDto | null>(null);

  return (
    <TherapistSelectionContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,

        selectedDashboardAppointment,
        setSelectedDashboardAppointment,

        selectedDashboardPrescription,
        setSelectedDashboardPrescription,
      }}
    >
      {children}
    </TherapistSelectionContext.Provider>
  );
};

export default TherapistSelectionContext;
