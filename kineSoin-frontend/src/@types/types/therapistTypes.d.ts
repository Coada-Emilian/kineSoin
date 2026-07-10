export interface TherapistAppointmentsContextTypes {
  selectedAppointment: ISameDayAppointment | null;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<ISameDayAppointment | null>
  >;
}

export interface TherapistPageHeader {
  title: string;
  subtitle?: string;
}
