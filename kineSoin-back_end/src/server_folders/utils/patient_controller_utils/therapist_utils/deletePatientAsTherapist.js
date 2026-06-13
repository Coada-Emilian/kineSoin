/**
 * @function deletePatientAsTherapist
 * @description
 * Deletes a patient record through the therapist panel, ensuring the therapist
 * has ownership of the patient before deletion.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Retrieves the patient from the database.
 * - Verifies that the patient belongs to the authenticated therapist.
 * - Deletes the patient record if authorization is valid.
 *
 * Behavior:
 * - Ensures only authenticated therapists can perform the operation.
 * - Enforces ownership validation between therapist and patient.
 * - Prevents unauthorized deletion of patient records.
 * - Permanently removes the patient from the database.
 *
 * Error handling:
 * - Returns 400 if therapist ID or patient ID is missing or invalid.
 * - Returns 404 if the patient is not found.
 * - Returns 403 if the therapist is not authorized to delete the patient.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Success message confirming deletion.
 *   - 400: Invalid therapist or patient ID.
 *   - 403: Unauthorized action (patient does not belong to therapist).
 *   - 404: Patient not found.
 *   - 500: Internal server error.
 *
 * @sideEffects
 * - Permanently deletes a patient record from the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function deletePatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  const patient_id = getValidId(req.params.patient_id, 'Patient ID');

  try {
    const foundPatient = await Patient.findByPk(patient_id);

    if (!foundPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    } else {
      if (foundPatient.therapist_id !== therapist_id) {
        return res
          .status(403)
          .json({ message: 'You are unauthorized to delete this patient' });
      } else {
        await foundPatient.destroy();

        return res
          .status(200)
          .json({ message: 'Patient deleted successfully' });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting patient' });
  }
}
