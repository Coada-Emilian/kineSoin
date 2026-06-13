/**
 * @function changePatientStatusAsAdmin
 * @description
 * Updates the status of a patient from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Defines a Joi schema to validate allowed status values.
 * - Ensures request body is provided and contains valid data.
 * - Retrieves the patient from the database.
 * - Updates the patient's status field.
 *
 * Allowed status values:
 * - active
 * - pending
 * - banned
 * - inactive
 *
 * Behavior:
 * - Ensures only valid predefined statuses can be assigned.
 * - Ensures patient exists before updating.
 *
 * Error handling:
 * - Returns 400 if admin ID or patient ID is invalid.
 * - Returns 400 if request body is missing or invalid.
 * - Returns 400 if validation fails.
 * - Returns 400 if patient is not found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to update.
 *   - `req.body` {Object} Request body containing `status`.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming update or describing errors.
 *
 * @sideEffects
 * - Updates patient status in the database.
 */

import Joi from 'joi';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function changePatientStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const updatedPatientStatusSchema = Joi.object({
      status: Joi.string().valid('active', 'pending', 'banned', 'inactive'),
    });

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    } else {
      const { error } = updatedPatientStatusSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      } else {
        const { status } = req.body;

        const foundPatient = await Patient.findByPk(patient_id);

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          await foundPatient.update({ status });

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
