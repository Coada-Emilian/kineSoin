/**
 * @description Decrements the completed appointment quantity of a prescription by 1,
 *              performed by a logged-in therapist.
 *
 * Steps performed:
 * - Validates therapist ID and prescription ID from request.
 * - Checks if the prescription exists.
 * - Checks if the completed appointment quantity is greater than zero.
 * - If so, decrements the completed appointment quantity by one and saves.
 * - Returns appropriate error messages if therapist, prescription, or quantity invalid.
 *
 * @param {object} req - Express request object, containing therapist_id and params.prescription_id
 * @param {object} res - Express response object to send JSON response
 *
 * @returns {object} JSON success or error message
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Prescription } from '../../../models/index.js';

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
