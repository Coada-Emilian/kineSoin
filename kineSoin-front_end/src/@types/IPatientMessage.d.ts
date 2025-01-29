import { IPatient } from './IPatient';
import { ITherapist } from './ITherapist';

export interface IPatientMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  date: string;
  time: string;
  sender: IPatient;
  receiver: ITherapist;
}
