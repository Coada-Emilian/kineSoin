/**
 * @description Interface for representing a therapist.
 *
 * This interface:
 * - Defines the structure of a therapist object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the therapist.
 *   - admin_id: A number representing the unique identifier of the administrator who created the therapist record.
 *   - name: A string representing the first name of the therapist.
 *   - surname: A string representing the last name of the therapist.
 *   - fullName (optional): A string representing the full name of the therapist (if available).
 *   - description: A string representing the description of the therapist.
 *   - diploma: A string representing the diploma or certification of the therapist.
 *   - experience: A string representing the experience of the therapist.
 *   - specialty: A string representing the specialty area of the therapist.
 *   - email: A string representing the email address of the therapist.
 *   - password: A string representing the hashed password of the therapist.
 *   - picture_url: A string representing the URL of the therapist's profile picture.
 *   - picture_id: A string representing the ID of the therapist's profile picture in the storage service.
 *   - licence_code: A string representing the licence code of the therapist.
 *   - status: A string representing the status of the therapist.
 *
 * Example usage:
 * const therapist: ITherapist = {
 *   id: 1,
 *   admin_id: 101,
 *   name: 'Jane',
 *   surname: 'Doe',
 *   fullName: 'Dr. Jane Doe',
 *   description: 'Experienced physical therapist specializing in sports injuries.',
 *   diploma: 'Doctor of Physical Therapy',
 *   experience: '10 years',
 *   specialty: 'Sports Injuries',
 *   email: 'jane.doe@example.com',
 *   password: 'hashedpassword',
 *   picture_url: 'https://example.com/picture.jpg',
 *   picture_id: 'abc123',
 *   licence_code: 'LIC123456',
 *   status: 'active',
 * };
 */

export interface ITherapist {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  description: string;
  diploma: string;
  experience: string;
  specialty: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  email: string;
  password: string;
  picture_url: string;
  picture_id: string;
  licence_code: string;
  status: string;
}
