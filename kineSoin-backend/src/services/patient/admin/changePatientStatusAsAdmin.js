/**
 * @description Updates the status of a specific patient for the authenticated admin,
 *              ensuring the new status is valid and the patient exists before applying
 *              any modification.
 *
 * Rationale:
 * - Restricts patient‑status changes to verified administrators, protecting system
 *   integrity and preventing unauthorized account manipulation.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and patient IDs before performing any write operation.
 * - Ensures the new status matches allowed values (`active`, `pending`, `banned`,
 *   `inactive`) through Joi validation.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful updates, and unexpected server errors.
 */

import Joi from 'joi';
import { Admin, Patient } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function changePatientStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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
    console.error('Error toggling patient status:', error);

    return res.status(500).json({
      message: 'Error toggling patient status:',
      error: error.message,
    });
  }
}
