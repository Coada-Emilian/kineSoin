import type { ReactNode } from 'react';
import type { IBasicUser } from '../interfaces/customInterfaces';
import type { ISameDayAppointment } from '../interfaces/therapistInterfaces';
import type { BaseModalSize } from '../types/modalTypes';
import type { BasicModalProps } from './modalProps';

export interface TherapistPageProps {
  pathName: string;
}

export interface UseFetchTherapistBasicDataQueryProps {
  setTherapist: React.Dispatch<React.SetStateAction<IBasicUser | undefined>>;
}

export interface TherapistDashboardAppointmentsTableProps {
  appointments: ISameDayAppointment[];
}

export interface TherapistDashboardAppointmentsCardProps {
  appointment: ISameDayAppointment;
}

export interface TherapistHeaderProps {
  page: string;
}

export interface TherapistModalProps extends BasicModalProps {
  header: React.ReactNode;
  message?: ReactNode;
  patient?: ISameDayAppointment['patient'] | null;
  isDestructive?: boolean;
  size?: BaseModalSize;
  children: ReactNode;
}

