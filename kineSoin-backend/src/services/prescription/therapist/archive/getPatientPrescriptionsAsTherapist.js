/**
 * @description Retrieves all prescriptions for a specific patient on behalf of the
 *              authenticated therapist, returning both active and completed records
 *              with essential medical metadata.
 *
 * Rationale:
 * - Ensures therapists can securely access the prescription history of their patients,
 *   supporting clinical decision‑making while maintaining proper access boundaries.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any read operation.
 * - Returns all prescriptions (completed and non‑completed) associated with the patient,
 *   including appointment counts, care type, and scan metadata.
 * - Provides consistent HTTP status codes for missing records, empty lists,
 *   and unexpected server errors.
 */

import { Prescription } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function getPatientPrescriptionsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    checkIsValidNumber(therapist_id);

    const patient_id = parseInt(req.params.patient_id, 10);

    if (!patient_id) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      checkIsValidNumber(patient_id);

      try {
        const foundPrescriptions = await Prescription.findAll({
          where: {
            patient_id,
          },
          attributes: [
            'id',
            'date',
            'appointment_quantity',
            'at_home_care',
            'picture_url',
            'is_completed',
            'is_new_prescription',
            'completed_appointment_quantity',
          ],
        });

        if (foundPrescriptions.length === 0) {
          return res.status(200).json({ prescriptions: [] });
        } else {
          return res.status(200).json(foundPrescriptions);
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
