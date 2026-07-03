import { createContext, useState } from 'react';
import type {
  ICalendarAppointment,
  IPatientAppointmentDetails,
  ISameDayAppointment,
} from '../../@types/interfaces/therapistInterfaces';
import type { TherapistAppointmentsContextTypes } from '../../@types/types/therapistTypes';

const TherapistAppointmentsContext = createContext<
  TherapistAppointmentsContextTypes | undefined
>(undefined);

export const TherapistAppointmentsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tableAppointments, setTableAppointments] = useState<
    ISameDayAppointment[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<ISameDayAppointment | null>(null);
  const [allAppointments, setAllAppointments] = useState<
    ICalendarAppointment[]
  >([]);
  const [previousPatientAppointments, setPreviousPatientAppointments] =
    useState<IPatientAppointmentDetails[]>([]);
  const [upcomingPatientAppointments, setUpcomingPatientAppointments] =
    useState<IPatientAppointmentDetails[]>([]);

  return (
    <TherapistAppointmentsContext.Provider
      value={{
        tableAppointments,
        setTableAppointments,
        selectedAppointment,
        setSelectedAppointment,
        allAppointments,
        setAllAppointments,
        previousPatientAppointments,
        setPreviousPatientAppointments,
        upcomingPatientAppointments,
        setUpcomingPatientAppointments,
      }}
    >
      {children}
    </TherapistAppointmentsContext.Provider>
  );
};

export default TherapistAppointmentsContext;
