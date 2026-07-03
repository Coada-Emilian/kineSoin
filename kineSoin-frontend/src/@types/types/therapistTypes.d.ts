export interface TherapistAppointmentsContextTypes {
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
