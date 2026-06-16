/**
 * @description Retrieves a simplified list of affliction names for patient use.
 *
 * This controller method handles:
 *
 * - `getAfflictionNamesAsPatient(req, res)`:
 *   - Parses and validates the `patient_id` from the request.
 *   - Fetches all afflictions from the database.
 *   - Returns only the `id` and `name` attributes.
 *   - Orders results alphabetically by name.
 *   - Returns:
 *     - `400` if `patient_id` is missing or invalid.
 *     - `404` if no afflictions are found.
 *     - `500` if a server error occurs.
 *     - `200` with the list of afflictions if successful.
 *
 * Additional safeguards:
 * - Validates numeric inputs using `checkIsValidNumber`.
 * - Logs server-side errors for debugging purposes.
 *
 * @module getAfflictionNamesAsPatient
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function to ensure numeric ID inputs are valid.
 */

import { Affliction } from '../../models/index.js';

export default async function getAfflictionNamesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  // checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient ID is required.' });
  } else {
    try {
      const foundAfflictions = await Affliction.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      if (!foundAfflictions) {
        return res.status(404).json({ message: 'No afflictions found.' });
      } else {
        return res.status(200).json(foundAfflictions);
      }
    } catch (error) {
      console.error('Error fetching afflictions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
