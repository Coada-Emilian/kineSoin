import { createContext, useState } from 'react';
import type { ISameDayAppointment } from '../../@types/interfaces/therapistInterfaces';
import type { TherapistAppointmentsContextTypes } from '../../@types/types/therapistTypes';

const TherapistAppointmentsContext = createContext<
  TherapistAppointmentsContextTypes | undefined
>(undefined);

export const TherapistAppointmentsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<ISameDayAppointment | null>(null);

  return (
    <TherapistAppointmentsContext.Provider
      value={{
        selectedAppointment,
        setSelectedAppointment,
      }}
    >
      {children}
    </TherapistAppointmentsContext.Provider>
  );
};

export default TherapistAppointmentsContext;
