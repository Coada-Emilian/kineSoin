/**
 * @description Interface for representing the relationship between a patient and their insurance.
 *
 * This interface:
 * - Defines the structure of a patient insurance object.
 * - Contains the following properties:
 *   - insurance_id: A number representing the unique identifier of the insurance.
 *   - adherent_code: A string representing the adherent code of the patient.
 *   - contract_number: A string representing the contract number of the insurance.
 *   - end_date: A string representing the end date of the insurance coverage in ISO format (YYYY-MM-DD).
 *   - start_date: A string representing the start date of the insurance coverage in ISO format (YYYY-MM-DD).
 *
 * Example usage:
 * const patientInsurance: IPatient_Insurance = {
 *   insurance_id: 1,
 *   adherent_code: 'ADH123456',
 *   contract_number: 'CON123456789',
 *   end_date: '2025-12-31',
 *   start_date: '2023-01-01',
 * };
 */

export interface IPatient_Insurance {
  insurance_id: number;
  adherent_code: string;
  contract_number: string;
  end_date: string;
  start_date: string;
}
