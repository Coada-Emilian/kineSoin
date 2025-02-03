/**
 * @description Interface for representing a prescription.
 *
 * This interface:
 * - Defines the structure of a prescription object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the prescription.
 *   - medic_id: A number representing the unique identifier of the medic who issued the prescription.
 *   - patient_id: A number representing the unique identifier of the patient receiving the prescription.
 *   - affliction_id: A number representing the unique identifier of the affliction associated with the prescription.
 *   - appointment_quantity: A number representing the quantity of appointments prescribed.
 *   - is_completed: A boolean indicating whether the prescription has been completed.
 *   - at_home_care: A boolean indicating whether the prescription includes at-home care.
 *   - date: A string representing the date the prescription was issued in ISO format (YYYY-MM-DD).
 *   - picture_url: A string representing the URL of the prescription's image.
 *
 * Example usage:
 * const prescription: IPrescription = {
 *   id: 1,
 *   medic_id: 101,
 *   patient_id: 202,
 *   affliction_id: 303,
 *   appointment_quantity: 10,
 *   is_completed: false,
 *   at_home_care: true,
 *   date: '2025-02-01',
 *   picture_url: 'https://example.com/prescription.jpg',
 * };
 */

export interface IPrescription {
  id: number;
  medic_id: number;
  patient_id: number;
  affliction_id: number;
  appointment_quantity: number;
  is_completed: boolean;
  at_home_care: boolean;
  date: string;
  picture_url: string;
}
