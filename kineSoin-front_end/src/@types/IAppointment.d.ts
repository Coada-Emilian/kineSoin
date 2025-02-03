/**
 * @description Interface for representing an appointment.
 *
 * This interface:
 * - Defines the structure of an appointment object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the appointment.
 *   - therapist_id: A number representing the unique identifier of the therapist assigned to the appointment.
 *   - patient_id: A number representing the unique identifier of the patient attending the appointment.
 *   - prescription_id: A number representing the unique identifier of the prescription associated with the appointment.
 *   - is_canceled: A boolean indicating whether the appointment has been canceled.
 *   - is_accepted: A boolean indicating whether the appointment has been accepted.
 *   - date: A string representing the date of the appointment in ISO format (YYYY-MM-DD).
 *   - time: A string representing the time of the appointment in ISO format (HH:MM:SS).
 *   - therapist (optional): An object of type ITherapist representing the therapist assigned to the appointment.
 *   - prescription (optional): An object of type IPrescription representing the prescription associated with the appointment.
 *
 * Example usage:
 * const appointment: IAppointment = {
 *   id: 1,
 *   therapist_id: 101,
 *   patient_id: 202,
 *   prescription_id: 303,
 *   is_canceled: false,
 *   is_accepted: true,
 *   date: '2025-02-01',
 *   time: '10:30:00',
 *   therapist: { id: 101, name: 'Dr. John Doe' },
 *   prescription: { id: 303, details: 'Physical therapy for knee injury' },
 * };
 */

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
