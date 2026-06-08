/**
 * @function togglePatientStatusAsTherapist
 * @description
 * Toggles a patient's status between "active" and "inactive" from the therapist panel.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Retrieves the patient from the database.
 * - Checks whether the patient status can be modified.
 * - Toggles the patient status between "active" and "inactive".
 * - Persists the updated status in the database.
 *
 * Behavior:
 * - Ensures only authenticated therapists can modify patient status.
 * - Prevents status changes for patients with "pending" or "banned" status.
 * - Allows toggling only between "active" and "inactive" states.
 * - Saves changes directly to the patient record.
 *
 * Business rules:
 * - "pending" and "banned" patients cannot have their status modified.
 * - "active" → "inactive"
 * - "inactive" → "active"
 *
 * Error handling:
 * - Returns 400 if therapist ID is missing or invalid.
 * - Returns 400 if patient ID is missing or invalid.
 * - Returns 400 if patient is not found.
 * - Returns 400 if patient status cannot be modified.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID whose status is toggled.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Success message confirming status update.
 *   - 400: Invalid IDs or invalid status transition.
 *   - 500: Internal server error.
 *
 * @sideEffects
 * - Updates the `status` field of a patient record in the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function togglePatientStatusAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const patient_id = getValidId(req.params.patient_id, 'Patient ID');

      if (!patient_id) {
        return res.status(400).json({ message: 'Patient not found' });
      }

      const foundPatient = await Patient.findByPk(patient_id);

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        if (
          foundPatient.status === 'pending' ||
          foundPatient.status === 'banned'
        ) {
          return res.status(400).json({
            message: 'Cannot change status of pending or banned patient',
          });
        } else {
          if (foundPatient.status === 'active') {
            foundPatient.status = 'inactive';

            await foundPatient.save();

            return res.status(200).json({
              message: 'Patient status updated successfully!',
            });
          } else if (foundPatient.status === 'inactive') {
            foundPatient.status = 'active';

            await foundPatient.save();

            return res.status(200).json({
              message: 'Patient status updated successfully!',
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
