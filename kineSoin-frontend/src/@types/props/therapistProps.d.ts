import type { ReactNode } from 'react';
import type { IBasicUser } from '../interfaces/customInterfaces';
import type {
  IAfflictionDetails,
  IDashboardAppointment,
  IPatientHistoryDto,
  IPatientsTableRowDataDto,
} from '../interfaces/therapistInterfaces';
import type { BaseModalSize } from '../types/modalTypes';
import type { BasicModalProps } from './modalProps';

export interface TherapistPageProps {
  pathName: string;
}

export interface UseFetchTherapistBasicDataQueryProps {
  setTherapist: React.Dispatch<React.SetStateAction<IBasicUser | undefined>>;
}

export interface TherapistDashboardAppointmentsTableProps {
  appointments: IDashboardAppointment[];
}

export interface TherapistDashboardAppointmentsCardProps {
  appointment: IDashboardAppointment;
}

export interface TherapistHeaderProps {
  page: string;
}

export interface TherapistModalProps extends BasicModalProps {
  header: React.ReactNode;
  message?: ReactNode;
  patient?: {
    surname: string | null;
    name: string | null;
    picture_url: string | null;
  } | null;
  isDestructive?: boolean;
  size?: BaseModalSize;
  children: ReactNode;
}

export interface PatientStatisticsProps {
  patientsStatistics: {
    total: number;
    active: number;
    pending: number;
    newThisMonth: number;
  };
}

export interface PatientsTableHeadProps {
  onSort: (sortBy: 'patient' | 'status' | 'therapist') => void;
  sortBy: 'patient' | 'status' | 'therapist' | null;
  sortOrder: 'asc' | 'desc';
}

export interface PatientsTableProps extends PatientsTableHeadProps {
  allPatients: IPatientsTableRowDataDto[];
}

export interface PatientTableBodyProps {
  patients: IPatientsTableRowDataDto[];
}

export interface AfflictionDetailsOutputsProps {
  selectedAffliction: IAfflictionDetails;
}

export interface TherapistDashboardProps {
  appointments: IDashboardAppointment[];
}

export interface TherapistDashboardAppointmentProps {
  appointment: IDashboardAppointment;
}

export interface PatientHistoryProps {
  data: IPatientHistoryDto;
}
