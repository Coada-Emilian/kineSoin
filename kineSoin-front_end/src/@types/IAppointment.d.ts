import { IPrescription } from './IPrescription';
import { ITherapist } from './ITherapist';

export interface IAppointment {
  id: number;
  therapist_id: number;
  patient_id: number;
  prescription_id: number;
  is_canceled: boolean;
  is_accepted: boolean;
  date: string;
  time: string;
  therapist?: ITherapist;
  prescription?: IPrescription;
}
