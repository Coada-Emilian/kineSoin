/**
 * @description Interface for representing a medic.
 *
 * This interface:
 * - Defines the structure of a medic object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the medic.
 *   - admin_id: A number representing the unique identifier of the administrator who created the medic record.
 *   - name: A string representing the first name of the medic.
 *   - surname: A string representing the last name of the medic.
 *   - fullName (optional): A string representing the full name of the medic (if available).
 *   - street_number: A string representing the street number of the medic's address.
 *   - street_name: A string representing the street name of the medic's address.
 *   - postal_code: A string representing the postal code of the medic's address.
 *   - city: A string representing the city of the medic's address.
 *   - address (optional): A string representing the full address of the medic (if available).
 *   - phone_number: A string representing the phone number of the medic.
 *   - licence_code: A string representing the licence code of the medic.
 *
 * Example usage:
 * const medic: IMedic = {
 *   id: 1,
 *   admin_id: 101,
 *   name: 'Jane',
 *   surname: 'Doe',
 *   fullName: 'Dr. Jane Doe',
 *   street_number: '123',
 *   street_name: 'Main St',
 *   postal_code: '12345',
 *   city: 'Anytown',
 *   phone_number: '123-456-7890',
 *   licence_code: 'LIC123456',
 * };
 */

export interface IMedic {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  licence_code: string;
}
