/**
 * @description Interface for representing a patient.
 *
 * This interface:
 * - Defines the structure of a patient object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the patient.
 *   - therapist_id: A number representing the unique identifier of the therapist assigned to the patient.
 *   - name: A string representing the first name of the patient.
 *   - birth_name: A string representing the birth name of the patient.
 *   - surname: A string representing the last name of the patient.
 *   - fullName (optional): A string representing the full name of the patient (if available).
 *   - gender: A string representing the gender of the patient.
 *   - birth_date: A string representing the birth date of the patient in ISO format (YYYY-MM-DD).
 *   - age (optional): A number representing the age of the patient (if available).
 *   - street_number: A string representing the street number of the patient's address.
 *   - street_name: A string representing the street name of the patient's address.
 *   - postal_code: A string representing the postal code of the patient's address.
 *   - city: A string representing the city of the patient's address.
 *   - address (optional): A string representing the full address of the patient (if available).
 *   - phone_number: A string representing the phone number of the patient.
 *   - email: A string representing the email address of the patient.
 *   - password: A string representing the hashed password of the patient.
 *   - therapist (optional): A string representing the therapist assigned to the patient (if available).
 *   - status: A string representing the status of the patient.
 *   - picture_url: A string representing the URL of the patient's profile picture.
 *   - picture_id: A string representing the ID of the patient's profile picture in the storage service.
 *   - insurance (optional): An array of IInsurance objects representing the insurance policies of the patient.
 *
 * Example usage:
 * const patient: IPatient = {
 *   id: 1,
 *   therapist_id: 101,
 *   name: 'John',
 *   birth_name: 'Johnathan',
 *   surname: 'Doe',
 *   gender: 'Male',
 *   birth_date: '1980-01-01',
 *   street_number: '123',
 *   street_name: 'Main St',
 *   postal_code: '12345',
 *   city: 'Anytown',
 *   phone_number: '123-456-7890',
 *   email: 'john.doe@example.com',
 *   password: 'hashedpassword',
 *   status: 'active',
 *   picture_url: 'https://example.com/picture.jpg',
 *   picture_id: 'abc123',
 *   insurance: [
 *     {
 *       id: 1,
 *       admin_id: 101,
 *       name: 'HealthFirst',
 *       amc_code: 'HF12345',
 *       street_number: '123',
 *       street_name: 'Main St',
 *       postal_code: '12345',
 *       city: 'Anytown',
 *       phone_number: '123-456-7890',
 *     },
 *   ],
 * };
 */

import { IInsurance } from './IInsurance';

export interface IPatient {
  id: number;
  therapist_id: number;
  name: string;
  birth_name: string;
  surname: string;
  fullName?: string;
  gender: string;
  birth_date: string;
  age?: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  email: string;
  password: string;
  therapist?: string;
  status: string;
  picture_url: string;
  picture_id: string;
  insurance?: IInsurance[];
}
