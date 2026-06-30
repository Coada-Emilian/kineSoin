/**
 * @description Allows an authenticated therapist to update a patient’s status or
 *              therapist assignment, validating identities and incoming data
 *              before applying the update.
 *
 * Rationale:
 * - Ensures only verified therapists can modify patient records, protecting
 *   medical integrity and preventing unauthorized changes.
 * - Keeps the controller focused on validation, structured input handling, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any write operation.
 * - Applies Joi validation to ensure only allowed fields are updated.
 * - Supports updates to patient status and therapist assignment.
 * - Returns consistent HTTP status codes for missing records, invalid data,
 *   failed updates, successful updates, and unexpected server errors.
 */

import { Patient, Therapist } from '../../../../models/index.js';
import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
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
