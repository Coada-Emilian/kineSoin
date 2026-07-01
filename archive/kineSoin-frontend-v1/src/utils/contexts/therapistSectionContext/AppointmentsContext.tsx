import { createContext, useContext, useState } from 'react';

import {
  ICalendarAppointment,
  IPatientAppointmentDetails,
  ISameDayAppointment,
} from '../../../@types/interfaces/customInterfaces';

interface AppointmentsContextType {
  tableAppointments: ISameDayAppointment[];
  setTableAppointments: React.Dispatch<
    React.SetStateAction<ISameDayAppointment[]>
  >;

  selectedAppointment: ISameDayAppointment | null;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<ISameDayAppointment | null>
  >;

  allAppointments: ICalendarAppointment[];
  setAllAppointments: React.Dispatch<
    React.SetStateAction<ICalendarAppointment[]>
  >;

  previousPatientAppointments: IPatientAppointmentDetails[];
  setPreviousPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;

  upcomingPatientAppointments: IPatientAppointmentDetails[];
  setUpcomingPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

export const AppointmentsContextProvider = ({
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
    <AppointmentsContext.Provider
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
    </AppointmentsContext.Provider>
  );
};
export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      'useAppointmentsContext must be used within an AppointmentsContextProvider'
    );
  }
  return context;
};
