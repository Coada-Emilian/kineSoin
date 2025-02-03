/**
 * @description Interface for representing a patient message.
 *
 * This interface:
 * - Defines the structure of a patient message object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the message.
 *   - sender_id: A number representing the unique identifier of the patient sending the message.
 *   - receiver_id: A number representing the unique identifier of the therapist receiving the message.
 *   - content: A string representing the content of the message.
 *   - date: A string representing the date the message was sent in ISO format (YYYY-MM-DD).
 *   - time: A string representing the time the message was sent in ISO format (HH:MM:SS).
 *   - sender: An object of type IPatient representing the patient who sent the message.
 *   - receiver: An object of type ITherapist representing the therapist who received the message.
 *
 * Example usage:
 * const patientMessage: IPatientMessage = {
 *   id: 1,
 *   sender_id: 202,
 *   receiver_id: 303,
 *   content: 'Hello, I have a question about my treatment.',
 *   date: '2025-02-01',
 *   time: '14:30:00',
 *   sender: {
 *     id: 202,
 *     therapist_id: 101,
 *     name: 'John',
 *     birth_name: 'Johnathan',
 *     surname: 'Doe',
 *     gender: 'Male',
 *     birth_date: '1980-01-01',
 *     street_number: '123',
 *     street_name: 'Main St',
 *     postal_code: '12345',
 *     city: 'Anytown',
 *     phone_number: '123-456-7890',
 *     email: 'john.doe@example.com',
 *     password: 'hashedpassword',
 *     status: 'active',
 *     picture_url: 'https://example.com/picture.jpg',
 *     picture_id: 'abc123',
 *   },
 *   receiver: {
 *     id: 303,
 *     name: 'Dr. Jane Doe',
 *     surname: 'Doe',
 *     specialty: 'Physical Therapy',
 *     email: 'jane.doe@example.com',
 *     phone_number: '987-654-3210',
 *     status: 'active',
 *   },
 * };
 */

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
