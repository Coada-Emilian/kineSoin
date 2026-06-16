/**
 * @description Increments the completed appointment quantity for a given prescription by a therapist.
 *
 * Validations and steps:
 * - Validates the therapist ID from the request.
 * - Validates the prescription ID from the request parameters.
 * - Fetches the prescription by ID.
 * - Checks if the prescription exists.
 * - Ensures the completed appointment quantity is not already equal to the total appointment quantity.
 * - If possible, increments the completed appointment quantity by one and saves the prescription.
 * - Returns appropriate error messages for invalid therapist, missing prescription, or when all appointments are already completed.
 * - Handles and logs any internal server errors.
 *
 * @param {object} req - Express request object containing therapist_id and prescription_id
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON with a success or error message based on the operation outcome
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Prescription } from '../../../models/index.js';

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
