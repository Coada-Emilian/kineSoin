/**
 * @description Decrements the completed‑appointment count for a prescription,
 *              performed by the authenticated therapist.
 *
 * Rationale:
 * - Ensures only validated therapists can adjust clinical progress data,
 *   preserving the integrity of treatment records.
 * - Keeps the controller focused on validation, existence checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and prescription IDs to prevent malformed or unauthorized requests.
 * - Only decrements when the prescription has at least one completed appointment,
 *   ensuring consistent and safe state transitions.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Prescription } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function decrementCompletedAppointmentQuantityAsTherapist(
  req,
  res
) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const prescription_id = parseInt(req.params.prescription_id, 10);

      checkIsValidNumber(prescription_id);

      const foundPrescription = await Prescription.findByPk(prescription_id);

      if (!foundPrescription) {
        return res.status(400).json({ message: 'Prescription not found' });
      } else if (foundPrescription.completed_appointment_quantity === 0) {
        return res.status(400).json({
          message: 'This prescription does not have any completed appointments',
        });
      } else {
        foundPrescription.completed_appointment_quantity -= 1;

        await foundPrescription.save();

        return res.status(200).json({
          message: 'Completed appointment quantity successfully removed',
        });
      }
    } catch (error) {
      console.error('Error removing completed appointment quantity:', error);

      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
