/**
 * @description Increments the completed‑appointment count for a prescription,
 *              performed by the authenticated therapist.
 *
 * Rationale:
 * - Ensures only validated therapists can update clinical progress data,
 *   preserving the integrity of treatment records and preventing unauthorized changes.
 * - Keeps the controller focused on validation, existence checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and prescription IDs to prevent malformed requests.
 * - Ensures the prescription exists and that completed appointments have not already
 *   reached the total appointment quantity.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Prescription } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function incrementCompletedAppointmentQuantityAsTherapist(
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
      } else if (
        foundPrescription.completed_appointment_quantity ===
        foundPrescription.appointment_quantity
      ) {
        return res
          .status(400)
          .json({ message: 'All appointments are already completed' });
      } else if (
        foundPrescription.completed_appointment_quantity <
        foundPrescription.appointment_quantity
      ) {
        foundPrescription.completed_appointment_quantity += 1;
        await foundPrescription.save();
        return res.status(200).json({
          message: 'Completed appointment quantity successfully added',
        });
      }
    } catch (error) {
      console.error('Error adding completed appointment quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
