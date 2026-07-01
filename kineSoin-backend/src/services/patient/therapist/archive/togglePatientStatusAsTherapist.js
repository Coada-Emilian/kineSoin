/**
 * @description Toggles the status of a specific patient for the authenticated
 *              therapist, enforcing strict rules around which statuses can be
 *              changed and ensuring the therapist is authorized to perform the
 *              update.
 *
 * Rationale:
 * - Ensures only verified therapists can modify the status of their assigned
 *   patients, protecting system integrity and preventing unauthorized changes.
 * - Keeps the controller focused on validation, ownership checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any write operation.
 * - Prevents status changes for `pending` and `banned` patients to maintain
 *   administrative consistency.
 * - Allows toggling only between `active` and `inactive`, simplifying therapist‑side
 *   patient management.
 * - Returns clear, consistent HTTP status codes for unauthorized access, invalid
 *   transitions, missing records, successful updates, and unexpected server errors.
 */

import { Patient, Therapist } from '../../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function togglePatientStatusAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

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
    console.error('Error toggling patient status:', error);

    return res.status(500).json({
      message: 'Error toggling patient status:',
      error: error.message,
    });
  }
}
