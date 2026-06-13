/**
 * @function updatePatientAsTherapist
 * @description
 * Updates a patient's status and therapist assignment through the therapist panel.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Retrieves the existing patient from the database.
 * - Ensures update data is provided in the request body.
 * - Validates incoming data using Joi schema (`updatedPatientByTherapistSchema`).
 * - Updates the patient's status and therapist assignment.
 * - Returns the updated patient record upon success.
 *
 * Behavior:
 * - Ensures only authenticated therapists can perform patient updates.
 * - Verifies the patient exists before applying modifications.
 * - Validates all incoming data before persisting changes.
 * - Allows therapists to update:
 *   - Patient status.
 *   - Assigned therapist.
 *
 * Error handling:
 * - Returns 400 if therapist ID is missing or invalid.
 * - Returns 400 if patient ID is missing or invalid.
 * - Returns 400 if no update data is provided.
 * - Returns 400 if validation fails.
 * - Returns 400 if the update operation fails.
 * - Returns 404 if the patient is not found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to update.
 *   - `req.body` {Object} Patient update data.
 *     - `status` {string} Updated patient status.
 *     - `therapist_id` {number} Updated therapist assignment.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Updated patient information.
 *   - 400: Invalid IDs, missing data, validation errors, or update failure.
 *   - 404: Patient not found.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - `message` {string} Operation result message.
 * - `patient` {Object} Updated patient record.
 *
 * @sideEffects
 * - Updates an existing patient record in the database.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient, Therapist } from '../../../models/index.js';
import updatedPatientByTherapistSchema from '../../joi_validations/update_validations/updatedPatientByTherapistSchema.js';

export default async function updatePatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const foundPatient = await Patient.findByPk(patient_id);

    if (!foundPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    } else {
      if (!req.body) {
        return res.status(400).json({ message: 'No data provided for update' });
      } else {
        const { error } = updatedPatientByTherapistSchema.validate(req.body);

        if (error) {
          return res.status(400).json({
            message: 'Invalid data provided for update',
            details: error.details,
          });
        } else {
          const updatedPatient = await foundPatient.update({
            status: req.body.status,
            therapist_id: req.body.therapist_id,
          });

          if (!updatedPatient) {
            return res.status(400).json({
              message: 'Failed to update patient',
            });
          } else {
            return res.status(200).json({
              message: 'Patient updated successfully',
              patient: updatedPatient,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error updating patient:', error);

    return res.status(500).json({
      message: 'Error updating patient:',
      error: error.message,
    });
  }
}
