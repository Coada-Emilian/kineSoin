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

export type TherapistPatientQuickFilterTypes =
  | 'all'
  | 'self'
  | 'inactive'
  | 'pending';

export type TherapistPatientQuickFilterCounts = Record<
  TherapistPatientQuickFilterTypes,
  number
>;

export type PatientStatusType = 'active' | 'inactive' | 'pending' | 'banned';

type StatisticCardVariant = 'teal' | 'green' | 'yellow' | 'blue';
