/**
 * @description Interface for representing an insurance entity.
 *
 * This interface:
 * - Defines the structure of an insurance object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the insurance entity.
 *   - admin_id: A number representing the unique identifier of the administrator who created the insurance entity.
 *   - name: A string representing the name of the insurance entity.
 *   - amc_code: A string representing the AMC code of the insurance entity.
 *   - street_number: A string representing the street number of the insurance entity's address.
 *   - street_name: A string representing the street name of the insurance entity's address.
 *   - postal_code: A string representing the postal code of the insurance entity's address.
 *   - city: A string representing the city of the insurance entity's address.
 *   - address (optional): A string representing the full address of the insurance entity (if available).
 *   - phone_number: A string representing the phone number of the insurance entity.
 *   - Patient_Insurance (optional): An object of type IPatient_Insurance representing the relationship between the insurance entity and patients.
 *
 * Example usage:
 * const insurance: IInsurance = {
 *   id: 1,
 *   admin_id: 101,
 *   name: 'HealthFirst',
 *   amc_code: 'HF12345',
 *   street_number: '123',
 *   street_name: 'Main St',
 *   postal_code: '12345',
 *   city: 'Anytown',
 *   phone_number: '123-456-7890',
 *   Patient_Insurance: {
 *     patient_id: 202,
 *     insurance_id: 1,
 *     coverage_details: 'Full Coverage',
 *   },
 * };
 */

import { IPatient_Insurance } from './IPatient_Insurance';

export interface IInsurance {
  id: number;
  admin_id: number;
  name: string;
  amc_code: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  Patient_Insurance?: IPatient_Insurance;
}
