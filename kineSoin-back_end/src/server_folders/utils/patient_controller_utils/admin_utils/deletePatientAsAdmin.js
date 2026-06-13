/**
 * @function deletePatientAsAdmin
 * @description
 * Deletes a patient from the system through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Attempts to delete the patient record from the database.
 * - Checks whether a record was actually deleted.
 *
 * Behavior:
 * - Permanently removes a patient from the database if found.
 * - Returns an error if no patient matches the provided ID.
 *
 * Error handling:
 * - Returns 400 if admin ID or patient ID is invalid.
 * - Returns 400 if the patient does not exist.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming deletion or describing errors.
 *
 * @sideEffects
 * - Permanently deletes a patient record from the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function deletePatientAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const response = await Patient.destroy({ where: { id: patient_id } });

    if (!response) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      return res.status(200).json({ message: 'Patient deleted successfully!' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
