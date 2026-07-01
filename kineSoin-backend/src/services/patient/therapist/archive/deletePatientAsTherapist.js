/**
 * @description Deletes a patient assigned to the authenticated therapist, ensuring
 *              the therapist is authorized to perform the removal before executing
 *              any destructive action.
 *
 * Rationale:
 * - Restricts patient deletion to verified therapists who are directly responsible
 *   for the patient, protecting system integrity and preventing unauthorized account
 *   removal.
 * - Keeps the controller focused on validation, ownership checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any write operation.
 * - Confirms the patient exists and is assigned to the requesting therapist before
 *   allowing deletion.
 * - Returns clear, consistent HTTP status codes for unauthorized access, missing
 *   records, successful deletions, and unexpected server errors.
 */

import { Patient, Therapist } from '../../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deletePatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

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
    console.error('Error deleting patient:', error);

    return res.status(500).json({
      message: 'Error deleting patient:',
      error: error.message,
    });
  }
}
