/**
 * @description Increments the appointment quantity for a given prescription by a therapist.
 *
 * Validations and steps:
 * - Validates the therapist ID from the request.
 * - Validates the prescription ID from the request parameters.
 * - Validates the request body to ensure it contains a valid appointment_quantity integer.
 * - Checks that the appointment_quantity to add is at least 1.
 * - Fetches the prescription by ID.
 * - Checks if the prescription exists.
 * - Adds the specified appointment_quantity to the current appointment quantity.
 * - Saves the updated prescription.
 * - Returns appropriate error messages for invalid therapist, invalid input, or missing prescription.
 * - Handles and logs any internal server errors.
 *
 * @param {object} req - Express request object containing therapist_id, prescription_id, and body with appointment_quantity
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON with a success or error message based on the operation outcome
 */

import { Prescription } from '../../../models/associations.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function incrementPrescriptionAppointmentQuantityAsTherapist(
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

      const appointmentQuantitySchema = Joi.object({
        appointment_quantity: Joi.number().integer().required(),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }
      const { error } = appointmentQuantitySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { appointment_quantity } = req.body;

      if (appointment_quantity < 1) {
        return res
          .status(400)
          .json({ message: 'Appointment quantity must be at least 1' });
      }

      const foundPrescription = await Prescription.findByPk(prescription_id);

      if (!foundPrescription) {
        return res.status(400).json({ message: 'Prescription not found' });
      }

      foundPrescription.appointment_quantity += appointment_quantity;

      await foundPrescription.save();

      return res
        .status(200)
        .json({ message: 'Appointment quantity successfully added' });
    } catch (error) {
      console.error(
        'Error adding to prescription appointment quantity:',
        error
      );
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
